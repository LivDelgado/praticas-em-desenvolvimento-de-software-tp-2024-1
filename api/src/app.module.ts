import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VeiculosModule } from './veiculos/veiculo.module';
import { Veiculo } from './veiculos/core/veiculo.entity';
import { VeiculoController } from './veiculos/presentation/veiculo.controller';
import { VeiculosDataSource } from './veiculos/adapters/database/veiculo.datasource';
import { ManutencaoModule } from './manutencao/manutencao.module';
import { ManutencaoController } from './manutencao/presentation/manutencao.controller';
import { ManutencaoDataSource } from './manutencao/adapters/database/manutencao.datasource';
import { Manutencao } from './manutencao/core/manutencao.entity';

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
      entities: [Veiculo, Manutencao],
      migrations: [],
    }),
    VeiculosModule,
    ManutencaoModule,
  ],
  controllers: [VeiculoController, ManutencaoController],
  providers: [VeiculosDataSource, ManutencaoDataSource],
})
export class AppModule {}
