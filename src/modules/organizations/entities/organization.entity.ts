import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@src/modules/users/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('organizations')
export class Organization {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  descriptions?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field()
  @Column()
  contactEmail: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.organization)
  volunteers?: User[];
}
