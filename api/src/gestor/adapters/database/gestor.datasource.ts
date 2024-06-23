import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GestorEntity } from './gestor.entity';
import { IGestorRepository } from '../../core/ports/outbound/IGestorRepository';
import { Gestor } from '../../core/gestor';

@Injectable()
@Dependencies(getRepositoryToken(GestorEntity))
export class GestorDataSource implements IGestorRepository {
  constructor(
    @InjectRepository(GestorEntity)
    private readonly gestorRepository: Repository<GestorEntity>,
  ) {}

  async save(gestor: Gestor): Promise<Gestor> {
    const newGestor = this.gestorRepository.create(
      GestorEntity.fromDomain(gestor),
    );
    const created = await this.gestorRepository.save(newGestor);
    return created?.toDomain();
  }

  async update(id: number, gestor: Gestor): Promise<Gestor> {
    gestor.id = id;
    const updated = await this.gestorRepository.save(
      GestorEntity.fromDomain(gestor),
    );
    return updated?.toDomain();
  }

  async findOne(email: string): Promise<Gestor> {
    const gestor = await this.gestorRepository.findOneBy({
      email: email,
    });

    return gestor.toDomain();
  }

  async findById(id: number): Promise<Gestor> {
    const gestores = await this.gestorRepository.find({
      where: { id: id },
    });

    if (gestores.length) return gestores[0].toDomain();
    return null;
  }

  async findAll(): Promise<Gestor[]> {
    const gestores = await this.gestorRepository
      .createQueryBuilder('GestorEntity')
      .select()
      .getMany();

    return gestores.map((it) => it.toDomain());
  }

  async deleteById(id: number): Promise<void> {
    this.gestorRepository.delete({ id: id });
  }
}
