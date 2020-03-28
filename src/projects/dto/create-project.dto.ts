import { ProjectSide, ProjectStatus } from '../types';

export class CreateProjectDto {
  side: ProjectSide;
  title: string;
  description?: string;
  status?: ProjectStatus;
  creatorId: string;
  organizationId?: string;
}
