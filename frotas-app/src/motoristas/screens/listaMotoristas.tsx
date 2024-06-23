import VehicleTable from '../components/tabelaMotoristas';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Col, Container, Row } from 'react-bootstrap';
import TabelaMotoristas from '../components/tabelaMotoristas';



export const ListaMotoristas = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Motoristas</h1>
            <TabelaMotoristas />
            <Row>
                <Col style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button
                        sx={{ backgroundColor: '#1554F6', height: '48px', marginTop: '32px' }}
                        variant="contained"
                        onClick={() => navigate('/motoristas/novo')}
                    >
                        Adicionar motorista
                    </Button>
                </Col>
            </Row>


        </div>



    );
};