import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationsService } from './organizations.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Organization } from './entities';
import { mockOrganization } from './mock';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let repo: Repository<Organization>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: getRepositoryToken(Organization),
          useValue: {
            find: jest.fn().mockResolvedValue([mockOrganization]),
            findOne: jest.fn().mockResolvedValue(mockOrganization),
            create: jest.fn().mockReturnValue(mockOrganization),
            save: jest.fn().mockResolvedValue(mockOrganization),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
    repo = module.get<Repository<Organization>>(
      getRepositoryToken(Organization),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all organizations', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockOrganization]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should return one organization by id', async () => {
    const result = await service.findOne(mockOrganization.id);
    expect(result).toEqual(mockOrganization);
    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: mockOrganization.id },
    });
  });

  it('should create a new organization', async () => {
    const result = await service.create(mockOrganization);
    expect(result).toEqual(mockOrganization);
    expect(repo.save).toHaveBeenCalledWith(mockOrganization);
  });

  it('should update an organization', async () => {
    const updatedOrganization = {
      ...mockOrganization,
      name: 'Updated Name',
    };

    (repo.findOne as jest.Mock).mockResolvedValue(updatedOrganization);

    const result = await service.update({
      id: mockOrganization.id,
      name: 'Updated Name',
    });
    expect(result).toEqual(updatedOrganization);
    expect(repo.update).toHaveBeenCalledWith(mockOrganization.id, {
      name: 'Updated Name',
    });
    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: mockOrganization.id },
    });
  });
});
