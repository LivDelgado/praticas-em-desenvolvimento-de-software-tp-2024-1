import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsEnum, IsString } from 'class-validator';
import { StatusVeiculo } from '../core/veiculo.entity';

export class VeiculoDto {
  @IsString()
  @ApiProperty({
    description: 'Montadora',
  })
  montadora: string;

  @IsString()
  @ApiProperty({
    description: 'Modelo',
  })
  modelo: string;

  @IsString()
  @ApiProperty({
    description: 'Ano de fabricação',
  })
  ano: string;

  @IsDateString()
  @ApiProperty({
    description: 'Data de Aquisição',
  })
  dataAquisicao: Date;

  @IsEnum(StatusVeiculo)
  @ApiProperty({
    enum: ['DISPONÍVEL', 'EM MANUTENÇÃO', 'ALOCADO'],
    description: 'Status do veículo',
    default: StatusVeiculo.DISPONIVEL,
  })
  status: StatusVeiculo;
}
