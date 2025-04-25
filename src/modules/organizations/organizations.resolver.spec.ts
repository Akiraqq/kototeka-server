import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';
import { mockOrganization } from './mock';

describe('OrganizationsResolver', () => {
  let resolver: OrganizationsResolver;
  let service: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsResolver,
        {
          provide: OrganizationsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockOrganization]),
            findOne: jest.fn().mockResolvedValue(mockOrganization),
            create: jest.fn().mockResolvedValue(mockOrganization),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<OrganizationsResolver>(OrganizationsResolver);
    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all organizations', async () => {
    const result = await resolver.findAllOrganizations();
    expect(result).toEqual([mockOrganization]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return an organization by id', async () => {
    const result = await resolver.findOrganization(mockOrganization.id);
    expect(result).toEqual(mockOrganization);
    expect(service.findOne).toHaveBeenCalledWith(mockOrganization.id);
  });

  it('should create an organizations', async () => {
    const result = await resolver.createOrganization(mockOrganization);
    expect(result).toEqual(mockOrganization);
    expect(service.create).toHaveBeenCalledWith(mockOrganization);
  });

  it('should update an organizations', async () => {
    const updatedOrganization = {
      ...mockOrganization,
      name: 'Updated Name',
    };

    (service.update as jest.Mock).mockResolvedValue(updatedOrganization);

    const result = await resolver.updateOrganization(updatedOrganization);
    expect(result).toEqual(updatedOrganization);
    expect(service.update).toHaveBeenCalledWith(updatedOrganization);
  });
});
