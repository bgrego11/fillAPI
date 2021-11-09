/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Button, ListGroup, ListGroupItem, Container
} from 'reactstrap';

// Components
import ARROW_LEFT_FEATHER_SVG from '../../../assets/svg/ARROW_LEFT_FEATHER_SVG';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ErrorScreen from '../../error/ErrorScreen';



const SeriesStoriesScreen = (props) => {

  const [storiesData, setStoriesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(null);

  // We need to filter sotries by their respective paramter 
  // In order to do this we will take a key from the tag and update our array
  const filterStories = (sortParams) => {
    const matchingStoryTags = []
    const sortFake = ['love', "inspirational", "monotheism"]
    const newStoryArray = []

    storiesData.map((story) => {
      story.st_tags.map((filterTag) => {
        sortFake.map((filterName) => {
          if (filterTag.tag === filterName) {
            if (matchingStoryTags.indexOf(filterTag.story_id)) {
              matchingStoryTags.push(filterTag.story_id)
            }
          }
        })
      })
    })
    console.log(matchingStoryTags)
    storiesData.map((getIT) => {
      matchingStoryTags.map((story) => {
        if (story === getIT.id) {
          newStoryArray.push(getIT)
        }
      })
    })

    console.log(newStoryArray)
    setStoriesData(newStoryArray)

  }

  const fetchStoryData = async () => {
    try {
      let res = await fetch(`https://thefill.herokuapp.com/api/story/`, {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      );
      let rawStoriesData = await res.json();
      console.log(rawStoriesData)
      setStoriesData(rawStoriesData);
      setIsLoaded(true);
    }
    catch (error) {
      setErr(error);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchStoryData();
  }, []);

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
                  tag={Link} to="/"
                  small outline className="the-fill-app-button" > <ARROW_LEFT_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />Home
                </Button>
                <Button onClick={filterStories}>Filter</Button>
              </div>
              {/* <div style={{ display: 'flex' }}> */}
              {/* <div> */}
              {/* <Button
                    style={{
                      display: 'inline-flex', alignItems: 'center'
                    }}
                    small outline className="the-fill-app-button"
                    onClick={newModaltoggle}
                  > <PLUS_ADD_FEATHER_SVG
                      size='20' color='rgb(250, 146, 164)' />Add New Story
                  </Button> */}
              {/* <NewStoryModal isOpen={newModal} toggle={newModaltoggle} /> */}
              {/* </div> */}
            </div>
          </Col>
        </Row>
        {/* <Row>
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
          </Row> */}
        <Row>
          <Container>
            <ListGroup>
              {storiesData && storiesData.map((story, index) => {
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
        {/* <NewStoryModal isOpen={newModal} seriesID={seriesID} toggle={newModaltoggle} /> */}
      </div>
    );
  }
}

export default SeriesStoriesScreen;