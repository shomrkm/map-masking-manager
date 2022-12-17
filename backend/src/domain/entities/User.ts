import moment from 'moment-timezone';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Level, Role } from '../ValueObjects';

const AVATAR_DIR = 'uploads/';

type Params = {
  name: string;
  email: string;
  role: Role;
  level: Level;
  avatar?: string;
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
    password,
    avatar = undefined,
    resetPasswordToken = undefined,
    resetPasswordExpire = undefined,
    createdAt = undefined,
    id = undefined,
  }: Params) {
    this._id = id ?? null;
    this._name = name;
    this._email = email;
    this._role = role;
    this._level = level;
    this._avatar = avatar ?? AVATAR_DIR + 'default_avatar.png';
    this._password = password;
    this._resetPasswordToken = resetPasswordToken ?? null;
    this._resetPasswordExpire = resetPasswordExpire ? moment(resetPasswordExpire) : null;
    this._createdAt = createdAt ? moment(createdAt) : moment(new Date());
  }

  public isPersisted(): boolean {
    return this._id !== null;
  }

  public toPrimitive() {
    const primitives = {
      name: this._name,
      email: this._email,
      role: this._role.toPrimitive(),
      level: this._level.toPrimitive(),
      avatar: this._avatar,
      password: this.password,
      resetPasswordToken: this._resetPasswordToken,
      resetPawwsordExpire: this._resetPasswordExpire?.toDate(),
      createdAt: this._createdAt.toDate(),
    };
    if (this.isPersisted()) return { _id: this._id, ...primitives };
    return primitives;
  }

  public updateAvatar(filename: string) {
    this._avatar = AVATAR_DIR + filename;
  }

  /**
   * Sign JWT and return token.
   * @returns jwt token
   */
  public getSignedJwtToken() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  /**
   * Check password
   * @param password input password
   * @returns return true a the password is valid.
   */
  public async matchPassword(password: string) {
    return await bcrypt.compare(password, this.password);
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

  get role(): Role {
    return this._role;
  }

  set role(role: Role) {
    this._role = role;
  }

  get level(): Level {
    return this._level;
  }

  set level(level: Level) {
    this._level = level;
  }

  get avatar(): string {
    return this._avatar;
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
