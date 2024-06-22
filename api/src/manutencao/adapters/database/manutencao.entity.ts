import { VeiculoEntity } from '../../../veiculos/adapters/database/veiculo.entity';
import { Manutencao } from '../../../manutencao/core/manutencao';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ManutencaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'dataInicio',
  })
  dataInicio: Date;

  @Column({
    name: 'dataFim',
  })
  dataFim: Date;

  @ManyToOne(() => VeiculoEntity, (veiculo) => veiculo.manutencoes)
  veiculo: VeiculoEntity;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

  toDomain(): Manutencao {
    const domain = new Manutencao();

    domain.id = this.id;
    domain.dataInicio = this.dataInicio;
    domain.dataFim = this.dataFim;
    domain.veiculo = this.veiculo?.toDomain();

    return domain;
  }

  static fromDomain(manutencao: Manutencao): ManutencaoEntity {
    const entity = new ManutencaoEntity();

    entity.id = manutencao.id;
    entity.dataInicio = manutencao.dataInicio;
    entity.dataFim = manutencao.dataFim;
    entity.veiculo = manutencao.veiculo
      ? VeiculoEntity.fromDomain(manutencao.veiculo)
      : undefined;

    return entity;
  }
}
