import moment, { Moment } from 'moment-timezone';

import { Title, Description, Status, StatusType } from './entities';

type Params = {
  title: string;
  description: string;
  createUser: string;
  id?: string | null;
  no?: number | null;
  createdAt?: Date | null;
};

export class Workflow {
  private _id: string | null;
  private _title: Title;
  private _description: Description;
  private _status: Status;
  private _createUser: string;
  private _createdAt: moment.Moment;

  constructor({ title, description, createUser, id = null, createdAt = null }: Params) {
    this._id = id;
    this._title = new Title(title);
    this._description = new Description(description);
    this._status = new Status('new');
    this._createUser = createUser;
    this._createdAt = createdAt ? moment(createdAt) : moment(new Date());
  }

  get id(): string | null {
    return this._id;
  }

  set id(id: string | null) {
    if (id) this._id = id;
  }

  get title(): string {
    return this._title.get();
  }

  set title(title: string) {
    this._title = new Title(title);
  }

  get description(): string {
    return this._description.get();
  }

  set description(description: string) {
    this._description = new Description(description);
  }

  get status(): StatusType {
    return this._status.get();
  }

  set status(status: string) {
    this._status = new Status(status);
  }

  get createUser(): string {
    return this._createUser;
  }

  get createdAt(): moment.Moment {
    return this._createdAt;
  }
}
