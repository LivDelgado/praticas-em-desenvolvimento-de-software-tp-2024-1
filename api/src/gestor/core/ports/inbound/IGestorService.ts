import { Gestor } from '../../gestor';

export abstract class IGestorService {
  abstract findOne(email: string): Promise<Gestor>;
  abstract create(gestor: Gestor): Promise<Gestor>;
  abstract update(id: number, gestor: Gestor): Promise<Gestor>;
  abstract list(): Promise<Gestor[]>;
  abstract getById(id: number): Promise<Gestor>;
  abstract deleteById(id: number): Promise<void>;
}
