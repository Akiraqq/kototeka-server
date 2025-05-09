import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalStatus, AnimalType } from '../enums';
import { Organization } from '@src/modules/organizations/entities';
import { User } from '@src/modules/users/entities';

@ObjectType()
@Entity('animals')
export class Animal {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => AnimalType)
  @Column({
    type: 'enum',
    enum: AnimalType,
  })
  type: AnimalType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => AnimalStatus)
  @Column({
    type: 'enum',
    enum: AnimalStatus,
  })
  status: AnimalStatus;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  photoUrls?: string[];

  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.pets, {
    nullable: true,
  })
  organization: Organization;

  @Field(() => User)
  @ManyToOne(() => User, { nullable: false })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
