




import React, { useEffect, useState } from 'react';
import {
  Row, Col, Button, ListGroup, ListGroupItem, Container
} from 'reactstrap';

// Components
import NewStoryModal from './NewStoryModal'
import PLUS_ADD_FEATHER_SVG from '../../../assets/svg/PLUS_ADD_FEATHER_SVG';
import ARROW_LEFT_FEATHER_SVG from '../../../assets/svg/ARROW_LEFT_FEATHER_SVG';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ErrorScreen from '../../error/ErrorScreen';


const SeriesStoriesScreen = (props) => {
  const [seriesStories, setSeriesStories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [newModal, setNewModal] = useState(false);

  const seriesID = props.match.params.seriesID;
  const seriesData = props.location.state;
  // const { seriesID } = useParams();

  const newModaltoggle = () => {
    setNewModal(!newModal);
  }

  useEffect(() => {
    fetchStoryData();
  }, []);

  const fetchStoryData = async () => {
    try {
      let res = await fetch(`https://thefill.herokuapp.com/api/series/${seriesID}`, {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      }
      );
      let seriesData = await res.json();
      setSeriesStories(seriesData.stories);
      setIsLoaded(true);
    }
    catch (error) {
      setErr(error);
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
                    <Button small outline className="the-fill-app-button">
                      {story.title}
                    </Button>
                  </ListGroupItem>
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
    );
  }
}

export default SeriesStoriesScreen;