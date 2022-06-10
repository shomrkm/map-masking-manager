import { Schema, SchemaDefinition, Date, model } from 'mongoose';

type UserSchemaFields = {
  name: string;
  email: string;
  role: 'admin' | 'publisher' | 'mapper';
  level: 'expert' | 'intermediate' | 'beginner';
  password: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  createdAt: Date;
};

const userSchemaFields: SchemaDefinition<UserSchemaFields> = {
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add a email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['admin', 'publisher', 'mapper'],
    default: 'mapper',
  },
    password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};

export type UserSchemaProperties = UserSchemaFields & {
  foo: () => void;
};

const UserSchema: Schema<UserSchemaProperties> = new Schema(userSchemaFields);

export const User = model('User', UserSchema);
