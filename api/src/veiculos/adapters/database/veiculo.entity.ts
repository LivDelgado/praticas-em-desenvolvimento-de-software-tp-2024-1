import { MotoristaEntity } from '../../../motorista/adapters/database/motorista.entity';
import { ManutencaoEntity } from '../../../manutencao/adapters/database/manutencao.entity';
import { Veiculo } from '../../core/veiculo';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('veiculo')
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

  @OneToMany(() => ManutencaoEntity, (manutencao) => manutencao.veiculo, {
    cascade: true,
  })
  manutencoes: ManutencaoEntity[];

  @OneToOne(() => MotoristaEntity, (motorista) => motorista.veiculo, {
    cascade: true,
    nullable: true,
  })
  motorista: MotoristaEntity | null;

  toDomain(): Veiculo {
    const domain = new Veiculo();

    domain.id = this.id;
    domain.montadora = this.montadora;
    domain.modelo = this.modelo;
    domain.ano = this.ano;
    domain.dataAquisicao = this.dataAquisicao;
    domain.manutencoes = this.manutencoes?.map((it) => it.toDomain());

    return domain;
  }

  static fromDomain(veiculo: Veiculo): VeiculoEntity {
    const entity = new VeiculoEntity();

    entity.id = veiculo.id;
    entity.montadora = veiculo.montadora;
    entity.modelo = veiculo.modelo;
    entity.ano = veiculo.ano;
    entity.dataAquisicao = veiculo.dataAquisicao;
    entity.manutencoes = veiculo.manutencoes?.map((it) =>
      ManutencaoEntity.fromDomain(it),
    );

    return entity;
  }
}
