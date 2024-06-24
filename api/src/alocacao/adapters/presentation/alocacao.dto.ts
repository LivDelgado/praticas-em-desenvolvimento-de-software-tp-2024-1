import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AlocacaoDto {
  @IsNumber()
  @ApiProperty({
    description: 'Id do motorista',
  })
  motoristaId: number;
}
