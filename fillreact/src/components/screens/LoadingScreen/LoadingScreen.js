import { Col, Container, Row } from 'reactstrap';
import loadingGIF from '../../../assets/gifs/298.gif'

const LoadingScreen = () =>
  <Container>
    <Row style={{ height: '100vh', textAlign: 'center', alignItems: 'center' }}>
      <Col>
        <img src={loadingGIF} alt='Loading GIF' />
      </Col>
    </Row>
  </Container>

export default LoadingScreen;