import { StringValueObject } from '@/shared/domain/StringValueObject';
import { ErrorResponse } from '@/shared/core/utils';

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Email extends StringValueObject {
  constructor(email: string) {
    if (!email.match(EMAIL_PATTERN)) {
      throw new ErrorResponse(`Email '${email}' is invalid`, 400);
    }
    super(email);
  }
}
