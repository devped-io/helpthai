import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Organization } from 'src/organizations/organization.entity';
import { Project } from 'src/projects/project.entity';
import { OrganizationMember } from 'src/organizations/organization-member.entity';
import { ProjectMember } from 'src/projects/project-member.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    type => OrganizationMember,
    orgMember => orgMember.user,
  )
  organizationMembers: OrganizationMember[];

  @OneToMany(
    type => ProjectMember,
    projectMember => projectMember.user,
  )
  joinedProjects: ProjectMember[];

  // @ManyToMany(
  //   type => Organization,
  //   org => org.members,
  // )
  // organizations: Organization[];

  // @ManyToMany(
  //   type => Project,
  //   project => project.members,
  // )
  // projects: Project[];
}
