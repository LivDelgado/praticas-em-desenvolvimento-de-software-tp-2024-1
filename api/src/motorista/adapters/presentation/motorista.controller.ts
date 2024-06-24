import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { GetMotoristaDto, MotoristaDto } from './motorista.dto';
import { IMotoristaService } from 'src/motorista/core/ports/inbound/IMotoristaService';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('motorista/')
@ApiTags('Motoristas')
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

  @Put('/:motoristaId')
  @ApiParam({
    name: 'motoristaId',
    required: true,
    description: 'ID do motorista',
    type: Number,
  })
  async put(
    @Param('motoristaId', new ParseIntPipe()) motoristaId: number,
    @Body() motorista: MotoristaDto,
  ): Promise<GetMotoristaDto> {
    const updated = await this.motoristaService.update(
      motoristaId,
      MotoristaDto.toDomain(motorista),
    );
    return GetMotoristaDto.fromDomain(updated);
  }

  @Delete('/:motoristaId')
  @ApiParam({
    name: 'motoristaId',
    required: true,
    description: 'ID do motorista',
    type: Number,
  })
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('motoristaId', new ParseIntPipe()) motoristaId: number) {
    await this.motoristaService.deleteById(motoristaId);
  }
}
