import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities';
import { Repository } from 'typeorm';
import { CreateOrganizationInput, UpdateOrganizationInput } from './dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<Organization> {
    const organization = this.organizationRepository.create(
      createOrganizationInput,
    );
    return this.organizationRepository.save(organization);
  }

  async update(
    updateOrganizationInput: UpdateOrganizationInput,
  ): Promise<Organization> {
    const { id, ...updateData } = updateOrganizationInput;
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    await this.organizationRepository.update(id, updateData);
    return this.organizationRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  async findOne(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }
}
