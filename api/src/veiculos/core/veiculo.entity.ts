import { Manutencao } from '../../manutencao/core/manutencao.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum StatusVeiculo {
  DISPONIVEL = 'DISPONÍVEL',
  EM_MANUTENCAO = 'EM MANUTENÇÃO',
  ALOCADO = 'ALOCADO',
}

@Entity()
export class Veiculo {
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

  @OneToMany(() => Manutencao, (manutencao) => manutencao.veiculo)
  manutencoes: Manutencao[];
}
