import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities';
import { CreateAnimalInput, UpdateAnimalInput } from './dto';
import { User } from '@src/types';
import { Role } from '@src/common/enums';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  async createAnimal(
    createAnimalInput: CreateAnimalInput,
    currentUser: User,
  ): Promise<Animal> {
    const { role, organizationId: userOrgId, userId } = currentUser;
    const { organizationId: inputOrgId, ...restInput } = createAnimalInput;
    let finalOrganizationId: string;

    if (role === Role.VOLUNTEER) {
      if (!userOrgId) {
        throw new BadRequestException(
          'Organization ID not found for volunteer',
        );
      }
      finalOrganizationId = userOrgId;
    } else if (role === Role.ADMIN) {
      if (!inputOrgId) {
        throw new BadRequestException('Admin must provide organization ID');
      }

      finalOrganizationId = inputOrgId;
    } else {
      throw new ForbiddenException('You are not allowed to create animals');
    }

    const animal = this.animalRepository.create({
      ...restInput,
      organization: { id: finalOrganizationId },
      createdBy: { id: userId },
    });

    return this.animalRepository.save(animal);
  }

  async updateAnimal(
    updateAnimalInput: UpdateAnimalInput,
    currentUser: User,
  ): Promise<Animal> {
    const { id, ...updateData } = updateAnimalInput;

    await this.getAnimalIfAuthorized(id, currentUser);
    await this.animalRepository.update(id, updateData);

    return this.animalRepository.findOne({ where: { id } });
  }

  async deleteAnimal(id: string, currentUser: User): Promise<Animal> {
    const animal = await this.getAnimalIfAuthorized(id, currentUser);
    await this.animalRepository.softRemove(animal);

    return animal;
  }

  async restoreAnimal(id: string, currentUser: User): Promise<Animal> {
    await this.getAnimalIfAuthorized(id, currentUser);
    await this.animalRepository.restore(id);

    return this.animalRepository.findOne({ where: { id } });
  }

  async findAllAnimals(includeDeleted: boolean = false): Promise<Animal[]> {
    return this.animalRepository.find({ withDeleted: includeDeleted });
  }

  async findOneAnimal(id: string): Promise<Animal> {
    const animal = await this.animalRepository.findOne({
      where: { id },
    });
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return animal;
  }

  private async getAnimalIfAuthorized(
    id: string,
    currentUser: User,
  ): Promise<Animal> {
    const { role, organizationId: userOrgId } = currentUser;
    const animal = await this.animalRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }

    if (role === Role.VOLUNTEER) {
      if (!animal.organization || animal.organization.id !== userOrgId) {
        throw new ForbiddenException(
          'You are not allowed to update animals from other organizations',
        );
      }
    } else if (role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to update animals');
    }

    return animal;
  }
}
