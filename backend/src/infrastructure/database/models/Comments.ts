import { Schema, SchemaDefinition, Date, model } from 'mongoose';

type CommentSchemaFields = {
  task: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
};

const commentSchemaFields: SchemaDefinition<CommentSchemaFields> = {
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Please add a text'],
    trim: true,
    maxlength: [500, 'text can not be more than 500 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};

export type CommentSchemaProperties = CommentSchemaFields & {
  foo: () => void;
};

const CommentSchema: Schema<CommentSchemaProperties> = new Schema(commentSchemaFields);

export const Comment = model('Comment', CommentSchema);
