import { Gestor } from '../../gestor';

export abstract class IGestorRepository {
  abstract save(gestor: Gestor): Promise<Gestor>;
  abstract update(id: number, GestorEntity: Gestor): Promise<Gestor>;
  abstract findOne(email: string): Promise<Gestor>;
  abstract findById(id: number): Promise<Gestor>;
  abstract findAll(): Promise<Gestor[]>;
  abstract deleteById(id: number): Promise<void>;
}
