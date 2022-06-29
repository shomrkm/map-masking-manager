import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Schema, SchemaDefinition, Date, model, Model, Document, Types } from 'mongoose';

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

type UserMethod = {
  getSignedJwtToken(): string;
  matchPassword(password: string): boolean;
};

type UserModel = Model<UserSchemaFields, {}, UserMethod>;

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
  level: {
    type: String,
    enum: ['expert', 'intermediate', 'beginner'],
    default: 'beginner',
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

export type UserDoc = Document<unknown, any, UserSchemaFields & UserMethod> &
  UserSchemaFields &
  UserMethod & {
    _id: Types.ObjectId;
  };

const UserSchema = new Schema<UserSchemaFields & UserMethod, UserModel, UserMethod>(
  userSchemaFields
);

// Encrypt password using bcypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return token.
UserSchema.method('getSignedJwtToken', function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
});

// Match user entered password to hashed password in database
UserSchema.method('matchPassword', async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

export const User = model<UserSchemaFields & UserMethod>('User', UserSchema);
