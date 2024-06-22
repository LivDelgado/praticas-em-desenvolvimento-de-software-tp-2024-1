import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { Manutencao } from 'src/manutencao/core/manutencao';
import { VeiculoDto } from 'src/veiculos/adapters/presentation/veiculo.dto';

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
    veiculo: VeiculoDto | undefined = undefined,
  ): Manutencao {
    const manutencao = new Manutencao();

    manutencao.dataInicio = manutencaoDto.dataInicio;
    manutencao.dataFim = manutencaoDto.dataFim;
    manutencao.veiculo = veiculo ? VeiculoDto.toDomain(veiculo) : undefined;

    return manutencao;
  }
}

export class GetManutencaoDto extends ManutencaoDto {
  id: number;

  static fromDomain(manutencao: Manutencao): GetManutencaoDto {
    const manutencaoDto = new GetManutencaoDto();

    manutencaoDto.id = manutencao.id;
    manutencaoDto.dataInicio = manutencao.dataInicio;
    manutencaoDto.dataFim = manutencao.dataFim;

    return manutencaoDto;
  }
}
