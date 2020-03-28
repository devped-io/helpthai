import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Organization } from 'src/organizations/organization.entity';
import { ProjectSide, ProjectStatus } from './types';
import { User } from 'src/users/user.entity';
import { ProjectMember } from './project-member.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { enum: ProjectSide, default: ProjectSide.helpee })
  side: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('enum', { enum: ProjectStatus, default: ProjectStatus.open })
  status: ProjectStatus;

  @ManyToOne(type => User, { nullable: false })
  creator: User;

  @ManyToOne(
    type => Organization,
    organization => organization.projects,
  )
  organization: Organization;

  @OneToMany(
    type => ProjectMember,
    projectMember => projectMember.project,
  )
  members: ProjectMember[];

  // @ManyToMany(
  //   type => User,
  //   member => member.projects,
  // )
  // @JoinTable({
  //   name: 'project_member',
  // })
  // members: User[];
}
