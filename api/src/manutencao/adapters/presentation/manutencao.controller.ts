import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../../http-exception.filter';
import { GetManutencaoDto, ManutencaoDto } from './manutencao.dto';
import { IManutencaoService } from 'src/manutencao/core/ports/inbound/IManutencaoService';

@Controller('veiculos/:veiculoId/manutencoes')
@UseFilters(new HttpExceptionFilter())
export class ManutencaoController {
  constructor(private manutencaoService: IManutencaoService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async post(
    @Param('veiculoId', new ParseIntPipe()) veiculoId,
    @Body() manutencao: ManutencaoDto,
  ): Promise<GetManutencaoDto> {
    try {
      const created = await this.manutencaoService.create(
        veiculoId,
        ManutencaoDto.toDomain(manutencao),
      );
      return GetManutencaoDto.fromDomain(created);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/:manutencaoId')
  @UseFilters(new HttpExceptionFilter())
  async put(
    @Param('veiculoId', new ParseIntPipe()) veiculoId,
    @Param('manutencaoId', new ParseIntPipe()) manutencaoId,
    @Body() manutencao: ManutencaoDto,
  ): Promise<GetManutencaoDto> {
    try {
      const updated = await this.manutencaoService.update(
        veiculoId,
        manutencaoId,
        ManutencaoDto.toDomain(manutencao),
      );
      return GetManutencaoDto.fromDomain(updated);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:manutencaoId')
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('manutencaoId', new ParseIntPipe()) manutencaoId) {
    await this.manutencaoService.deleteById(manutencaoId);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async list(
    @Param('veiculoId', new ParseIntPipe()) veiculoId,
  ): Promise<GetManutencaoDto[]> {
    const manutencoes = await this.manutencaoService.list(veiculoId);
    return manutencoes.map((manutencao) =>
      GetManutencaoDto.fromDomain(manutencao),
    );
  }
}
