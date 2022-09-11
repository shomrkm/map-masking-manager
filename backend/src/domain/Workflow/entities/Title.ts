import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ValueObject } from '../../base/ValueObject';

export class Title extends ValueObject<string> {
  constructor(title: string) {
    if (title.length > 50) {
      throw new ErrorResponse('Title can not be more than 50 characters', 400);
    }
    super(title);
  }
}
