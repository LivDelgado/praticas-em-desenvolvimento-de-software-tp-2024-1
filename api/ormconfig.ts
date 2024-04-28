import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, } from "typeorm";
 
config();

const configService = new ConfigService();

export default new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host:  configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    logging: false,
    synchronize: false,
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['migrations/**{.ts,.js}'],
});

