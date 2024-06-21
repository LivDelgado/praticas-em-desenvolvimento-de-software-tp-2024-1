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
      return await this.manutencaoService.create(veiculoId, manutencao);
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
      return await this.manutencaoService.update(
        veiculoId,
        manutencaoId,
        manutencao,
      );
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
    return this.manutencaoService.list(veiculoId);
  }
}
