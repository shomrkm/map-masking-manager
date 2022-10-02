import moment from 'moment-timezone';

type Params = {
  name: string;
  email: string;
  role: string;
  level: string;
  avatar: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: moment.Moment;
  createdAt?: moment.Moment;
};

export class User {
  private _name: string;
  private _email: string;
  private _role: string;
  private _level: string;
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
  }: Params) {
    this._name = name;
    this._email = email;
    this._role = role;
    this._level = level;
    this._avatar = avatar;
    this._password = password;
    this._resetPasswordToken = resetPasswordToken ?? null;
    this._resetPasswordExpire = resetPasswordExpire ?? null;
    this._createdAt = createdAt ? moment(createdAt) : moment(new Date());
  }
}
