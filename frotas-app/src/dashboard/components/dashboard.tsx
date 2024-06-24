import React from 'react';
import { Box, Grid, Typography, CircularProgress, CircularProgressProps } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Helper component for displaying the circular progress with text
function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

const data = [
    { date: '1/12', disponiveis: 2, alocados: 2, manutencao: 4 },
    { date: '2/12', disponiveis: 2, alocados: 2, manutencao: 4 },
    { date: '3/12', disponiveis: 4, alocados: 2, manutencao: 2 },
    { date: '4/12', disponiveis: 6, alocados: 2, manutencao: 0 },
    { date: '5/12', disponiveis: 4, alocados: 3, manutencao: 1 },
    { date: '6/12', disponiveis: 7, alocados: 0, manutencao: 1 },
    { date: '7/12', disponiveis: 1, alocados: 4, manutencao: 3 },
    { date: '8/12', disponiveis: 2, alocados: 2, manutencao: 4 },
    { date: '9/12', disponiveis: 3, alocados: 3, manutencao: 2 },
    { date: '10/12', disponiveis: 4, alocados: 2, manutencao: 2 },
    { date: '11/12', disponiveis: 2, alocados: 2, manutencao: 4 },
    { date: '12/12', disponiveis: 2, alocados: 2, manutencao: 4 },
];

export const Dashboard = () => {
    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Box textAlign="center" p={2} border={1} borderRadius={2}>
                        <Typography variant="h6">Disponíveis</Typography>
                        <CircularProgressWithLabel value={25} color="success" />
                        <Typography variant="h4">2</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box textAlign="center" p={2} border={1} borderRadius={2}>
                        <Typography variant="h6">Em manutenção</Typography>
                        <CircularProgressWithLabel value={25} color="warning" />
                        <Typography variant="h4">2</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box textAlign="center" p={2} border={1} borderRadius={2}>
                        <Typography variant="h6">Alocados</Typography>
                        <CircularProgressWithLabel value={50} color="primary" />
                        <Typography variant="h4">4</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={4}>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="disponiveis" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="alocados" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="manutencao" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};
