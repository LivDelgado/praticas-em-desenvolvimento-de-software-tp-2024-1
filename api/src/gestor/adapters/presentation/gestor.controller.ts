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
import { HttpExceptionFilter } from '../../../http-exception.filter';
import { GetGestorDto, GestorDto } from './gestor.dto';
import { IGestorService } from '../../core/ports/inbound/IGestorService';

@Controller('gestors')
@UseFilters(new HttpExceptionFilter())
export class GestorController {
  constructor(private gestorService: IGestorService) {}

  @Put('/:gestorId')
  async put(
    @Param('gestorId', new ParseIntPipe()) gestorId,
    @Body() gestor: GestorDto,
  ): Promise<GetGestorDto> {
    const updated = await this.gestorService.update(
      gestorId,
      GestorDto.toDomain(gestor),
    );
    return GetGestorDto.fromDomain(updated);
  }

  @Get('/:gestorId')
  @UseFilters(new HttpExceptionFilter())
  async get(
    @Param('gestorId', new ParseIntPipe()) gestorId,
  ): Promise<GetGestorDto> {
    const gestor = await this.gestorService.getById(gestorId);
    return GetGestorDto.fromDomain(gestor);
  }

  @Delete('/:gestorId')
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('gestorId', new ParseIntPipe()) gestorId) {
    await this.gestorService.deleteById(gestorId);
  }

  @Post()
  async post(@Body() gestor: GestorDto): Promise<GetGestorDto> {
    const created = await this.gestorService.create(GestorDto.toDomain(gestor));
    return GetGestorDto.fromDomain(created);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async list(): Promise<GetGestorDto[]> {
    const gestors = await this.gestorService.list();
    return gestors.map((it) => GetGestorDto.fromDomain(it));
  }
}
