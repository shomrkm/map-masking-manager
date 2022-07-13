import mongoose, { Schema, SchemaDefinition, Document, Date, model, Model } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import slugify from 'slugify';

// The @types/mongoose-sequence package is incorrect, and the dev doesn't care, so we ignore the error here. Follow docs here:
// https://github.com/ramiel/mongoose-sequence
// https://stackoverflow.com/a/71859686
// https://github.com/ramiel/mongoose-sequence/issues/111
// @ts-expect-error
const AutoIncrement = AutoIncrementFactory(mongoose);

type WorkflowSchemaFields = Document & {
  id: number;
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed' | 'closed';
  createUser: Schema.Types.ObjectId;
  createdAt: Date;
  slug: string;
};

type WorkflowMethod = {};

type WorkflowModel = Model<WorkflowSchemaFields, {}, WorkflowMethod>;

const workflowSchemaFields: SchemaDefinition<WorkflowSchemaFields> = {
  id: Number,
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  status: {
    type: String,
    required: true,
    enum: ['new', 'in-progress', 'completed', 'closed'],
  },
  createUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};

const WorkflowSchema = new Schema<WorkflowSchemaFields & WorkflowMethod, WorkflowModel, WorkflowMethod>(
  workflowSchemaFields
);

WorkflowSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Cascade delete courses when a bootcamp is deleted
WorkflowSchema.pre('remove', async function (next) {
  console.log(`Comments being removed from task${this._id}`);
  await this.$model('Task').deleteMany({ workflow: this._id });
  next();
});

// @ts-expect-error
WorkflowSchema.plugin(AutoIncrement, { inc_field: 'id' });

export const Workflow = model('Workflow', WorkflowSchema);
