import mongoose, { Schema, SchemaDefinition, Document, Date, model, Model } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import slugify from 'slugify';

import { WorkflowStatusType, workflowStatusTypes } from '@/domain/ValueObjects';

// The @types/mongoose-sequence package is incorrect, and the dev doesn't care, so we ignore the error here. Follow docs here:
// https://github.com/ramiel/mongoose-sequence
// https://stackoverflow.com/a/71859686
// https://github.com/ramiel/mongoose-sequence/issues/111
// @ts-expect-error
const AutoIncrement = AutoIncrementFactory(mongoose);

type WorkflowFields = {
  id: number;
  title: string;
  description: string;
  status: WorkflowStatusType;
  createUser: Schema.Types.ObjectId;
  createdAt: Date;
  slug: string;
};

const workflowSchemaFields: SchemaDefinition<WorkflowFields> = {
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
    enum: workflowStatusTypes,
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

const workflowSchema = new Schema<WorkflowFields>(workflowSchemaFields);

workflowSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// @ts-expect-error
workflowSchema.plugin(AutoIncrement, { id: 'workflow_counter', inc_field: 'id' });

export const Workflow = model<WorkflowFields>('Workflow', workflowSchema);
