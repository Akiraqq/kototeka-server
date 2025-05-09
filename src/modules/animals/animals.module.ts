import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsResolver } from './animals.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities';
import { Organization } from '../organizations/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Organization])],
  providers: [AnimalsService, AnimalsResolver],
  exports: [AnimalsService],
})
export class AnimalsModule {}
