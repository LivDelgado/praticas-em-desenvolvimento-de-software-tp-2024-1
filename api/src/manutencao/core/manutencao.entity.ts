import { Veiculo } from '../../veiculos/core/veiculo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Manutencao {
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

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.manutencoes)
  veiculo: Veiculo;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
