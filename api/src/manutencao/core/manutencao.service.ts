import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { VeiculosDataSource } from 'src/veiculos/adapters/database/veiculo.datasource';
import { GestorDataSource } from 'src/gestor/adapters/database/gestor.datasource';
import { ManutencaoInvalidaException } from './manutencao.exceptions';
import { IManutencaoService } from './ports/inbound/IManutencaoService';
import { IManutencaoRepository } from './ports/outbound/IManutencaoRepository';
import { Manutencao } from './manutencao';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

@Injectable()
export class ManutencaoService implements IManutencaoService {
  constructor(
    private readonly manutencaoDataSource: IManutencaoRepository,
    @Inject(VeiculosDataSource)
    private readonly veiculosDataSource: VeiculosDataSource,
    @Inject(GestorDataSource)
    private readonly gestorDataSource: GestorDataSource,
  ) {}

  async create(veiculoId: number, manutencao: Manutencao): Promise<Manutencao> {
    const veiculo = await this.validateManutencao(veiculoId, manutencao);

    manutencao.veiculo = veiculo;

    try {
      await this.scheduleNotification(manutencao);
    } 
    catch (error) { console.log(error);}
    

    return this.manutencaoDataSource.save(manutencao);
  }

  async scheduleNotification(manutencao: Manutencao){

    const gestores = await this.gestorDataSource.findAll();

    const mailersend = new MailerSend({
      apiKey: process.env.API_KEY,
    });

    const sentFrom = new Sender("MS_QHUGsW@trial-jpzkmgqy16nl059v.mlsender.net", "Palantir");

    gestores.forEach(async gestor => {
      let recipients = [new Recipient(gestor.email, gestor.nome)];
      let emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Manutencao agendada")
      .setHtml("Manutencao agendada de " + manutencao.dataInicio + " a " + manutencao.dataFim + " para o veiculo " + manutencao.veiculo.id);

      const response = await mailersend.email.send(emailParams);

      console.log(response);
    });
    
  }

  async update(
    veiculoId: number,
    id: number,
    manutencao: Manutencao,
  ): Promise<Manutencao> {
    const veiculo = await this.validateManutencao(veiculoId, manutencao, id);

    manutencao.veiculo = veiculo;

    return this.manutencaoDataSource.update(id, manutencao);
  }

  async deleteById(id: number) {
    await this.manutencaoDataSource.deleteById(id);
  }

  async list(veiculoId: number): Promise<Manutencao[]> {
    return this.manutencaoDataSource.findByVeiculoId(veiculoId);
  }

  private async validateManutencao(
    veiculoId: number,
    manutencao: Manutencao,
    manutencaoId: number | undefined = undefined,
  ) {
    const veiculo = await this.veiculosDataSource.findById(veiculoId, true);
    if (!veiculo) {
      throw new ManutencaoInvalidaException(
        'Não é possível inserir uma manutenção para um veículo inexistente.',
      );
    }

    const manutencoes = veiculo?.manutencoes;
    if (manutencao.dataFim <= manutencao.dataInicio) {
      throw new ManutencaoInvalidaException('Intervalo inválido');
    }

    if (
      manutencoes.some(
        (it) =>
          it.id != manutencaoId &&
          !(
            new Date(manutencao.dataInicio) > new Date(it.dataFim) ||
            new Date(manutencao.dataFim) < new Date(it.dataInicio)
          ),
      )
    ) {
      throw new ManutencaoInvalidaException(
        'Não é possível inserir uma manutenção que conflite com uma já existente.',
      );
    }

    return veiculo;
  }
}
