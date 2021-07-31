import React, { useEffect, useState, Fragment } from 'react';
import {
  Row, Col, Card, CardBody,
  CardTitle, Button, Spinner
} from 'reactstrap';

// Components
import SeriesCard from './SeriesCard'
import NewSeriesModal from './NewSeriesModal'
import { Link } from 'react-router-dom';
import GOTO_FEATHER_SVG from '../../../assets/GOTO_FEATHER_SVG';
import ARROW_LEFT_FEATHER_SVG from '../../../assets/ARROW_LEFT_FEATHER_SVG';
import PLUS_ADD_FEATHER_SVG from '../../../assets/PLUS_ADD_FEATHER_SVG';




const SeriesScreen = ({ toggleScreen }) => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    console.log("i am working")
    setModal(!modal);
  }

  useEffect(() => {
    fetchSeriesData();
  }, []);

  const fetchSeriesData = async () => {
    try {
      let res = await fetch('https://evening-springs-63282.herokuapp.com/api/series', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      }
      );
      let newData = await res.json();
      setSeriesData(newData);
      setLoading(false)
    } catch {
      setLoading(false)
    }
  };
  return (
    <Fragment>
      {loading ?
        <div className="spinnerCenter">
          <Spinner type="grow" style={{ width: '5rem', height: '5rem', color: "#f092a4" }} />
        </div>
        :
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
                    tag={Link} to="/"
                    small outline className="the-fill-app-button" > <ARROW_LEFT_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />Home
                  </Button>
                </div>
                {/* <div style={{ display: 'flex' }}> */}
                <div>
                  <Button
                    style={{
                      display: 'inline-flex', alignItems: 'center'
                    }}
                    small outline className="the-fill-app-button"
                    modalopen={modal} onClick={toggle}
                  > <PLUS_ADD_FEATHER_SVG
                      size='20' color='rgb(250, 146, 164)' />Add New Series
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {seriesData.map((series, index) => {
              return <Col key={index} xs="12" sm="6"><SeriesCard toggleScreen={toggleScreen} seriesData={series} /></Col>
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
          <NewSeriesModal isOpen={modal} toggle={toggle} />
        </div>
      }
    </Fragment>
  );
}

export default SeriesScreen;