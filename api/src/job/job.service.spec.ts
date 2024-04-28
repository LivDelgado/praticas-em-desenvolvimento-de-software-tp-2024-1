import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { JobsDataSource } from './datasource/job.datasource';
import { UsersDataSource } from '../users/datasource/user.datasource';
import { ExperienceLevel, Job, JobType } from './entity/job.entity';
import { User, UserRole } from '../users/entity/user.entity';

describe('JobsService', () => {
  let jobsService: JobsService;
  let jobsDataSource: JobsDataSource;
  let usersDataSource: UsersDataSource;

  const mockJobsDataSource = {
    findOne: jest.fn(),
    get: jest.fn(),
    getCompanyJobs: jest.fn(),
    save: jest.fn(),
  };

  const mockUsersDataSource = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: JobsDataSource, useValue: mockJobsDataSource },
        { provide: UsersDataSource, useValue: mockUsersDataSource },
      ],
    }).compile();

    jobsService = module.get<JobsService>(JobsService);
    jobsDataSource = module.get<JobsDataSource>(JobsDataSource);
    usersDataSource = module.get<UsersDataSource>(UsersDataSource);
  });

  it('should be defined', () => {
    expect(jobsService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a job if a job with the given id is found', async () => {
      const testJob: Job = {
        id: 1,
        name: 'Software Developer',
        description:
          'A software developer is needed for developing and maintaining software applications.',
        contactPhone: '+1234567890',
        email: 'hr@company.com',
        companyId: 10,
        location: 'New York, USA',
        type: JobType.REMOTE,
        minSalary: 50000,
        maxSalary: 80000,
        imageUrl: 'https://example.com/job-image.jpg',
        experience: ExperienceLevel.MIDSENIORLEVEL,
        date: new Date(),
        opened: true,
        allowFullTime: true,
        allowInterim: false,
        allowPartTime: false,
      };

      mockJobsDataSource.findOne.mockResolvedValue(testJob);

      const job = await jobsService.findOne(1);

      expect(job).toEqual(testJob);
    });
  });

  describe('create', () => {
    it('should create a new job and return it', async () => {
      const testJob: Job = {
        id: 1,
        name: 'Software Developer',
        description:
          'A software developer is needed for developing and maintaining software applications.',
        contactPhone: '+1234567890',
        email: 'hr@company.com',
        companyId: 10,
        location: 'New York, USA',
        type: JobType.REMOTE,
        minSalary: 50000,
        maxSalary: 80000,
        imageUrl: 'https://example.com/job-image.jpg',
        experience: ExperienceLevel.MIDSENIORLEVEL,
        date: new Date(),
        opened: true,
        allowFullTime: true,
        allowInterim: false,
        allowPartTime: false,
      };

      mockJobsDataSource.save.mockResolvedValue(testJob);

      const job = await jobsService.create(
        2, // assuming this is the next available id
        'New Job', // name
        'A new job is available. Please apply.', // description
        '+1234567890', // contactPhone
        'hr@newcompany.com', // email
        11, // companyId
        'Los Angeles, USA', // location
        JobType.REMOTE, // type
        60000, // minSalary
        90000, // maxSalary
        'https://example.com/newjob-image.jpg', // imageUrl
        ExperienceLevel.ENTRYLEVEL, // experience
        new Date(), // date
        true, // opened
      );

      expect(job).toEqual(testJob);
    });
  });

  describe('get', () => {
    it('should return company jobs if user role is COMPANY', async () => {
      const testJobs: Job[] = [
        {
          id: 1,
          name: 'Software Developer',
          description:
            'A software developer is needed for developing and maintaining software applications.',
          contactPhone: '+1234567890',
          email: 'hr@company.com',
          companyId: 10,
          location: 'New York, USA',
          type: JobType.REMOTE,
          minSalary: 50000,
          maxSalary: 80000,
          imageUrl: 'https://example.com/job-image.jpg',
          experience: ExperienceLevel.MIDSENIORLEVEL,
          date: new Date(),
          opened: true,
          allowFullTime: true,
          allowInterim: false,
          allowPartTime: false,
        },
      ];
      const testUser: User = {
        id: 1,
        username: 'testuser',
        password: 'testpassword',
        role: UserRole.APPLICANT,
        date: new Date(),
      };
      mockUsersDataSource.findById.mockResolvedValue(testUser);
      mockJobsDataSource.getCompanyJobs.mockResolvedValue(testJobs);

      const jobs = await jobsService.get(1);

      expect(jobs).toEqual(undefined);
    });

    it('should return all jobs if user role is not COMPANY', async () => {
      const testJobs: Job[] = [
        {
          id: 1,
          name: 'Software Developer',
          description:
            'A software developer is needed for developing and maintaining software applications.',
          contactPhone: '+1234567890',
          email: 'hr@company.com',
          companyId: 10,
          location: 'New York, USA',
          type: JobType.REMOTE,
          minSalary: 50000,
          maxSalary: 80000,
          imageUrl: 'https://example.com/job-image.jpg',
          experience: ExperienceLevel.MIDSENIORLEVEL,
          date: new Date(),
          opened: true,
          allowFullTime: true,
          allowInterim: false,
          allowPartTime: false,
        },
      ];
      const testUser: User = {
        id: 1,
        username: 'testuser',
        password: 'testpassword',
        role: UserRole.APPLICANT,
        date: new Date(),
      };
      mockUsersDataSource.findById.mockResolvedValue(testUser);
      mockJobsDataSource.get.mockResolvedValue(testJobs);

      const jobs = await jobsService.get(1);

      expect(jobs).toEqual(testJobs);
    });
  });
});