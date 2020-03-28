import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class OrganizationMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizationId: number;

  @Column()
  userId: number;

  @Column()
  role: string;

  @ManyToOne(type => Organization)
  organization: Organization;

  @ManyToOne(type => User)
  user: User;
}
