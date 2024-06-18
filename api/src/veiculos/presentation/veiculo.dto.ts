import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { StatusVeiculo, Veiculo } from '../core/veiculo.entity';

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

  static toDomain(veiculoDto: VeiculoDto): Veiculo {
    const veiculo = new Veiculo();
    veiculo.ano = veiculoDto.ano;
    veiculo.montadora = veiculoDto.montadora;
    veiculo.modelo = veiculoDto.modelo;
    veiculo.status = veiculoDto.status;
    veiculo.dataAquisicao = veiculoDto.dataAquisicao;

    return veiculo;
  }

  static fromVeiculo(veiculo: Veiculo): VeiculoDto {
    const veiculoDto = new VeiculoDto();
    veiculoDto.ano = veiculo.ano;
    veiculoDto.modelo = veiculo.modelo;
    veiculoDto.montadora = veiculo.montadora;
    veiculoDto.status = veiculo.status;
    veiculoDto.dataAquisicao = veiculo.dataAquisicao;

    return veiculoDto;
  }
}
