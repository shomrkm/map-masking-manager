import moment, { Moment } from 'moment-timezone';

import { Title, Description, Status, StatusType } from './entities';

type Params = {
  title: string;
  description: string;
  status: string;
  createUser: string;
  id?: string | null;
  no?: number | null;
  createdAt?: Date | null;
};

/**
 * Workflow Aggregate root class
 */
export class Workflow {
  private _id: string | null;
  private _no: number | null;
  private _title: Title;
  private _description: Description;
  private _status: Status;
  private _createUser: string;
  private _createdAt: moment.Moment;

  constructor({
    title,
    description,
    status,
    createUser,
    id = null,
    no = null,
    createdAt = null,
  }: Params) {
    this._id = id;
    this._no = no;
    this._title = new Title(title);
    this._description = new Description(description);
    this._status = new Status(status);
    this._createUser = createUser;
    this._createdAt = createdAt ? moment(createdAt) : moment(new Date());
  }

  get id(): string | null {
    return this._id;
  }

  set id(id: string | null) {
    if (id) this._id = id;
  }

  get no(): number | null {
    return this._no;
  }

  set no(no: number | null) {
    if (no) this._no = no;
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
