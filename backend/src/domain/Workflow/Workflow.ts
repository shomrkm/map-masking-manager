import moment, { Moment } from 'moment-timezone';

import { Title, Description, Status } from './entities';

type Params = {
  title: Title;
  description: Description;
  status: Status;
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
    this._title = title;
    this._description = description;
    this._status = status;
    this._createUser = createUser;
    this._createdAt = createdAt ? moment(createdAt) : moment(new Date());
  }

  public isPersisted() {
    return this._id && this._no;
  }

  public toPrimitive(): any {
    const primitives = {
      title: this._title.toPrimitive(),
      description: this._description.toPrimitive(),
      status: this._status.toPrimitive(),
      createUser: this._createUser,
      createdAt: this._createdAt.toDate(),
    };
    if (this.isPersisted()) return { _id: this._id, id: this._no, ...primitives };
    return primitives;
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

  get title(): Title {
    return this._title;
  }

  set title(title: Title) {
    this._title = title;
  }

  get description(): Description {
    return this._description;
  }

  set description(description: Description) {
    this._description = description;
  }

  get status(): Status {
    return this._status;
  }

  set status(status: Status) {
    this._status = status;
  }

  get createUser(): string {
    return this._createUser;
  }

  get createdAt(): moment.Moment {
    return this._createdAt;
  }
}
