import React from 'react';
import TabelaManutencao from '../components/tabelaManutencao';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { Button } from '@mui/material';

export const ListaManutencoes = () => {
  const { veiculoId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Manutenções programadas</h1>
      <TabelaManutencao />
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            sx={{ backgroundColor: '#1554F6', height: '48px', marginTop: '32px' }}
            variant="contained"
            onClick={() => navigate(`/veiculos/${veiculoId}/manutencao/nova`)}
          >
            Adicionar
          </Button>
        </Col>
      </Row>
    </div>
  );
};
