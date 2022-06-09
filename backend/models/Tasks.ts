import { Schema, SchemaDefinition, Date, model } from 'mongoose';
import slugify from 'slugify';

type TaskSchemaFields = {
  title: string;
  description: string;
  detail: string;
  location?: any;
  status: 'unassigned' | 'mapping' | 'validating' | 'finished';
  target: ('road' | 'map' | 'poi')[];
  level: 'expert' | 'intermediate' | 'beginner';
  priority: 'high' | 'normal' | 'low';
  createdAt: Date;
  slug: String;
};

const taskSchemaFields: SchemaDefinition<TaskSchemaFields> = {
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
  location: {
    // GeoJSON
    type: {
      type: String,
      enum: ['Point'],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
      index: '2dsphere',
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // project
  // source
  // createUser
  // users
  // previousTasks
  // nextTasks
};

export type TaskSchemaProperties = TaskSchemaFields & {
  foo: () => void;
};

const TaskSchema: Schema<TaskSchemaProperties> = new Schema(taskSchemaFields);

TaskSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

export const Task = model('Task', TaskSchema);
