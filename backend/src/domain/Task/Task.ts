import moment from 'moment-timezone';
import { Polygon } from 'geojson';

import { Title, Description, Status, Targets, Level, Priority } from './entities';

type Params = {
  title: Title;
  description: Description;
  workflow: string;
  status: Status;
  priority: Priority;
  target: Targets;
  level: Level;
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

/**
 * Task Aggregate root class
 */
export class Task {
  private _id: string | null;
  private _no: number | null;
  private _title: Title;
  private _description: Description;
  private _detail: string;
  private _area: Polygon | null;
  private _status: Status;
  private _workflow: string;
  private _targets: Targets;
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
    status,
    priority,
    target: targets,
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
    this._title = title;
    this._description = description;
    this._detail = detail;
    this._workflow = workflow;
    this._targets = targets;
    this._level = level;
    this._priority = priority;
    this._createUser = createUser;
    this._area = area;
    this._previous = previous;
    this._next = next;
    this._assignedUsers = assignedUsers;
    this._status = status;
    this._createdAt = createdAt ? moment(createdAt) : moment(new Date());
  }

  public isPersisted() {
    return this._id && this._no;
  }

  public addPreviousTask(id: string) {
    this._previous = [...this._previous, id];
  }

  public addNextTask(id: string) {
    this._next = [...this._next, id];
  }

  public removePreviousTask(id: string) {
    this._previous = this.previous.filter((prevId) => prevId !== id);
  }

  removeNextTask(id: string) {
    this._next = this.next.filter((nextId) => nextId !== id);
  }

  toPrimitive() {
    const primitives = {
      title: this._title.toPrimitive(),
      description: this._description.toPrimitive(),
      detail: this._detail,
      area: this._area ?? undefined,
      status: this._status.toPrimitive(),
      workflow: this._workflow,
      target: this._targets.toPrimitive(),
      previous: this._previous,
      next: this._next,
      level: this._level.toPrimitive(),
      priority: this._priority.toPrimitive(),
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

  get detail(): string {
    return this._detail;
  }

  set detail(detail: string) {
    this._detail = detail;
  }

  get area(): Polygon | null {
    return this._area;
  }

  get status(): Status {
    return this._status;
  }

  set status(status: Status) {
    this._status = status;
  }

  get workflow(): string {
    return this._workflow;
  }

  get target(): Targets {
    return this._targets;
  }

  set target(targets: Targets) {
    this._targets = targets;
  }

  get level(): Level {
    return this._level;
  }

  set level(level: Level) {
    this._level = level;
  }

  get priority(): Priority {
    return this._priority;
  }

  set priority(priority: Priority) {
    this._priority = priority;
  }

  get previous(): string[] {
    return this._previous;
  }

  get next(): string[] {
    return this._next;
  }

  get assignedUsers(): string[] {
    return this._assignedUsers;
  }

  get createUser(): string {
    return this._createUser;
  }

  get createdAt(): moment.Moment {
    return this._createdAt;
  }
}
