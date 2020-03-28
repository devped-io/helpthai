import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsApiController } from './projects.api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectMember } from './project-member.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectMember]), UsersModule],
  providers: [ProjectsService],
  controllers: [ProjectsApiController],
})
export class ProjectsModule {}
