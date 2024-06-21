import { useForm } from "react-hook-form";
import { Manutencao } from "../types/manutencao";

export const FormularioManutencao = ({ manutencao, onSubmit }: { manutencao: Manutencao | undefined, onSubmit: (data: Manutencao) => void }) => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            ...manutencao,
            dataInicioFormatada: manutencao?.dataInicio?.toISOString().substring(0, 10),
            dataFimFormatada: manutencao?.dataFim?.toISOString().substring(0, 10)
        }
    });

    const submitWrapper = (data: any) => {
        const values = getValues();
        const manutencaoAtualizado: Manutencao = {
            ...data,
            dataInicio: new Date(values.dataInicioFormatada?.toString() ?? ""),
            dataFim: new Date(values.dataFimFormatada?.toString() ?? ""),
        };
        onSubmit(manutencaoAtualizado);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitWrapper)}>

                <label htmlFor="dataInicioFormatada">Início da manutenção</label>
                <input id="dataInicioFormatada" type="date" {...register('dataInicioFormatada', { required: { value: true, message: 'A data de aquisição é obrigatória' }, valueAsDate: true })} />
                <br />
                {errors.dataInicioFormatada && <span>{errors.dataInicioFormatada.message}</span>}

                <label htmlFor="dataFimFormatada">Fim da manutenção</label>
                <input id="dataFimFormatada" type="date" {...register('dataFimFormatada', { required: { value: true, message: 'A data de aquisição é obrigatória' }, valueAsDate: true })} />
                <br />
                {errors.dataFimFormatada && <span>{errors.dataFimFormatada.message}</span>}

                <input type="submit" value="Salvar" />
            </form>
        </div>
    )
}