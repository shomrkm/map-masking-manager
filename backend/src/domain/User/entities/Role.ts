import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ValueObject } from '../../ValueoObject/ValueObject';

export const roleTypes = ['admin', 'publisher', 'mapper'] as const;
export type RoleType = typeof roleTypes[number];

function isRole(role: string): role is RoleType {
  return roleTypes.includes(role as RoleType);
}

export class Role extends ValueObject<RoleType> {
  constructor(role: string) {
    if (!isRole(role)) {
      throw new ErrorResponse(`Role must be ${roleTypes.join(',')}`, 400);
    }
    super(role);
  }
}
