import { StringValueObject } from '@/shared/domain/StringValueObject';
import { ErrorResponse } from '@/shared/core/utils';

export class Title extends StringValueObject {
  constructor(title: string) {
    if (title.length > 50) {
      throw new ErrorResponse('Title can not be more than 50 characters', 400);
    }
    super(title);
  }
}
