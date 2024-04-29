import { JobDto } from './job.dto';
import { JobType, ExperienceLevel } from '../job/entity/job.entity';
import { validate } from 'class-validator';

describe('JobDto', () => {
  it('should validate a valid JobDto instance', async () => {
    const jobDto = new JobDto();
    jobDto.name = 'Job Title';
    jobDto.description = 'Job Description';
    jobDto.contactPhone = '1234567890';
    jobDto.email = 'test@example.com';
    jobDto.companyId = 1;
    jobDto.location = 'Job Location';
    jobDto.type = JobType.ON_SITE;
    jobDto.minSalary = 1000;
    jobDto.maxSalary = 2000;
    jobDto.imageUrl = 'https://example.com/image.jpg';
    jobDto.experience = ExperienceLevel.ALL;
    jobDto.allowFullTime = true;
    jobDto.allowInterim = false;
    jobDto.allowPartTime = true;

    const errors = await validate(jobDto);
    expect(errors.length).toBe(0);
  });

  it('should validate invalid JobDto instance', async () => {
    const jobDto = new JobDto();
    // Set invalid values or leave required fields empty

    const errors = await validate(jobDto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
