import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { GetMotoristaDto, MotoristaDto } from './motorista.dto';
import { IMotoristaService } from 'src/motorista/core/ports/inbound/IMotoristaService';

@Controller('motorista/')
@UseFilters(new HttpExceptionFilter())
export class MotoristaController {
  constructor(private motoristaService: IMotoristaService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async post(@Body() motoristaDto: MotoristaDto) {
    try {
      const created = await this.motoristaService.create(
        MotoristaDto.toDomain(motoristaDto),
      );
      return GetMotoristaDto.fromDomain(created);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }
}
