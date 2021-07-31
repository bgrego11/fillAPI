


// const SeriesStoriesScreen = (props) => {

//   console.log("PROPS HERE:");
//   console.log(props);
//   return (
//     <div>
//       Series Stories for series {props.match.params.seriesId}
//     </div>
//   )
// }

// export default SeriesStoriesScreen;


import React, { useEffect, useState } from 'react';
import {
  Row, Col, Card, CardBody,
  CardTitle, Button, Spinner
} from 'reactstrap';

// Components
import StoryCard from '../StoryScreen/StoryCard'
import NewStoryModal from '../StoryScreen/NewStoryModal'
import PLUS_ADD_FEATHER_SVG from '../../../assets/PLUS_ADD_FEATHER_SVG';
import ARROW_LEFT_FEATHER_SVG from '../../../assets/ARROW_LEFT_FEATHER_SVG';
import { Link } from 'react-router-dom';



const SeriesStoriesScreen = (props) => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newModal, setNewModal] = useState(false);

  const seriesID = props.match.params.seriesId;

  const newModaltoggle = () => {
    setNewModal(!newModal);
  }

  useEffect(() => {
    fetchStoryData();
  }, [seriesID]);

  const fetchStoryData = async () => {
    let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/series/${seriesID}`, {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
    );
    let seriesData = await res.json();
    setSeriesData(seriesData.stories);
    setLoading(false)
  };


  const handleScreen = () => {
    window.location = '/serieslist'
  }

  return (
    <div className="seriesContainer">
      <Button onClick={handleScreen}>Back to Series</Button>
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
                    small outline className="the-fill-app-button" > <ARROW_LEFT_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />Back to Series
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
            {seriesData && seriesData.map((story, index) => {
              return <Col key={index} xs="12" sm="4">
                <StoryCard
                  // sectionData={sectionData}
                  cardData={story} /></Col>
            })
            }
            <Col xs="12" sm="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Add New Story</CardTitle>
                  <Button onClick={newModaltoggle}>Click to Add</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <NewStoryModal isOpen={newModal} seriesID={seriesID} toggle={newModaltoggle} />
        </div>
      }
    </div>
  );
}

export default SeriesStoriesScreen;