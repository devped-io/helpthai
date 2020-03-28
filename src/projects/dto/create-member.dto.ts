import { ProjectRole } from '../types';

export class CreateMemberDto {
  userId: number;
  role?: ProjectRole;
}
