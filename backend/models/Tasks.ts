import mongoose, { Schema, SchemaDefinition, Date, model } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import slugify from 'slugify';

// The @types/mongoose-sequence package is incorrect, and the dev doesn't care, so we ignore the error here. Follow docs here:
// https://github.com/ramiel/mongoose-sequence
// https://stackoverflow.com/a/71859686
// https://github.com/ramiel/mongoose-sequence/issues/111
// @ts-expect-error
const AutoIncrement = AutoIncrementFactory(mongoose);

type TaskSchemaFields = {
  id: number;
  title: string;
  description: string;
  detail: string;
  area: {
    type: {
      type: 'Polygon';
      required: true;
    };
    coordinates: {
      type: [[[number]]];
      required: true;
    };
    status: 'todo' | 'in-progress' | 'completed';
  };
  status: 'unassigned' | 'mapping' | 'validating' | 'finished';
  target: ('road' | 'map' | 'poi')[];
  level: 'expert' | 'intermediate' | 'beginner';
  priority: 'high' | 'normal' | 'low';
  createUser: Schema.Types.ObjectId;
  assignedUsers: [Schema.Types.ObjectId];
  createdAt: Date;
  slug: string;
};

const taskSchemaFields: SchemaDefinition<TaskSchemaFields> = {
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
  detail: {
    type: String,
  },
  area: {
    // GeoJSON
    type: {
      type: String,
      enum: ['Polygon'],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
  status: {
    type: String,
    required: true,
    enum: ['unassigned', 'mapping', 'validating', 'finished'],
  },
  target: {
    type: [String],
    enum: ['map', 'road', 'poi'],
  },
  level: {
    type: String,
    enum: ['expert', 'intermediate', 'beginner'],
  },
  priority: {
    type: String,
    enum: ['high', 'normal', 'low'],
  },
  createUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // project
  // source
};

export type TaskSchemaProperties = TaskSchemaFields & {
  foo: () => void;
};

const TaskSchema: Schema<TaskSchemaProperties> = new Schema(taskSchemaFields);

TaskSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

TaskSchema.index({ area: '2dsphere' });

// Reverse populate with virtuals
TaskSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'task',
  justOne: false,
});

// @ts-expect-error
TaskSchema.plugin(AutoIncrement, { inc_field: 'id' });

export const Task = model('Task', TaskSchema);
