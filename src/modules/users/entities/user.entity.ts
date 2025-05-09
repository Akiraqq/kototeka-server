import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '@src/common/enums';
import { Organization } from '@src/modules/organizations/entities';
import { Animal } from '@src/modules/animals/entities';

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

  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: true })
  refresh_token: string;

  @Field(() => Organization, { nullable: true })
  @ManyToOne(() => Organization, (organization) => organization.volunteers, {
    nullable: true,
  })
  organization: Organization;

  @Field(() => [Animal], { nullable: true })
  @OneToMany(() => Animal, (animal) => animal.createdBy)
  createdAnimals?: Animal[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
