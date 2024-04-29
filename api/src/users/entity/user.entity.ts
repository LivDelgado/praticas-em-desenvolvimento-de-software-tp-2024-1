import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  APPLICANT = 'APPLICANT',
  COMPANY = 'COMPANY',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.APPLICANT,
  })
  role: UserRole;

  @Column({
    default: new Date(),
  })
  date: Date;
}
