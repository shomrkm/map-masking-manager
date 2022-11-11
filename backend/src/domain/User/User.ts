import moment from 'moment-timezone';
import { Level } from '../Task/entities';
import { Role } from './entities/Role';

type Params = {
  name: string;
  email: string;
  role: string;
  level: string;
  avatar: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt?: Date | null;
  id?: string;
};

export class User {
  private _id: string | null;
  private _name: string;
  private _email: string;
  private _role: Role;
  private _level: Level;
  private _avatar: string;
  private _password: string;
  private _resetPasswordToken: string | null;
  private _resetPasswordExpire: moment.Moment | null;
  private _createdAt: moment.Moment;

  constructor({
    name,
    email,
    role,
    level,
    avatar,
    password,
    resetPasswordToken = undefined,
    resetPasswordExpire = undefined,
    createdAt = undefined,
    id = undefined,
  }: Params) {
    this._id = id ?? null;
    this._name = name;
    this._email = email;
    this._role = new Role(role);
    this._level = new Level(level);
    this._avatar = avatar;
    this._password = password;
    this._resetPasswordToken = resetPasswordToken ?? null;
    this._resetPasswordExpire = resetPasswordExpire ? moment(resetPasswordExpire) : null;
    this._createdAt = createdAt ? moment(createdAt) : moment(new Date());
  }

  get id(): string | null {
    return this._id;
  }

  set id(id: string | null) {
    if (id) this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  // TODO: Create ValueObject for validate email
  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get role(): string {
    return this._role.toPrimitive();
  }

  set role(role: string) {
    this._role = new Role(role);
  }

  get level(): string {
    return this._level.toPrimitive();
  }

  set level(level: string) {
    this._level = new Level(level);
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(avatar: string) {
    this._avatar = avatar;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get resetPasswordToken(): string | null {
    return this._resetPasswordToken;
  }

  set resetPasswordToken(token: string | null) {
    if (token) this._resetPasswordToken = token;
  }

  get resetPasswordExpired(): moment.Moment | null {
    return this._resetPasswordExpire;
  }

  set resetPasswordExpired(date: moment.Moment | null) {
    if (date) this._resetPasswordExpire = moment(date);
  }

  get createdAt(): moment.Moment {
    return this._createdAt;
  }
}
