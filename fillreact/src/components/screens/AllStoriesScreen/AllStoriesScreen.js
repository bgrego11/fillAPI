import React, { useEffect, useState } from 'react';
import {
  Row, Col, Card, CardBody,
  CardTitle, Button, Spinner
} from 'reactstrap';

// Components
import StoryCard from '../StoryScreen/StoryCard'
import NewStoryModal from '../StoryScreen/NewStoryModal'



const AllStoriesScreen = (props) => {
  const [storiesData, setStoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newModal, setNewModal] = useState(false);

  // const seriesID = props.match.params.seriesId;

  const newModaltoggle = () => {
    setNewModal(!newModal);
  }

  useEffect(() => {
    fetchStoryData();
  }, []);

  const fetchStoryData = async () => {
    let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/story/`, {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
    );
    let rawStoriesData = await res.json();
    console.log(rawStoriesData);
    setStoriesData(rawStoriesData);
    setLoading(false)
  };


  const handleScreen = () => {
    window.location = '/'
  }

  return (
    <div className="seriesContainer">
      <Button onClick={handleScreen}>Back to Home</Button>
      {loading ?
        <div className="spinnerCenter">
          <Spinner type="grow" style={{ width: '5rem', height: '5rem', color: "#f092a4" }} />
        </div>
        :
        <div className="seriesContainer">
          <Row>
            {storiesData && storiesData.map((story, index) => {
              return <Col key={index} xs="12" sm="4">
                <StoryCard
                  // sectionData={sectionData}
                  cardData={story} /></Col>
            })
            }
            {/* <Col xs="12" sm="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Add New Story ??</CardTitle>
                  <Button onClick={newModaltoggle}>Click to Add</Button>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
          {/* <NewStoryModal isOpen={newModal} seriesID={seriesID} toggle={newModaltoggle} /> */}
        </div>
      }
    </div>
  );
}

export default AllStoriesScreen;