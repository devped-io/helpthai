import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('api/v1/projects')
export class ProjectsApiController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const project = await this.projectsService.createProject(
        createProjectDto,
      );

      return project;
    } catch (e) {
      console.log(e);

      throw new InternalServerErrorException();
    }
  }

  @Post(':projectId/members')
  async addProjectMember(
    @Param('projectId') projectId,
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<Project> {
    const { userId, role } = createMemberDto;

    try {
      const project = await this.projectsService.addProjectMember(
        projectId,
        userId,
        role,
      );

      return project;
    } catch (e) {
      console.log(e);

      throw new InternalServerErrorException();
    }
  }
}
