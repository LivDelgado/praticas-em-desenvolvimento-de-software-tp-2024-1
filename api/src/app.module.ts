import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { JobsModule } from './job/job.module';
import { JobsController } from './job/controller/job.controller';
import { JobsDataSource } from './job/datasource/job.datasource';
import { Job } from './job/entity/job.entity';
import { AuthController } from './auth/controller/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [User, Job],

      migrations: [],
    }),
    AuthModule,
    UsersModule,
    JobsModule,
  ],
  controllers: [JobsController, AuthController],
  providers: [
    JobsDataSource,
  ],
})
export class AppModule {}
