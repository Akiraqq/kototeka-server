import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnimalsService } from './animals.service';
import {
  mockAnimalRepository,
  exampleAnimal,
  volunteer,
  admin,
  exampleAnimalWithId,
  exampleAnimalWithDeleted,
  updateInput,
} from './mock';
import { Animal } from './entities';
import { User } from '@src/types';
import { CreateAnimalInput, UpdateAnimalInput } from './dto';
import { Role } from '@src/common/enums';

describe('AnimalsService', () => {
  let service: AnimalsService;
  let repository: Repository<Animal>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsService,
        {
          provide: getRepositoryToken(Animal),
          useFactory: mockAnimalRepository,
        },
      ],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
    repository = module.get<Repository<Animal>>(getRepositoryToken(Animal));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAnimal', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create animal for volunteer', async () => {
      const result = await service.createAnimal(exampleAnimal, volunteer);

      expect(repository.create).toHaveBeenCalledWith({
        name: exampleAnimal.name,
        description: exampleAnimal.description,
        type: exampleAnimal.type,
        status: exampleAnimal.status,
        photoUrls: exampleAnimal.photoUrls,
        organization: { id: volunteer.organizationId },
        createdBy: { id: volunteer.userId },
      });
      expect(result).toBe(exampleAnimal);
    });

    it('should throw if volunteer has no organizationId', async () => {
      const volunteerWithoutOrg: User = {
        ...volunteer,
        organizationId: null,
      };

      const inputWithoutOrg: CreateAnimalInput = {
        ...exampleAnimal,
        organizationId: volunteerWithoutOrg.organizationId,
      };

      await expect(
        service.createAnimal(inputWithoutOrg, volunteerWithoutOrg),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw if admin does not provide organizationId', async () => {
      const adminWithoutOrg: User = {
        ...admin,
        organizationId: null,
      };

      const inputWithoutOrg: CreateAnimalInput = {
        ...exampleAnimal,
        organizationId: adminWithoutOrg.organizationId,
      };

      await expect(
        service.createAnimal(inputWithoutOrg, adminWithoutOrg),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create animal for admin with organizationId from input', async () => {
      const adminWithoutOrg: User = {
        ...admin,
        organizationId: null,
      };

      const result = await service.createAnimal(exampleAnimal, adminWithoutOrg);

      expect(result).toBe(exampleAnimal);
    });

    it('should throw if user is unauthorized role', async () => {
      const user: User = {
        ...volunteer,
        role: Role.USER,
      };

      await expect(service.createAnimal(exampleAnimal, user)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('updateAnimal', () => {
    it('should update animal for admin', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue({
        ...exampleAnimal,
        name: updateInput.name,
      });

      const result = await service.updateAnimal(updateInput, admin);

      expect(result?.name).toBe(updateInput.name);
    });

    it('should throw if volunteer tries to update animal from another organization', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce({
        ...exampleAnimal,
        organization: { id: 'another-org' },
      });
      await expect(
        service.updateAnimal(updateInput, volunteer),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw if animal not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        service.updateAnimal(updateInput, volunteer),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw if unauthorized role', async () => {
      const user: User = {
        ...volunteer,
        role: Role.USER,
      };
      (repository.findOne as jest.Mock).mockResolvedValue(exampleAnimal);

      await expect(service.updateAnimal(updateInput, user)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('findAllAnimals', () => {
    it('should return all animals', async () => {
      (repository.find as jest.Mock).mockResolvedValue([exampleAnimal]);
      const result = await service.findAllAnimals();
      expect(result).toEqual([exampleAnimal]);
    });

    it('should return all animals including deleted ones', async () => {
      (repository.find as jest.Mock).mockResolvedValue([
        exampleAnimal,
        exampleAnimalWithDeleted,
      ]);
      const result = await service.findAllAnimals(true);
      expect(repository.find).toHaveBeenCalledWith({ withDeleted: true });
      expect(result).toEqual([exampleAnimal, exampleAnimalWithDeleted]);
    });
  });

  describe('findOneAnimal', () => {
    it('should return animal by ID', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(exampleAnimalWithId);
      const result = await service.findOneAnimal(exampleAnimalWithId.id);
      expect(result).toBe(exampleAnimalWithId);
    });

    it('should throw if animal not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.findOneAnimal('wrong id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteAnimal', () => {
    it('should soft remove by animal', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(exampleAnimal);
      const result = await service.deleteAnimal(exampleAnimalWithId.id, admin);

      expect(repository.softRemove).toHaveBeenCalledWith(exampleAnimal);
      expect(result).toBe(exampleAnimal);
    });
  });

  describe('restoreAnimal', () => {
    it('should restore soft-deleted animal', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(
        exampleAnimalWithDeleted,
      );
      const result = await service.restoreAnimal(
        exampleAnimalWithDeleted.id,
        admin,
      );

      expect(repository.restore).toHaveBeenCalledWith(
        exampleAnimalWithDeleted.id,
      );
      expect(result).toEqual(exampleAnimalWithDeleted);
    });
  });
});
