import { Schema, SchemaDefinition, Date, model } from 'mongoose';

type CommentFields = {
  task: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
};

const commentSchemaFields: SchemaDefinition<CommentFields> = {
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

const CommentSchema = new Schema<CommentFields>(commentSchemaFields);

export const Comment = model<CommentFields>('Comment', CommentSchema);
