import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '../../../common/enums';
import { Organization } from '@src/modules/organizations/entities';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: true })
  first_name: string;

  @Field()
  @Column({ nullable: true })
  last_name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  refresh_token: string;

  @Field(() => Organization, { nullable: true })
  @ManyToOne(() => Organization, (organization) => organization.volunteers, {
    nullable: true,
  })
  organization: Organization;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
