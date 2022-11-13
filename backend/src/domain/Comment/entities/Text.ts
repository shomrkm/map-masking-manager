import { ValueObject } from '@/shared/domain/ValueObject';
import { ErrorResponse } from '@/interface/controller/errorResponse';

export class Text extends ValueObject<string> {
  constructor(text: string) {
    if (text.length > 500) {
      throw new ErrorResponse('Text can not be more than 500 characters', 400);
    }
    super(text);
  }
}
