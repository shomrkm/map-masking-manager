import moment from 'moment-timezone';

export class Task {
  private _id: string;
  private _no: number;
  private _title: string;
  private _description: string;
  private _detail: string;
  // private _area: GeoJSON::Polygon
  private _status: 'unassigned' | 'mapping' | 'validating' | 'finished';
  private _workflowId: string;
  private _target: ('road' | 'map' | 'poi')[];
  private _level: 'expert' | 'intermediate' | 'beginner';
  private _priority: 'high' | 'normal' | 'low';
  private _previous: string[];
  private _next: string[];
  private _createUserId: string;
  private _assignedUserIds: string[];
  private _createdAt: moment.Moment;

  constructor(
    title: string,
    description: string,
    workflowId: string,
    priority: 'high' | 'normal' | 'low',
    createUserId: string,
    detail: string = ''
  ) {
    this._title = title;
    this._description = description;
    this._detail = detail;
    this._workflowId = workflowId;
    this._createUserId = createUserId;
    this._detail = detail;
  }
}
