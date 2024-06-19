import { useForm } from "react-hook-form";
import { Veiculo } from "../types/veiculo";

export const FormularioVeiculos = ({veiculo, onSubmit}: {veiculo: Veiculo | undefined, onSubmit: (data: Veiculo) => void}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: veiculo
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="montadora">Montadora</label>
                <input id="montadora" {...register('montadora', { required: true })} />
                {errors.montadora && <span>Preenchimento obrigatório</span>}

                <label htmlFor="modelo">Modelo</label>
                <input id="modelo" {...register('modelo', { required: true })} />
                {errors.modelo && <span>Preenchimento obrigatório</span>}

                <label htmlFor="ano">Ano</label>
                <input id="ano" {...register('ano', { required: true })} />
                {errors.ano && <span>Preenchimento obrigatório</span>}

                <label htmlFor="dataAquisicao">Data de aquisição</label>
                <input id="dataAquisicao" type="date" {...register('dataAquisicao', { required: true })} />
                {errors.dataAquisicao && <span>Preenchimento obrigatório</span>}

                {/* <label htmlFor="motorista">Motorista</label>
<input id="motorista" {...register('motorista', { required: true })} />
{errors.motorista && <span>Preenchimento obrigatório</span>} */}

                {/* <label htmlFor="proximaManutencao">Próxima manutenção</label>
<input id="proximaManutencao" type="date" {...register('proximaManutencao', { required: true })} />
{errors.proximaManutencao && <span>Preenchimento obrigatório</span>} */}

                <input type="submit" value="Create" />
            </form>
        </div>
    )
}