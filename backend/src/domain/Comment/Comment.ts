import moment, { Moment } from 'moment-timezone';

import { Text } from './entities';

type Params = {
  id?: string | null;
  task: string;
  user: string;
  text: Text;
  createdAt?: Date | null;
};

/**
 * Comment Aggregate root class
 */
export class Comment {
  private _id: string | null;
  private _task: string;
  private _user: string;
  private _text: Text;
  private _createdAt: moment.Moment;

  constructor({ task, user, text, id = null, createdAt = null }: Params) {
    this._id = id;
    this._task = task;
    this._user = user;
    this._text = text;
    this._createdAt = createdAt ? moment(createdAt) : moment(new Date());
  }

  public isPersisted(): boolean {
    return this._id !== null;
  }

  public toPrimitive() {
    const primitives = {
      task: this._task,
      user: this._user,
      text: this._text.toPrimitive(),
      createdAt: this._createdAt.toDate(),
    };
    if (this.isPersisted()) return { _id: this._id, ...primitives };
    return primitives;
  }

  get id(): string | null {
    return this._id;
  }

  set id(id: string | null) {
    if (id) this._id = id;
  }

  get task(): string {
    return this._task;
  }

  get user(): string {
    return this._user;
  }

  get text(): Text {
    return this._text;
  }

  get createdAt(): moment.Moment {
    return this._createdAt;
  }
}
