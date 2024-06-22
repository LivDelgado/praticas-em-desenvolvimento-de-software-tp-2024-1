import React, { useState, useEffect } from 'react';
import { VeiculoApi } from '../api/veiculo.api';
import { Veiculo } from '../types/veiculo';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';

function TabelaVeiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const veiculos = await VeiculoApi.getAll();
      setVeiculos(veiculos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (veiculo: Veiculo) => {
    navigate(`/veiculos/${veiculo.id}`)
  };

  const handleManutencao = (veiculo: Veiculo) => {
    navigate(`/veiculos/${veiculo.id}/manutencao`)
  };

  const handleRemove = async (veiculo: Veiculo) => {
    if (window.confirm("Deseja mesmo remover este veículo?")) {
      try {
        await VeiculoApi.remove(veiculo.id);
        fetchVeiculos();
      } catch (error) {
        console.error(error);
      }
    }
  };


  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const tableCellStyles = {
    backgroundColor: '#f5f5f5',
    color: '#a4a4a4',
  };


  const PaddingButton = styled(Button)(({ theme }) => ({
    marginRight: '8px'
  }));


  return (

    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyles}>Nome</TableCell>
              <TableCell sx={tableCellStyles} align="center">Data de aquisição</TableCell>
              <TableCell sx={tableCellStyles} align="center">Próxima manutenção</TableCell>
              <TableCell sx={tableCellStyles} align="center"></TableCell>
              {/* <TableCell align="right">Ações</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {veiculos.map((veiculo) => (
              <StyledTableRow key={veiculo.id}>
                <TableCell component="th" scope="row">
                  {veiculo.montadora + veiculo.modelo}
                </TableCell>
                <TableCell align="center">{new Date(veiculo.dataAquisicao).toISOString().slice(0, 10)}</TableCell>
                <TableCell align="center">{veiculo.nextManutencaoDate ? new Date(veiculo.nextManutencaoDate).toISOString().slice(0, 10) : null}</TableCell>
                <TableCell align="right">
                  <PaddingButton onClick={() => handleManutencao(veiculo)} variant="outlined" sx={{
                    color: '#FFCD00',
                    borderColor: '#FFCD00',
                    padding: 'right: 8'
                  }}>Manutenção</PaddingButton>

                  <PaddingButton onClick={() => handleRemove(veiculo)} variant="outlined" sx={{
                    color: '#FE0404',
                    borderColor: '#FE0404',
                  }}>Remover</PaddingButton>
                  <PaddingButton onClick={() => handleEdit(veiculo)} variant="outlined" sx={{
                    color: '#1554F6',
                    borderColor: '#1554F6',
                  }}>Editar</PaddingButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TabelaVeiculos;