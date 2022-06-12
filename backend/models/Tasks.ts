import { Schema, SchemaDefinition, Date, model } from 'mongoose';
import slugify from 'slugify';

type TaskSchemaFields = {
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

// Reverse populate with virtuals
// TaskSchema.virtual('users', {
//   ref: 'User',
//   localField: '_id',
//   foreignField: 'createUser',
//   justOne: false,
// });

export const Task = model('Task', TaskSchema);
