import VehicleTable from '../components/tabelaVeiculos';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Col, Container, Row } from 'react-bootstrap';



export const ListaVeiculos = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Veículos</h1>
      <VehicleTable />
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            sx={{ backgroundColor: '#1554F6', height: '48px', marginTop: '32px' }}
            variant="contained"
            onClick={() => navigate('/veiculos/novo')}
          >
            Adicionar
          </Button>
        </Col>
      </Row>


    </div>



  );
};