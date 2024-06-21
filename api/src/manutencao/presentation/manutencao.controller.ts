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
import { HttpExceptionFilter } from '../../http-exception.filter';
import { ManutencaoService } from '../core/manutencao.service';
import { GetManutencaoDto, ManutencaoDto } from './manutencao.dto';

@Controller('veiculos/:veiculoId/manutencoes')
@UseFilters(new HttpExceptionFilter())
export class ManutencaoController {
  constructor(private manutencaoService: ManutencaoService) {}

  @Post()
  async post(
    @Param('veiculoId', new ParseIntPipe()) veiculoId,
    @Body() manutencao: ManutencaoDto,
  ): Promise<GetManutencaoDto> {
    try {
      return this.manutencaoService.create(veiculoId, manutencao);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Get()
  // @UseFilters(new HttpExceptionFilter())
  // async list(): Promise<GetManutencaoDto[]> {
  //   return this.manutencaoService.list();
  // }

  // @Get('/:manutencaoId')
  // @UseFilters(new HttpExceptionFilter())
  // async get(
  //   @Param('manutencaoId', new ParseIntPipe()) manutencaoId,
  // ): Promise<GetManutencaoDto> {
  //   return this.manutencaoService.getById(manutencaoId);
  // }

  // @Delete('/:manutencaoId')
  // @UseFilters(new HttpExceptionFilter())
  // async remove(@Param('manutencaoId', new ParseIntPipe()) manutencaoId) {
  //   await this.manutencaoService.deleteById(manutencaoId);
  // }

  // @Put('/:manutencaoId')
  // async put(
  //   @Param('manutencaoId', new ParseIntPipe()) manutencaoId,
  //   @Body() manutencao: ManutencaoDto,
  // ): Promise<GetManutencaoDto> {
  //   return this.manutencaoService.update(manutencaoId, manutencao);
  // }
}
