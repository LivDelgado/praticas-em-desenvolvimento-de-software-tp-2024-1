import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GestorEntity } from './gestor/adapters/database/gestor.entity';
import { GestorsModule } from './gestor/gestor.module';
import { GestorController } from './gestor/adapters/presentation/gestor.controller';
import { GestorDataSource } from './gestor/adapters/database/gestor.datasource';
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
import { NotificacoesModule } from './notificacoes/notificacoes.module';
import { AlocacaoController } from './alocacao/adapters/presentation/alocacao.controller';
import { AlocacaoModule } from './alocacao/alocacao.module';

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
      synchronize: false,
      autoLoadEntities: true,
      migrations: [],
    }),
    GestorsModule,
    VeiculosModule,
    ManutencaoModule,
    NotificacoesModule,
    MotoristaModule,
    AlocacaoModule,
  ],
  controllers: [
    GestorController,
    VeiculoController,
    ManutencaoController,
    MotoristaController,
    AlocacaoController,
  ],
  providers: [
    GestorDataSource,
    VeiculosDataSource,
    ManutencaoDataSource,
    MotoristaDataSource,
  ],
})
export class AppModule {}
