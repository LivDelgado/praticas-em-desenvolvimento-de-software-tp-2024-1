import { Controller, useForm } from "react-hook-form";
import { Veiculo } from "../types/veiculo";
import { Box, Button, TextField } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

export const FormularioVeiculos = ({ veiculo, onSubmit }: { veiculo: Veiculo | undefined, onSubmit: (data: Veiculo) => void }) => {
    const { register, control, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            ...veiculo,
        }
    });

    const { ref: montadoraInputRef, ...montadoraInputProps } = register("montadora", {
        required: "A montadora do veículo é obrigatória"
    });

    const { ref: modeloInputRef, ...modeloInputProps } = register("modelo", {
        required: "O modelo do veículo é obrigatório"
    });

    const { ref: anoInputRef, ...anoInputProps } = register("ano", {
        required: "O ano do veículo é obrigatório"
    });


    const submitWrapper = (data: any) => {
        const values = getValues();
        const veiculoAtualizado: Veiculo = {
            ...data,
        };
        onSubmit(veiculoAtualizado);
    }

    return (
        <div>

            <form onSubmit={handleSubmit(submitWrapper)}>
                <Box>
                    <Row>
                        <Col>
                            <TextField id="montadora" label="Montadora" variant="outlined"
                                {...montadoraInputProps}
                                helperText={errors.montadora?.message}
                                defaultValue={veiculo?.montadora}
                                error={errors.montadora != null}
                                ref={montadoraInputRef}
                            />


                            <TextField id="modelo" label="Modelo" variant="outlined"
                                {...modeloInputProps}
                                ref={modeloInputRef}
                                helperText={errors.modelo?.message}
                                defaultValue={veiculo?.modelo}
                                error={errors.modelo != null}
                            />
                        </Col>
                        <Col>
                            <TextField id="ano" label="Ano" variant="outlined"
                                {...anoInputProps}
                                ref={anoInputRef}
                                type="number"
                                helperText={errors.ano?.message}
                                defaultValue={veiculo?.ano}
                                error={errors.ano != null}
                            />
                            <Controller
                                name="dataAquisicao"
                                control={control}
                                render={({ field, }) => (
                                    <DatePicker
                                        label="Data de aquisição"

                                        {...field}
                                        slotProps={{
                                            textField: {
                                                id: "dataAquisicaoFormatada",
                                                error: errors.dataAquisicao != null, // Bolean
                                                helperText: errors.dataAquisicao?.message,
                                                defaultValue: dayjs(veiculo?.dataAquisicao),
                                                // onChange: field.onChange,
                                                value: dayjs(field.value),
                                            },
                                        }}

                                    />
                                )}
                            />
                        </Col>
                    </Row>
                </Box>

                <Row>
                    <Col style={{ display: 'flex' }}>
                        <Button
                            type="submit"

                            sx={{ backgroundColor: '#1554F6', height: '48px', marginTop: '32px' }}
                            variant="contained"
                        >
                            Salvar
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    )
}