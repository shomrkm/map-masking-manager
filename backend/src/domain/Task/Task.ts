import moment, { Moment } from 'moment-timezone';
import { Polygon } from 'geojson';

import {
  Title,
  Description,
  Status,
  StatusType,
  Targets,
  TargetTypes,
  Level,
  LevelType,
  Priority,
  PriorityType,
} from './entities';

type Params = {
  title: string;
  description: string;
  workflow: string;
  priority: string;
  target: string[];
  level: string;
  createUser: string;
  detail?: string;
  area?: Polygon | null;
  previous?: string[];
  next?: string[];
  assignedUsers?: string[];
  id?: string | null;
  no?: number | null;
  createdAt?: Date | null;
};

export class Task {
  private _id: string | null;
  private _no: number | null;
  private _title: Title;
  private _description: Description;
  private _detail: string;
  private _area: Polygon | null;
  private _status: Status;
  private _workflow: string;
  private _target: Targets;
  private _level: Level;
  private _priority: Priority;
  private _previous: string[];
  private _next: string[];
  private _createUser: string;
  private _assignedUsers: string[];
  private _createdAt: moment.Moment;

  constructor({
    title,
    description,
    workflow,
    priority,
    target,
    level,
    createUser,
    detail = '',
    area = null,
    previous = [],
    next = [],
    assignedUsers = [],
    id = null,
    no = null,
    createdAt = null,
  }: Params) {
    this._id = id;
    this._no = no;
    this._title = new Title(title);
    this._description = new Description(description);
    this._detail = detail;
    this._workflow = workflow;
    this._target = new Targets(target);
    this._level = new Level(level);
    this._priority = new Priority(priority);
    this._createUser = createUser;
    this._detail = detail;
    this._area = area;
    this._previous = previous;
    this._next = next;
    this._assignedUsers = assignedUsers;
    this._status = new Status('unassigned');
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

  get description(): string {
    return this._description.get();
  }

  get detail(): string {
    return this._detail;
  }

  get area(): Polygon | null {
    return this._area;
  }

  get status(): StatusType {
    return this._status.get();
  }

  get workflow(): string {
    return this._workflow;
  }

  get target(): TargetTypes {
    return this._target.get();
  }

  get level(): LevelType {
    return this._level.get();
  }

  get priority(): PriorityType {
    return this._priority.get();
  }

  get previous(): string[] {
    return this._previous;
  }

  get next(): string[] {
    return this._next;
  }

  get assinedUsers(): string[] {
    return this._assignedUsers;
  }

  get createdUser(): string {
    return this._createUser;
  }

  get createdAt(): moment.Moment {
    return this._createdAt;
  }
}
