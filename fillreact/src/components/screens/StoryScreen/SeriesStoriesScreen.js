




import React, { useEffect, useState, useParams } from 'react';
import {
  Row, Col, Card, CardBody,
  CardTitle, Button, Spinner, ListGroup, ListGroupItem, Container
} from 'reactstrap';

// Components
import StoryCard from './StoryCard'
import NewStoryModal from './NewStoryModal'
import PLUS_ADD_FEATHER_SVG from '../../../assets/svg/PLUS_ADD_FEATHER_SVG';
import ARROW_LEFT_FEATHER_SVG from '../../../assets/svg/ARROW_LEFT_FEATHER_SVG';
import { Link } from 'react-router-dom';



const SeriesStoriesScreen = (props) => {
  const [seriesStories, setSeriesStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newModal, setNewModal] = useState(false);

  const seriesID = props.match.params.seriesID;
  const seriesData = props.location.state;

  console.log("THE STATE IS:  ");
  console.log(seriesData);

  // const { seriesID } = useParams();

  const newModaltoggle = () => {
    setNewModal(!newModal);
  }

  useEffect(() => {
    fetchStoryData();
  }, []);

  const fetchStoryData = async () => {
    let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/series/${seriesID}`, {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
    );
    let seriesData = await res.json();
    setSeriesStories(seriesData.stories);
    // console.log("STORIES");
    // console.log(seriesData.stories);
    setLoading(false)
  };


  // const handleScreen = () => {
  //   window.location = '/serieslist'
  // }

  return (
    <div className="seriesContainer">
      {/* <Button onClick={handleScreen}>Back to Series</Button> */}
      {loading ?
        <div className="spinnerCenter">
          <Spinner type="grow" style={{ width: '5rem', height: '5rem', color: "#f092a4" }} />
        </div>
        :
        <div className="seriesContainer">
          <Row>
            <Col>
              {/* <div style={{ display: 'flex' }}> */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Button
                    style={{
                      display: 'inline-flex', alignItems: 'center'
                    }}
                    tag={Link} to="/serieslist"
                    small outline className="the-fill-app-button" > <ARROW_LEFT_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />Back to all series
                  </Button>
                </div>
                {/* <div style={{ display: 'flex' }}> */}
                <div>
                  <Button
                    style={{
                      display: 'inline-flex', alignItems: 'center'
                    }}
                    small outline className="the-fill-app-button"
                    onClick={newModaltoggle}
                  > <PLUS_ADD_FEATHER_SVG
                      size='20' color='rgb(250, 146, 164)' />Add New Story
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <img width="100%" src={seriesData.img} alt={seriesData.title} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ paddingTop: '2rem' }}>
                <p>{seriesData.description}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <span style={{ color: 'rgb(240, 146, 164)' }}>
                <h3>Series Content:</h3>
              </span>
            </Col>
          </Row>
          <Row>
            <Container>
              <ListGroup>
                {seriesStories && seriesStories.map((story, index) => {
                  return (
                    <ListGroupItem key={index} tag={Link} to={{
                      pathname: '/singlestory',
                      state: story,
                    }}>
                      <img width='30rem' height='30rem' src={story.artwork} alt={story.title} />
                      <Button small='true' outline className="the-fill-app-button">
                        {story.title}
                      </Button>
                    </ListGroupItem>
                    // <Col key={index} xs="12" sm="4">
                    //   <StoryCard
                    //     // sectionData={sectionData}
                    //     cardData={story} />
                    // </Col>
                  )
                })
                }
              </ListGroup>
            </Container>
            {/* <Col xs="12" sm="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Add New Story</CardTitle>
                  <Button onClick={newModaltoggle}>Click to Add</Button>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
          <NewStoryModal isOpen={newModal} seriesID={seriesID} toggle={newModaltoggle} />
        </div>
      }
    </div>
  );
}

export default SeriesStoriesScreen;