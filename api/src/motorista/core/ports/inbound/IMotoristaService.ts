import { Motorista } from '../../motorista';

export abstract class IMotoristaService {
  abstract create(motorista: Motorista): Promise<Motorista>;
}
