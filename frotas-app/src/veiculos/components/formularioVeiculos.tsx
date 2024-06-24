import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Veiculo } from "../types/veiculo";
import { Box, Button, TextField, Grid } from "@mui/material";
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                id="montadora" 
                                label="Montadora" 
                                variant="outlined"
                                fullWidth
                                {...montadoraInputProps}
                                helperText={errors.montadora?.message}
                                defaultValue={veiculo?.montadora}
                                error={errors.montadora != null}
                                inputRef={montadoraInputRef}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                id="modelo" 
                                label="Modelo" 
                                variant="outlined"
                                fullWidth
                                {...modeloInputProps}
                                helperText={errors.modelo?.message}
                                defaultValue={veiculo?.modelo}
                                error={errors.modelo != null}
                                inputRef={modeloInputRef}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                id="ano" 
                                label="Ano" 
                                variant="outlined"
                                fullWidth
                                {...anoInputProps}
                                type="number"
                                helperText={errors.ano?.message}
                                defaultValue={veiculo?.ano}
                                error={errors.ano != null}
                                inputRef={anoInputRef}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="dataAquisicao"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        label="Data de aquisição"
                                        {...field}
                                        slotProps={{
                                            textField: {
                                                id: "dataAquisicaoFormatada",
                                                error: errors.dataAquisicao != null,
                                                helperText: errors.dataAquisicao?.message,
                                                defaultValue: dayjs(veiculo?.dataAquisicao),
                                                value: dayjs(field.value),
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={4} display="flex" justifyContent="flex-end">
                    <Button
                        type="submit"
                        sx={{ backgroundColor: '#1554F6', height: '48px' }}
                        variant="contained"
                    >
                        Salvar
                    </Button>
                </Box>
            </form>
        </div>
    );
}
