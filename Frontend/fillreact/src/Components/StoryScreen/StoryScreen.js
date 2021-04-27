import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody,
  CardTitle, Button} from 'reactstrap';

// Components
import StoryCard from './StoryCard'



const StoryScreen = (props) => {
    const [storyData, setStoryData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => {
      console.log("i am working")
      setModal(!modal);
    }
      
    useEffect(() => {
        fetchStoryData();
      }, []);
    
      const fetchStoryData = async () => {
        let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/series/${props.seriesID}`, {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
        );
        let storyData = await res.json();
        console.log(storyData);
        setStoryData(storyData);
      };
      console.log(storyData);
    return (
      <Container className="seriesContainer">
        {/* <Row>
            {storyData.map((series) => {
                return <Col xs="12" sm="6"><StoryCard  storyData={storyData}/></Col>
            })
        }
        <Col xs="12" sm="6">
              <Card>
        <CardBody>
          <CardTitle tag="h3">Add New Story</CardTitle>
          <Button modalopen={modal} onClick={toggle}>Click to Add</Button>
        </CardBody>
      </Card>
      </Col>
        </Row> */}
        {/* <NewSeriesModal isOpen={modal} toggle={toggle} /> */}
      </Container>
    );
  }
  
  export default StoryScreen;