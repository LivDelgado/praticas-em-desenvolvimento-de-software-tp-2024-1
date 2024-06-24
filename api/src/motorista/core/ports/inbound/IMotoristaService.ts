import { Motorista } from '../../motorista';

export abstract class IMotoristaService {
  abstract create(motorista: Motorista): Promise<Motorista>;
  abstract update(id: number, motorista: Motorista): Promise<Motorista>;
  abstract deleteById(id: number): Promise<void>;
  abstract list(): Promise<Motorista[]>;
}
