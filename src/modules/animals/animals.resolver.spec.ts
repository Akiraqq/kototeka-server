import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsResolver } from './animals.resolver';
import { AnimalsService } from './animals.service';
import {
  admin,
  exampleAnimal,
  exampleAnimalWithId,
  mockAnimalsService,
  updateInput,
  volunteer,
} from './mock';

describe('AnimalsResolver', () => {
  let resolver: AnimalsResolver;
  let service: AnimalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsResolver,
        {
          provide: AnimalsService,
          useValue: mockAnimalsService,
        },
      ],
    }).compile();

    resolver = module.get<AnimalsResolver>(AnimalsResolver);
    service = module.get<AnimalsService>(AnimalsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createAnimal', () => {
    it('should call service.createAnimal and return animal', async () => {
      const result = await resolver.createAnimal(exampleAnimal, volunteer);

      expect(result).toEqual(exampleAnimalWithId);
      expect(service.createAnimal).toHaveBeenCalledWith(
        exampleAnimal,
        volunteer,
      );
    });
  });

  describe('findAllAnimals', () => {
    it('should call service.findAllAnimals and return all animals', async () => {
      const result = await resolver.findAllAnimals();

      expect(result).toEqual([exampleAnimalWithId]);
      expect(service.findAllAnimals).toHaveBeenCalled();
    });

    it('should call service.findAllAnimals with withDeleted flag', async () => {
      const withDeleted = true;

      const result = await resolver.findAllAnimals(withDeleted);

      expect(result).toEqual([exampleAnimalWithId]);
      expect(service.findAllAnimals).toHaveBeenCalledWith(true);
    });
  });

  describe('findAnimal', () => {
    it('should call service.findOneAnimal with id and return one animal', async () => {
      const result = await resolver.findAnimal(exampleAnimalWithId.id);

      expect(result).toEqual(exampleAnimalWithId);
      expect(service.findOneAnimal).toHaveBeenCalledWith(
        exampleAnimalWithId.id,
      );
    });
  });

  describe('deleteAnimal', () => {
    it('should call service.deleteAnimal and return deleted animal', async () => {
      const result = await resolver.deleteAnimal(
        exampleAnimalWithId.id,
        volunteer,
      );

      expect(result).toEqual(exampleAnimalWithId);
      expect(service.deleteAnimal).toHaveBeenCalledWith(
        exampleAnimalWithId.id,
        volunteer,
      );
    });
  });

  describe('updateAnimal', () => {
    it('should call service.updateAnimal and return updated animal', async () => {
      const result = await resolver.updateAnimal(updateInput, admin);

      expect(result).toEqual({
        ...exampleAnimalWithId,
        ...updateInput,
      });

      expect(service.updateAnimal).toHaveBeenCalledWith(updateInput, admin);
    });
  });

  describe('restoreAnimal', () => {
    it('should call service.restoreAnimal and return restored animal', async () => {
      const result = await resolver.restoreAnimal(
        exampleAnimalWithId.id,
        admin,
      );

      expect(result).toEqual(exampleAnimalWithId);
      expect(service.restoreAnimal).toHaveBeenCalledWith(
        exampleAnimalWithId.id,
        admin,
      );
    });
  });
});
