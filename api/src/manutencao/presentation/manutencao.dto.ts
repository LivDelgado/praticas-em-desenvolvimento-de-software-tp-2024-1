import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { Manutencao } from '../core/manutencao.entity';
import { Veiculo } from '../../veiculos/core/veiculo.entity';

export class ManutencaoDto {
  @IsDateString()
  @ApiProperty({
    description: 'Data de início',
  })
  dataInicio: Date;

  @IsDateString()
  @ApiProperty({
    description: 'Data de fim',
  })
  dataFim: Date;

  static toDomain(
    manutencaoDto: ManutencaoDto,
    veiculo: Veiculo | undefined = undefined,
  ): Manutencao {
    const manutencao = new Manutencao();
    manutencao.dataInicio = manutencaoDto.dataInicio;
    manutencao.dataFim = manutencaoDto.dataFim;
    manutencao.veiculo = veiculo;

    return manutencao;
  }
}

export class GetManutencaoDto extends ManutencaoDto {
  id: number;

  static fromDomain(manutencao: Manutencao): GetManutencaoDto {
    const manutencaoDto = new GetManutencaoDto();
    manutencaoDto.dataInicio = manutencao.dataInicio;
    manutencaoDto.dataFim = manutencao.dataFim;
    manutencaoDto.id = manutencao.id;

    return manutencaoDto;
  }
}
