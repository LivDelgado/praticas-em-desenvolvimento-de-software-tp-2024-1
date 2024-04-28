import { Job, JobType, ExperienceLevel } from './job.entity';

describe('Job', () => {
  let job: Job;

  beforeEach(() => {
    job = new Job();
    job.id = 1;
    job.name = 'Software Engineer';
    job.description = 'Job description';
    job.contactPhone = '1234567890';
    job.email = 'test@example.com';
    job.companyId = 1;
    job.location = 'New York';
    job.type = JobType.HYBRID;
    job.minSalary = 50000;
    job.maxSalary = 80000;
    job.imageUrl = 'https://example.com/image.jpg';
    job.experience = ExperienceLevel.MIDSENIORLEVEL;
    job.date = new Date();
    job.opened = true;
    job.allowFullTime = true;
    job.allowInterim = true;
    job.allowPartTime = true;
  });

  it('should have correct properties', () => {
    expect(job.id).toBe(1);
    expect(job.name).toBe('Software Engineer');
    expect(job.description).toBe('Job description');
    expect(job.contactPhone).toBe('1234567890');
    expect(job.email).toBe('test@example.com');
    expect(job.companyId).toBe(1);
    expect(job.location).toBe('New York');
    expect(job.type).toBe(JobType.HYBRID);
    expect(job.minSalary).toBe(50000);
    expect(job.maxSalary).toBe(80000);
    expect(job.imageUrl).toBe('https://example.com/image.jpg');
    expect(job.experience).toBe(ExperienceLevel.MIDSENIORLEVEL);
    expect(job.date).toBeInstanceOf(Date);
    expect(job.opened).toBe(true);
    expect(job.allowFullTime).toBe(true);
    expect(job.allowInterim).toBe(true);
    expect(job.allowPartTime).toBe(true);
  });
});