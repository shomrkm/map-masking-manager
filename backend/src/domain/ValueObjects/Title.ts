import { StringValueObject } from '@/shared/domain/StringValueObject';
import { ErrorResponse } from '@/shared/core/utils';

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Title extends StringValueObject {
  constructor(title: string) {
    if (title.length > 50) {
      throw new ErrorResponse('Title can not be more than 50 characters', 400);
    }
    super(title);
  }
}
