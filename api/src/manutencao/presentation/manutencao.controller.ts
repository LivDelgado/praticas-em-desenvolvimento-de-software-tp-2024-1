import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../http-exception.filter';
import { ManutencaoService } from '../core/manutencao.service';
// import { GetManutencaoDto, ManutencaoDto } from './manutencao.dto';

@Controller('manutencoes')
@UseFilters(new HttpExceptionFilter())
export class ManutencaoController {
  constructor(private manutencaoService: ManutencaoService) {}

  // @Post()
  // async post(@Body() manutencao: ManutencaoDto): Promise<GetManutencaoDto> {
  //   return this.manutencaoService.create(manutencao);
  // }

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
