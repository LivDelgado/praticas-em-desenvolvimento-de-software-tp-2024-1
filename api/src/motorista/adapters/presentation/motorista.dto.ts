import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Motorista } from 'src/motorista/core/motorista';

export class MotoristaDto {
  @IsString()
  @ApiProperty({
    description: 'Email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Nome',
  })
  nome: string;

  @IsString()
  @ApiProperty({
    description: 'Sobrenome',
  })
  sobrenome: string;

  @IsString()
  @ApiProperty({
    description: 'Imagem em Base64',
  })
  imagemAvatar: string;

  static toDomain(motorista: MotoristaDto): Motorista {
    const domain = new Motorista();
    domain.email = motorista.email;
    domain.nome = motorista.nome;
    domain.sobrenome = motorista.sobrenome;
    domain.imagemAvatar = motorista.imagemAvatar;

    return domain;
  }
}

export class GetMotoristaDto extends MotoristaDto {
  id: number;
  nomeVeiculo: string;

  static fromDomain(motorista: Motorista): GetMotoristaDto {
    const motoristaDto = new GetMotoristaDto();

    motoristaDto.id = motorista.id;
    motoristaDto.email = motorista.email;
    motoristaDto.nome = motorista.nome;
    motoristaDto.sobrenome = motorista.sobrenome;
    motoristaDto.imagemAvatar = motorista.imagemAvatar;
    motoristaDto.nomeVeiculo = motorista.getNomeVeiculo();

    return motoristaDto;
  }
}
