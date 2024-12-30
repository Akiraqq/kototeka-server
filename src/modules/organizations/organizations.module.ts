import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationsService, OrganizationsResolver],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
