import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Project } from './project.entity';
import { ProjectRole } from './types';

@Entity()
export class ProjectMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: ProjectRole })
  role: ProjectRole;

  @ManyToOne(type => Project)
  project: Project;

  @ManyToOne(type => User)
  user: User;
}
