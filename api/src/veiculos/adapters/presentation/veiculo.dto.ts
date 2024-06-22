import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { StatusVeiculo, Veiculo } from 'src/veiculos/core/veiculo';

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

  static toDomain(veiculoDto: VeiculoDto): Veiculo {
    const veiculo = new Veiculo();

    veiculo.ano = veiculoDto.ano;
    veiculo.montadora = veiculoDto.montadora;
    veiculo.modelo = veiculoDto.modelo;
    veiculo.dataAquisicao = veiculoDto.dataAquisicao;

    return veiculo;
  }
}

export class GetVeiculoDto extends VeiculoDto {
  id: number;
  nextManutencaoDate: Date;

  @IsEnum(StatusVeiculo)
  @ApiProperty({
    enum: ['DISPONÍVEL', 'EM MANUTENÇÃO', 'ALOCADO'],
    description: 'Status do veículo',
    default: StatusVeiculo.DISPONIVEL,
  })
  status: StatusVeiculo;

  static fromDomain(veiculo: Veiculo): GetVeiculoDto {
    const veiculoDto = new GetVeiculoDto();

    veiculoDto.id = veiculo.id;
    veiculoDto.montadora = veiculo.montadora;
    veiculoDto.modelo = veiculo.modelo;
    veiculoDto.ano = veiculo.ano;
    veiculoDto.dataAquisicao = veiculo.dataAquisicao;
    veiculoDto.status = veiculo.getStatus();
    veiculoDto.nextManutencaoDate = veiculo.getNextManutencaoDate();

    return veiculoDto;
  }
}
