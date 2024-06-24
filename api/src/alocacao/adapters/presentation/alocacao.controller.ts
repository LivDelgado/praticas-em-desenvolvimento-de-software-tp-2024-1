import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../../http-exception.filter';
import { AlocacaoDto } from './alocacao.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IAlocacaoService } from 'src/alocacao/core/ports/inbound/IAlocacaoService';
import { GetMotoristaDto } from 'src/motorista/adapters/presentation/motorista.dto';

@Controller('alocacoes')
@ApiTags('Alocação')
@UseFilters(new HttpExceptionFilter())
export class AlocacaoController {
  constructor(private alocacaoService: IAlocacaoService) {}

  @Get('/motoristas-disponiveis')
  @UseFilters(new HttpExceptionFilter())
  async list(
    @Param('veiculoId', new ParseIntPipe()) veiculoId: number,
  ): Promise<GetMotoristaDto[]> {
    const motoristas = await this.alocacaoService.listarMotoristasDisponiveis();
    return motoristas.map((it) => GetMotoristaDto.fromDomain(it));
  }

  @Put('/veiculos/:veiculoId')
  @ApiParam({
    name: 'veiculoId',
    required: true,
    description: 'ID do veículo',
    type: Number,
  })
  @UseFilters(new HttpExceptionFilter())
  async put(
    @Param('veiculoId', new ParseIntPipe()) veiculoId: number,
    @Body() alocacao: AlocacaoDto,
  ): Promise<GetMotoristaDto> {
    try {
      const created = await this.alocacaoService.alocarMotorista(
        alocacao.motoristaId,
        veiculoId,
      );
      return GetMotoristaDto.fromDomain(created);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('motoristas/:motoristaId')
  @ApiParam({
    name: 'motoristaId',
    required: true,
    description: 'ID do motorista',
    type: Number,
  })
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('motoristaId', new ParseIntPipe()) motoristaId: number) {
    await this.alocacaoService.liberarMotorista(motoristaId);
  }
}
