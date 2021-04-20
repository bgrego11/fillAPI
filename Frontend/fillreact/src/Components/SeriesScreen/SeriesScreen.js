import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody,
  CardTitle, Button} from 'reactstrap';

// Components
import SeriesCard from './SeriesCard'
import NewSeriesModal from './NewSeriesModal'




const SeriesScreen = (props) => {
    const [seriesData, setSeriesData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => {
      console.log("i am working")
      setModal(!modal);
    }
      
    useEffect(() => {
        fetchSeriesData();
      }, []);
    
      const fetchSeriesData = async () => {
        let res = await fetch('https://evening-springs-63282.herokuapp.com/api/series', {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
        );
        let newData = await res.json();
        console.log(newData);
        setSeriesData(newData);
      };
    return (
      <Container className="seriesContainer">
        <Row>
            {seriesData.map((series) => {
                return <Col xs="12" sm="6"><SeriesCard  seriesData={series}/></Col>
            })
        }
        <Col xs="12" sm="6">
              <Card>
        <CardBody>
          <CardTitle tag="h3">Add New Series</CardTitle>
          <Button modalopen={modal} onClick={toggle}>Click to Add</Button>
        </CardBody>
      </Card>
      </Col>
        </Row>
        <NewSeriesModal isOpen={modal} toggle={toggle} />
      </Container>
    );
  }
  
  export default SeriesScreen;