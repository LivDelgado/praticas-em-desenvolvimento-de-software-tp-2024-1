import { Gestor } from '../../core/gestor';

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GestorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  email: string;

  toDomain(): Gestor {
    const domain = new Gestor();

    domain.id = this.id;
    domain.email = this.email;
    domain.nome = this.nome;
    domain.sobrenome = this.sobrenome;

    return domain;
  }

  static fromDomain(gestor: Gestor): GestorEntity {
    const entity = new GestorEntity();

    entity.id = gestor.id;
    entity.email = gestor.email;
    entity.nome = gestor.nome;
    entity.sobrenome = gestor.sobrenome;

    return entity;
  }
}
