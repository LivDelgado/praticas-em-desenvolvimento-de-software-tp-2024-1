import { Motorista } from '../../motorista';

export abstract class IMotoristaRepository {
  abstract save(motorista: Motorista): Promise<Motorista>;
  abstract update(id: number, motorista: Motorista): Promise<Motorista>;
}
