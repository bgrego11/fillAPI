import React, { useEffect, useState, Fragment } from 'react';
import { Container, Row, Col, Card, CardBody,
  CardTitle, Button, Spinner} from 'reactstrap';

// Components
import StoryCard from './StoryCard'



const StoryScreen = ({seriesID, sectionData}) => {
    const [seriesData, setSeriesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => {
      console.log("i am working")
      setModal(!modal);
    }
      
    useEffect(() => {
        fetchStoryData();
      }, [ seriesID, sectionData ]);
    
      const fetchStoryData = async () => {
        let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/series/${seriesID}`, {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
        );
        let seriesData = await res.json();
        setSeriesData(seriesData.stories);
        setLoading(false)
      };


      const handleScreen = () => {
        window.location = '/'
      }

    return (
      <Fragment className="seriesContainer">
        <Button onClick={handleScreen}>Back to Series</Button>
        { loading ?   
        <div className="spinnerCenter">
        <Spinner type="grow" style={{  width: '5rem', height: '5rem', color:"#f092a4" }} />
        </div>
        :
        <div className="seriesContainer">
        <Row>
            {seriesData && seriesData.map((story) => {
                return <Col xs="12" sm="4"><StoryCard sectionData={sectionData} cardData={story}/></Col>
            })
          }
        <Col xs="12" sm="4">
              <Card>
        <CardBody>
          <CardTitle tag="h3">Add New Story</CardTitle>
          <Button modalopen={modal} onClick={toggle}>Click to Add</Button>
        </CardBody>
      </Card>
      </Col>
        </Row>
        {/* <NewSeriesModal isOpen={modal} toggle={toggle} /> */}
        </div>
}
      </Fragment>
    );
  }
  
  export default StoryScreen;