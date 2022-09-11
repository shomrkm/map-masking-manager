import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ValueObject } from '../../base/ValueObject';

export class Description extends ValueObject<string> {
  constructor(desc: string) {
    if (desc.length > 500) {
      throw new ErrorResponse('Description can not be more than 500 characters', 400);
    }
    super(desc);
  }
}
