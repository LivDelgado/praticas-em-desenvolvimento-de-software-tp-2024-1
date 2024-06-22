import React, { useState, useEffect } from 'react';
import { ManutencaoApi } from '../api/manutencao.api';
import { Manutencao } from '../types/manutencao';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';

function TabelaManutencao() {
  const { veiculoId } = useParams();
  const [manutencoes, setManutencaos] = useState<Manutencao[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchManutencoes();
  }, [veiculoId]);

  const fetchManutencoes = async () => {
    try {
      const manutencoes = await ManutencaoApi.getAll(Number(veiculoId));
      setManutencaos(manutencoes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (manutencao: Manutencao) => {
    navigate(`/veiculos/${veiculoId}/manutencao/${manutencao.id}`)
  };

  const handleRemove = async (manutencao: Manutencao) => {
    if (window.confirm("Deseja mesmo remover este registro de manutenção?")) {
      try {
        await ManutencaoApi.remove(Number(veiculoId), manutencao.id);
        fetchManutencoes();
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
              <TableCell sx={tableCellStyles}>Início da manutenção</TableCell>
              <TableCell sx={tableCellStyles} align="center">Fim da manutenção</TableCell>
              <TableCell sx={tableCellStyles} align="center">Ações</TableCell>
              {/* <TableCell align="right">Ações</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {manutencoes.map((manutencao) => (
              <StyledTableRow key={manutencao.id}>
                <TableCell component="th" scope="row">
                  {manutencao.dataInicio.toString().slice(0, 10)}
                </TableCell>
                <TableCell align='center' component="th" scope="row">
                  {manutencao.dataFim.toString().slice(0, 10)}
                </TableCell>

                <TableCell align="center">
                  <PaddingButton onClick={() => handleEdit(manutencao)} variant="outlined" sx={{
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

export default TabelaManutencao;