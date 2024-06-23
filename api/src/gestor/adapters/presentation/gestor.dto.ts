import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Gestor } from '../../core/gestor';

export class GestorDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do gestor',
  })
  nome: string;

  @IsString()
  @ApiProperty({
    description: 'Sobrenome do gestor',
  })
  sobrenome: string;

  @IsString()
  @ApiProperty({
    description: 'Email do gestor',
  })
  email: string;

  static toDomain(gestorDto: GestorDto): Gestor {
    const gestor = new Gestor();

    gestor.nome = gestorDto.nome;
    gestor.sobrenome = gestorDto.sobrenome;
    gestor.email = gestorDto.email;

    return gestor;
  }
}

export class GetGestorDto extends GestorDto {
  id: number;

  static fromDomain(gestor: Gestor): GetGestorDto {
    const gestorDto = new GetGestorDto();

    gestorDto.id = gestor.id;
    gestorDto.nome = gestor.nome;
    gestorDto.sobrenome = gestor.sobrenome;
    gestorDto.email = gestor.email;

    return gestorDto;
  }
}
