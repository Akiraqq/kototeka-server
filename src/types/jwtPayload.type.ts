import { Role } from '@src/common/enums';

export type JwtPayload = {
  email: string;
  sub: string;
  role: Role;
};
