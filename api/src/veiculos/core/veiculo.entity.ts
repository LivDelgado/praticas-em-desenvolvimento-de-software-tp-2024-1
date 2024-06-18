import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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
    type: 'enum',
    enum: StatusVeiculo,
    default: StatusVeiculo.DISPONIVEL,
  })
  status: StatusVeiculo;

  @Column({
    name: 'dataAquisicao',
    default: new Date(),
  })
  dataAquisicao: Date;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
