import { User } from 'src/users/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum JobType {
  ON_SITE = 'ON_SITE',
  HYBRID = 'HYBRID',
  REMOTE = 'REMOTE',
}

export enum ExperienceLevel {
  ALL = 'ALL',
  ENTRYLEVEL = 'entryLevel',
  MIDSENIORLEVEL = 'midSeniorLevel',
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  contactPhone: string;

  @Column()
  email: string;

  @Column()
  companyId: number;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: JobType,
    default: JobType.ON_SITE,
  })
  type: JobType;

  @Column()
  minSalary: number;

  @Column()
  maxSalary: number;

  @Column()
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: ExperienceLevel,
    default: ExperienceLevel.ALL,
  })
  experience: ExperienceLevel;

  @Column({
    default: new Date(),
  })
  date: Date;

  @Column({
    default: true,
  })
  opened: boolean;

  @Column({
    default: true,
  })
  allowFullTime: boolean;

  @Column({
    default: true,
  })
  allowInterim: boolean;

  @Column({
    default: true,
  })
  allowPartTime: boolean;
}
