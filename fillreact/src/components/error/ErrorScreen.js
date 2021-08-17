import { Alert, Col, Row } from 'reactstrap';

const ErrorScreen = (props) => {

  return (
    <Row>
      <Col xs='12' style={{ justifyContent: 'center' }}>
        <Alert color='danger' style={{ textAlign: 'center' }}>
          Error! {props.error.message}
        </Alert>
      </Col>
    </Row>
  )
}

export default ErrorScreen;