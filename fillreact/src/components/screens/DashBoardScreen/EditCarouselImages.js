import React, { useEffect, useState, Fragment } from 'react';
import { Row, Col, Button, Card, CardImg, CardBody, CardTitle  } from 'reactstrap';

// Components
import EditCarouselsModal from './EditCarouselModal';

import { Link } from 'react-router-dom';
// import GOTO_FEATHER_SVG from '../../../assets/svg/GOTO_FEATHER_SVG';
import ARROW_LEFT_FEATHER_SVG from '../../../assets/svg/ARROW_LEFT_FEATHER_SVG';
import PLUS_ADD_FEATHER_SVG from '../../../assets/svg/PLUS_ADD_FEATHER_SVG';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ErrorScreen from '../../error/ErrorScreen';


const EditCarouselImages = (props) => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const fetchCarouselData = async () => {
    try {
      let res = await fetch('/api/carousel', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      }
      );
      let newData = await res.json();
      setCarouselData(newData);
      setIsLoaded(true)
    } catch (err) {
      setErr(err);
      setIsLoaded(true);
    }
  };


  if (err) {
    return <ErrorScreen error={err} />
}
  else if (!isLoaded) {
    return <LoadingScreen />
  }
  else {
    return (
      <Fragment>
        {/* {!isLoaded ? */}
        {/* <LoadingScreen /> */}
        {/* : */}
        <div>
          <Row>
            <Col>
              {/* <div style={{ display: 'flex' }}> */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Button
                    style={{
                      display: 'inline-flex', alignItems: 'center'
                    }}
                    tag={Link} to="/editdashboard"
                    small outline className="the-fill-app-button" > <ARROW_LEFT_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />Dashboard
                  </Button>
                  </div>
                {/* <div style={{ display: 'flex' }}> */}
              </div>
            </Col>
          </Row>
          <Row>
            {carouselData.map((carousel, index) => {
              console.log(carousel)
              return (
                <Fragment>
                  <Col xs={12} sm={4} lg={4}>
                <Card style={{ borderColor: 'rgba(250, 146, 164, .2)', margin: 10 }}>
                <CardTitle tag="h3">Desktop Image Slide</CardTitle>
                <CardImg top width="100%" src={carousel.dt_url} alt="Card image cap" />
                <CardTitle tag="h3">Mobile Image Slide</CardTitle>
                <CardImg top width="100%" src={carousel.mb_url} alt="Card image cap" />
                <CardBody>
                  <EditCarouselsModal id={carousel.id} desktopURL={carousel.dt_url} mobileURL={carousel.mb_url} />
                </CardBody>
              </Card>
              </Col>
              </Fragment>
              )
            })
            }
            {/* <Col xs="12" sm="6">
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Add New Series</CardTitle>
                  <Button modalopen={modal} onClick={toggle}>Click to Add</Button>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default EditCarouselImages;