import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UsersService } from 'src/users/users.service';
import { ProjectMember } from './project-member.entity';
import { ProjectRole } from './types';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(ProjectMember)
    private projectMemberRepository: Repository<ProjectMember>,
    private usersService: UsersService,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    console.log(`createProjectDto: `, createProjectDto);
    const { creatorId, ...rest } = createProjectDto;
    const creator: User = await this.usersService.findOne(creatorId);

    if (!creator) {
      throw new Error(`User '${creatorId}' not found`);
    }

    const createdProject: Project = this.projectRepository.create(rest);

    createdProject.creator = creator;

    const savedProject: Project = await this.projectRepository.save(
      createdProject,
    );

    return savedProject;
  }

  async addProjectMember(projectId, userId, role?: ProjectRole): Promise<any> {
    const project = await this.projectRepository.findOne(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const createdProjectMember = this.projectMemberRepository.create();

    createdProjectMember.user = user;
    createdProjectMember.project = project;
    createdProjectMember.role = role || ProjectRole.owner;

    project.members.push(createdProjectMember);

    const savedProject = await this.projectRepository.save(project);

    return savedProject;
  }
}
