import { Controller, useForm } from "react-hook-form";
import { Manutencao } from "../types/manutencao";
import { Col, Row } from "react-bootstrap";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const FormularioManutencao = ({ manutencao, onSubmit }: { manutencao: Manutencao | undefined, onSubmit: (data: Manutencao) => void }) => {
    const { control, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            ...manutencao,
        }
    });

    const submitWrapper = (data: any) => {
        const values = getValues();
        const manutencaoAtualizado: Manutencao = {
            ...data,
        };
        onSubmit(manutencaoAtualizado);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitWrapper)}>


                <Row>
                    <Col>

                        <Controller
                            name="dataInicio"
                            control={control}
                            render={({ field, }) => (
                                <DatePicker
                                    label="Início da manutenção"

                                    {...field}
                                    slotProps={{
                                        textField: {
                                            id: "dataInicio",
                                            error: errors.dataInicio != null, // Bolean
                                            helperText: errors.dataInicio?.message,
                                            defaultValue: dayjs(manutencao?.dataInicio),
                                            // onChange: field.onChange,
                                            value: dayjs(field.value),
                                        },
                                    }}

                                />
                            )}
                        />
                        <Controller
                            name="dataFim"
                            control={control}
                            render={({ field, }) => (
                                <DatePicker
                                    label="Fim da manutenção"

                                    {...field}
                                    slotProps={{
                                        textField: {
                                            id: "dataFim",
                                            error: errors.dataFim != null, // Bolean
                                            helperText: errors.dataFim?.message,
                                            defaultValue: dayjs(manutencao?.dataFim),
                                            // onChange: field.onChange,
                                            value: dayjs(field.value),
                                        },
                                    }}

                                />
                            )}
                        />
                    </Col>
                </Row>
                {/* 
                <label htmlFor="dataInicioFormatada">Início da manutenção</label>
                <input id="dataInicioFormatada" type="date" {...register('dataInicioFormatada', { required: { value: true, message: 'A data de aquisição é obrigatória' }, valueAsDate: true })} />
                <br />
                {errors.dataInicioFormatada && <span>{errors.dataInicioFormatada.message}</span>}

                <label htmlFor="dataFimFormatada">Fim da manutenção</label>
                <input id="dataFimFormatada" type="date" {...register('dataFimFormatada', { required: { value: true, message: 'A data de aquisição é obrigatória' }, valueAsDate: true })} />
                <br />
                {errors.dataFimFormatada && <span>{errors.dataFimFormatada.message}</span>} */}

                <input type="submit" value="Salvar" />
            </form>
        </div>
    )
}