import { ManutencaoEntity } from '../../../manutencao/adapters/database/manutencao.entity';
import { Veiculo } from '../../core/veiculo';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class VeiculoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  montadora: string;

  @Column()
  modelo: string;

  @Column({ length: 4 })
  ano: string;

  @Column({
    name: 'dataAquisicao',
  })
  dataAquisicao: Date;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

  @OneToMany(() => ManutencaoEntity, (manutencao) => manutencao.veiculo)
  manutencoes: ManutencaoEntity[];

  toDomain(): Veiculo {
    const domain = new Veiculo();

    domain.id = this.id;
    domain.montadora = this.montadora;
    domain.modelo = this.modelo;
    domain.ano = this.ano;
    domain.dataAquisicao = this.dataAquisicao;
    domain.manutencoes = this.manutencoes.map((it) => it.toDomain());

    return domain;
  }

  static fromDomain(veiculo: Veiculo): VeiculoEntity {
    const entity = new VeiculoEntity();

    entity.id = veiculo.id;
    entity.montadora = veiculo.montadora;
    entity.modelo = veiculo.modelo;
    entity.ano = veiculo.ano;
    entity.dataAquisicao = veiculo.dataAquisicao;
    entity.manutencoes = veiculo.manutencoes.map((it) =>
      ManutencaoEntity.fromDomain(it),
    );

    return entity;
  }
}
