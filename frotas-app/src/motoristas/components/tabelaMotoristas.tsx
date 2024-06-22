import React, { useState, useEffect } from 'react';
import { MotoristaApi } from '../api/motorista.api';
import { Motorista } from '../types/motorista';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Col, Row } from 'react-bootstrap';

function TabelaMotoristas() {
    const [motoristas, setVeiculos] = useState<Motorista[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchMotoristas();
    }, []);

    const fetchMotoristas = async () => {
        try {
            const motoristas = await MotoristaApi.getAll();
            setVeiculos(motoristas);
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
                    <CardContent  >
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            benevolent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
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