import moment from 'moment-timezone';
import { Polygon } from 'geojson';

import {
  Title,
  Description,
  Status,
  StatusType,
  targetTypes,
  Targets,
  TargetTypes,
  Level,
  LevelType,
  Priority,
  PriorityType,
} from './entities';

type Params = {
  title: Title;
  description: Description;
  workflow: string;
  status: string;
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
    status,
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
    this._title = title;
    this._description = description;
    this._detail = detail;
    this._workflow = workflow;
    this._target = new Targets(target as TargetTypes, targetTypes);
    this._level = new Level(level);
    this._priority = new Priority(priority);
    this._createUser = createUser;
    this._area = area;
    this._previous = previous;
    this._next = next;
    this._assignedUsers = assignedUsers;
    this._status = new Status(status);
    this._createdAt = createdAt ? moment(createdAt) : moment(new Date());
  }

  isPersisted() {
    return this._id && this.id;
  }

  addPreviousTask(id: string) {
    this._previous = [...this._previous, id];
  }

  addNextTask(id: string) {
    this._next = [...this._next, id];
  }

  removePreviousTask(id: string) {
    this._previous = this.previous.filter((prevId) => prevId !== id);
  }

  removeNextTask(id: string) {
    this._next = this.next.filter((nextId) => nextId !== id);
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

  get status(): StatusType {
    return this._status.toPrimitive();
  }

  set status(status: string) {
    this._status = new Status(status);
  }

  get workflow(): string {
    return this._workflow;
  }

  get target(): TargetTypes {
    return this._target.value;
  }

  set target(target: string[]) {
    this._target = new Targets(target, targetTypes);
  }

  get level(): LevelType {
    return this._level.toPrimitive();
  }

  set level(level: string) {
    this._level = new Level(level);
  }

  get priority(): PriorityType {
    return this._priority.toPrimitive();
  }

  set priority(priority: string) {
    this._priority = new Priority(priority);
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
