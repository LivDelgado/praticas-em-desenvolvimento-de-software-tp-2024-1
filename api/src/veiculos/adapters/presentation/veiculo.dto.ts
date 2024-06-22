import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { StatusVeiculo, Veiculo } from '../../core/veiculo.entity';

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

  static fromVeiculo(veiculo: Veiculo): GetVeiculoDto {
    const veiculoDto = new GetVeiculoDto();
    veiculoDto.ano = veiculo.ano;
    veiculoDto.modelo = veiculo.modelo;
    veiculoDto.montadora = veiculo.montadora;
    veiculoDto.status = StatusVeiculo.DISPONIVEL;
    veiculoDto.dataAquisicao = veiculo.dataAquisicao;
    veiculoDto.id = veiculo.id;

    if (veiculo.manutencoes && veiculo.manutencoes.length) {
      const today = new Date();
      if (new Date(veiculo.manutencoes[0].dataInicio) <= today) {
        veiculoDto.status = StatusVeiculo.EM_MANUTENCAO;
      }

      const nextManutencao = veiculo.manutencoes.filter(
        (manutencao) => new Date(manutencao.dataInicio) >= today,
      )[0];

      if (nextManutencao)
        veiculoDto.nextManutencaoDate = new Date(nextManutencao.dataInicio);
    }

    return veiculoDto;
  }
}
