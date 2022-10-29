import { ErrorResponse } from '@/interface/controller/errorResponse';
import { StringValueObject } from '../../ValueoObject/StringValueObject';

export class Description extends StringValueObject {
  constructor(desc: string) {
    if (desc.length > 500) {
      throw new ErrorResponse('Description can not be more than 500 characters', 400);
    }
    super(desc);
  }
}
