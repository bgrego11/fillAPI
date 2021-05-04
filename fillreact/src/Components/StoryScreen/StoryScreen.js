import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody,
  CardTitle, Button} from 'reactstrap';

// Components
import StoryCard from './StoryCard'



const StoryScreen = ({toggleScreen, seriesID}) => {
    const [storyData, setStoryData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => {
      console.log("i am working")
      setModal(!modal);
    }
      
    useEffect(() => {
        fetchStoryData();
      }, [ seriesID ]);
    
      const fetchStoryData = async () => {
        let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/series/${seriesID}`, {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
        );
        let seriesData = await res.json();
        console.log(seriesData);
        setStoryData(seriesData.stories);
      };

      const handleScreen = () => {
        window.location = '/'
      }

    return (
      <Container className="seriesContainer">
        <Button onClick={handleScreen}>Back to Series</Button>
        <Row>
            {storyData && storyData.map((story) => {
                return <Col xs="12" sm="6"><StoryCard  cardData={story}/></Col>
            })
        }
        <Col xs="12" sm="6">
              <Card>
        <CardBody>
          <CardTitle tag="h3">Add New Section</CardTitle>
          <Button modalopen={modal} onClick={toggle}>Click to Add</Button>
        </CardBody>
      </Card>
      </Col>
        </Row>
        {/* <NewSeriesModal isOpen={modal} toggle={toggle} /> */}
      </Container>
    );
  }
  
  export default StoryScreen;