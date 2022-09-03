import mongoose, { Schema, SchemaDefinition, Document, Date, model, Model } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import slugify from 'slugify';

import {
  StatusType,
  statusTypes,
  TargetTypes,
  targetTypes,
  LevelType,
  levelTypes,
  PriorityType,
  priorityTypes,
} from '@/domain/Task';

// The @types/mongoose-sequence package is incorrect, and the dev doesn't care, so we ignore the error here. Follow docs here:
// https://github.com/ramiel/mongoose-sequence
// https://stackoverflow.com/a/71859686
// https://github.com/ramiel/mongoose-sequence/issues/111
// @ts-expect-error
const AutoIncrement = AutoIncrementFactory(mongoose);

type TaskSchemaFields = Document & {
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
  };
  status: StatusType;
  workflow: Schema.Types.ObjectId;
  target: TargetTypes;
  previous: [Schema.Types.ObjectId];
  next: [Schema.Types.ObjectId];
  level: LevelType;
  priority: PriorityType;
  createUser: Schema.Types.ObjectId;
  assignedUsers: [Schema.Types.ObjectId];
  createdAt: Date;
  slug: string;
};

type TaskMethod = {};

type TaskModel = Model<TaskSchemaFields, {}, TaskMethod>;

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
    },
    coordinates: {
      type: [[[Number]]],
    },
  },
  status: {
    type: String,
    required: true,
    enum: statusTypes,
  },
  target: {
    type: [String],
    enum: targetTypes,
  },
  previous: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  next: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  workflow: {
    type: Schema.Types.ObjectId,
    ref: 'Workflow',
    required: true,
  },
  level: {
    type: String,
    enum: levelTypes,
    required: true,
  },
  priority: {
    type: String,
    enum: priorityTypes,
    required: true,
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
};

const TaskSchema = new Schema<TaskSchemaFields & TaskMethod, TaskModel, TaskMethod>(
  taskSchemaFields
);

TaskSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Cascade delete courses when a bootcamp is deleted
TaskSchema.pre('remove', async function (next) {
  console.log(`Comments being removed from task${this._id}`);
  await this.$model('Comment').deleteMany({ task: this._id });
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
TaskSchema.plugin(AutoIncrement, { id: 'task_counter', inc_field: 'id' });

export const Task = model('Task', TaskSchema);
