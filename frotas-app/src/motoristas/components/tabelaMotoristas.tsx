import React, { useState, useEffect } from 'react';
import { MotoristaApi } from '../api/motorista.api';
import { Motorista } from '../types/motorista';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import defaultprofile from "../../static/images/defaulphoto.png"

function TabelaMotoristas() {
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchMotoristas();
    }, []);

    const fetchMotoristas = async () => {
        try {
            const fetched = await MotoristaApi.getAll();
            setMotoristas(fetched);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (motorista: Motorista) => {
        navigate(`/motoristas/${motorista.id}`)
    };


    const handleRemove = async (motorista: Motorista) => {
        if (window.confirm("Deseja mesmo remover este motorista?")) {
            try {
                await MotoristaApi.remove(motorista.id);
                fetchMotoristas();
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (

        <Grid container
        >
            {motoristas.map((motorista) => (
                <Card sx={{ maxWidth: 326, marginRight: '32px', marginBlock: '32px', padding: '8px' }}>
                    
                    <CardContent>
                        <Box marginBottom={2}>
                            <img src={defaultprofile} width={254} height={163} alt="logo"/>
                        </Box>
                        <Typography variant="h5" component="div">
                            {motorista.nome + ' ' + motorista.sobrenome}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {motorista.email}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={() => handleRemove(motorista)} variant="outlined" sx={{
                            color: '#FE0404',
                            borderColor: '#FE0404',
                        }}>Remover</Button>

                        <Button onClick={() => handleEdit(motorista)} variant="outlined" sx={{
                            color: '#1554F6',
                            borderColor: '#1554F6',
                        }}>Editar</Button>
                    </CardActions>

                </Card>

            ))}
        </Grid>
    );
}

export default TabelaMotoristas;