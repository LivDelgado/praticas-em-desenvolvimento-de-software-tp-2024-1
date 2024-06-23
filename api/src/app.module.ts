import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VeiculosModule } from './veiculos/veiculo.module';
import { VeiculoController } from './veiculos/adapters/presentation/veiculo.controller';
import { VeiculosDataSource } from './veiculos/adapters/database/veiculo.datasource';
import { ManutencaoModule } from './manutencao/manutencao.module';
import { ManutencaoController } from './manutencao/adapters/presentation/manutencao.controller';
import { ManutencaoDataSource } from './manutencao/adapters/database/manutencao.datasource';
import { ManutencaoEntity } from './manutencao/adapters/database/manutencao.entity';
import { VeiculoEntity } from './veiculos/adapters/database/veiculo.entity';
import { MotoristaController } from './motorista/adapters/presentation/motorista.controller';
import { MotoristaDataSource } from './motorista/adapters/database/motorista.datasource';
import { MotoristaEntity } from './motorista/adapters/database/motorista.entity';
import { MotoristaModule } from './motorista/motorista.module';

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
      entities: [VeiculoEntity, ManutencaoEntity, MotoristaEntity],
      migrations: [],
    }),
    VeiculosModule,
    ManutencaoModule,
    MotoristaModule,
  ],
  controllers: [VeiculoController, ManutencaoController, MotoristaController],
  providers: [VeiculosDataSource, ManutencaoDataSource, MotoristaDataSource],
})
export class AppModule {}
