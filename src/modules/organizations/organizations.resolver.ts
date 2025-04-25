import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Organization } from './entities';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationInput, UpdateOrganizationInput } from './dto';
import { GqlJwtGuard, Roles, RolesGuard } from '@src/common';
import { Role } from '@src/common/enums';

@Resolver(() => Organization)
export class OrganizationsResolver {
  constructor(private readonly organizationService: OrganizationsService) {}

  @Mutation(() => Organization)
  @Roles(Role.ADMIN)
  @UseGuards(GqlJwtGuard, RolesGuard)
  createOrganization(
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<Organization> {
    return this.organizationService.create(createOrganizationInput);
  }

  @Mutation(() => Organization)
  @Roles(Role.ADMIN)
  @UseGuards(GqlJwtGuard, RolesGuard)
  updateOrganization(
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
  ): Promise<Organization> {
    return this.organizationService.update(updateOrganizationInput);
  }

  @Query(() => [Organization])
  findAllOrganizations(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @Query(() => Organization)
  findOrganization(@Args('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(id);
  }
}
