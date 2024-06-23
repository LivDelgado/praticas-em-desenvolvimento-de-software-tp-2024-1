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
import { GetVeiculoDto, VeiculoDto } from './veiculo.dto';
import { IVeiculoService } from 'src/veiculos/core/ports/inbound/IVeiculoService';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('veiculos')
@ApiTags('Veiculos')
@UseFilters(new HttpExceptionFilter())
export class VeiculoController {
  constructor(private veiculoService: IVeiculoService) {}

  @Put('/:veiculoId')
  @ApiParam({
    name: 'veiculoId',
    required: true,
    description: 'ID do veículo',
    type: Number,
  })
  async put(
    @Param('veiculoId', new ParseIntPipe()) veiculoId: number,
    @Body() veiculo: VeiculoDto,
  ): Promise<GetVeiculoDto> {
    const updated = await this.veiculoService.update(
      veiculoId,
      VeiculoDto.toDomain(veiculo),
    );
    return GetVeiculoDto.fromDomain(updated);
  }

  @Get('/:veiculoId')
  @ApiParam({
    name: 'veiculoId',
    required: true,
    description: 'ID do veículo',
    type: Number,
  })
  @UseFilters(new HttpExceptionFilter())
  async get(
    @Param('veiculoId', new ParseIntPipe()) veiculoId: number,
  ): Promise<GetVeiculoDto> {
    const veiculo = await this.veiculoService.getById(veiculoId);
    return GetVeiculoDto.fromDomain(veiculo);
  }

  @Delete('/:veiculoId')
  @ApiParam({
    name: 'veiculoId',
    required: true,
    description: 'ID do veículo',
    type: Number,
  })
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('veiculoId', new ParseIntPipe()) veiculoId: number) {
    await this.veiculoService.deleteById(veiculoId);
  }

  @Post()
  async post(@Body() veiculo: VeiculoDto): Promise<GetVeiculoDto> {
    const created = await this.veiculoService.create(
      VeiculoDto.toDomain(veiculo),
    );
    return GetVeiculoDto.fromDomain(created);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async list(): Promise<GetVeiculoDto[]> {
    const veiculos = await this.veiculoService.list();
    return veiculos.map((it) => GetVeiculoDto.fromDomain(it));
  }
}
