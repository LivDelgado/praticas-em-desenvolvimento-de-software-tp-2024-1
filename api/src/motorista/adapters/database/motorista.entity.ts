import { VeiculoEntity } from '../../../veiculos/adapters/database/veiculo.entity';
import { Motorista } from '../../core/motorista';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('motorista')
export class MotoristaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
  @Column()
  sobrenome: string;

  @Column()
  email: string;

  @Column({
    name: 'imagemAvatar',
    type: 'bytea',
    nullable: false,
  })
  imagemAvatar: Buffer;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

  @OneToOne(() => VeiculoEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'veiculoId' })
  veiculo: VeiculoEntity | null;

  toDomain(): Motorista {
    const domain = new Motorista();

    domain.id = this.id;
    domain.nome = this.nome;
    domain.sobrenome = this.sobrenome;
    domain.email = this.email;
    domain.imagemAvatar = this.imagemAvatar.toString('base64');

    domain.veiculo = this.veiculo?.toDomain();

    return domain;
  }

  static fromDomain(motorista: Motorista): MotoristaEntity {
    const entity = new MotoristaEntity();

    entity.id = motorista.id;
    entity.email = motorista.email;
    entity.nome = motorista.nome;
    entity.sobrenome = motorista.sobrenome;
    entity.imagemAvatar = Buffer.from(motorista.imagemAvatar, 'base64');

    entity.veiculo = motorista.veiculo
      ? VeiculoEntity.fromDomain(motorista.veiculo)
      : undefined;

    return entity;
  }
}
