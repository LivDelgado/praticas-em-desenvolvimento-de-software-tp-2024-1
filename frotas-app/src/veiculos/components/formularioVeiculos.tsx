import { useForm } from "react-hook-form";
import { Veiculo } from "../types/veiculo";

export const FormularioVeiculos = ({ veiculo, onSubmit }: { veiculo: Veiculo | undefined, onSubmit: (data: Veiculo) => void }) => {
    const { register, handleSubmit, formState: {errors}, getValues } = useForm({
        defaultValues: {
            ...veiculo,
            dataAquisicaoFormatada: veiculo?.dataAquisicao?.toISOString().substring(0, 10)
        }
    });

    const submitWrapper = (data: any) => {
        const values = getValues();
        const veiculoAtualizado: Veiculo = {
            ...data,
            dataAquisicao: new Date(values.dataAquisicaoFormatada?.toString() ?? "")
        };
        onSubmit(veiculoAtualizado);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitWrapper)}>

                <label htmlFor="montadora">Montadora</label>
                <input id="montadora" {...register('montadora', { required: { value: true, message: 'A montadora do veículo é obrigatória' } })} />
                <br />
                {errors.montadora && <span>{errors.montadora.message}</span>} 

                <label htmlFor="modelo">Modelo</label>
                <input id="modelo" {...register('modelo', { required: { value: true, message: 'O modelo do veículo é obrigatório' } })} />
                <br />
                {errors.modelo && <span>{errors.modelo.message}</span>} 

                <label htmlFor="ano">Ano</label>
                <input id="ano" {...register('ano', { required: { value: true, message: 'O ano do veículo é obrigatório' } })} />
                <br />
                {errors.ano && <span>{errors.ano.message}</span>} 

                <label htmlFor="dataAquisicaoFormatada">Data de aquisição</label>
                <input id="dataAquisicaoFormatada" type="date" {...register('dataAquisicaoFormatada', { required: { value: true, message: 'A data de aquisição é obrigatória' }, valueAsDate: true })} />
                <br />
                {errors.dataAquisicaoFormatada && <span>{errors.dataAquisicaoFormatada.message}</span>} 

                {/* <label htmlFor="motorista">Motorista</label>
<input id="motorista" {...register('motorista', { required: true })} />
{errors.motorista && <span>Preenchimento obrigatório</span>} */}

                {/* <label htmlFor="proximaManutencao">Próxima manutenção</label>
<input id="proximaManutencao" type="date" {...register('proximaManutencao', { required: true })} />
{errors.proximaManutencao && <span>Preenchimento obrigatório</span>} */}

                <input type="submit" value="Salvar" />
            </form>
        </div>
    )
}