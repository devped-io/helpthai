import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from 'src/projects/project.entity';
import { User } from 'src/users/user.entity';
import { OrganizationMember } from './organization-member.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  // @ManyToMany(
  //   type => User,
  //   member => member.organizations,
  // )
  // @JoinTable({
  //   name: 'organization_member',
  // })
  // members: User[];

  @OneToMany(
    type => OrganizationMember,
    orgMember => orgMember.organization,
  )
  organizationMembers: OrganizationMember[];

  @OneToMany(
    type => Project,
    project => project.organization,
  )
  projects: Project[];
}
