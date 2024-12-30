import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@src/modules/users/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('organizations')
export class Organization {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.organization)
  volunteers: User[];
}
