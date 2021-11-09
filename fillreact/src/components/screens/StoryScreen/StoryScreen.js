import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import '../../../App.scss';

import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ErrorScreen from '../../error/ErrorScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ARROW_LEFT_FEATHER_SVG from '../../../assets/svg/ARROW_LEFT_FEATHER_SVG';

// const StoryScreen = ({ cardData, toggleScreen, sectionData }) => {
const StoryScreen = (props) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [sectionData, setSectionData] = useState();

  const cardData = props.location.state;
  console.log(cardData)

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  }


  const fetchSectionData = async () => {
    try {
      let res = await fetch(`https://thefill.herokuapp.com/api/section`, {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      );
      let data = await res.json();
      setSectionData(data);
      setIsLoaded(true);
    }
    catch (error) {
      setErr(error);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchSectionData();
  }, []);

  if (err) {
    return <ErrorScreen error={err} />
  }
  else if (!isLoaded) {
    return <LoadingScreen />
  }
  else {
    return (
      <div style={{ justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          style={{
            display: 'inline-flex', alignItems: 'center'
          }}
          tag={Link} to={cardData && `seriesstories/${cardData.series_id}`}
          small outline className="the-fill-app-button" > <ARROW_LEFT_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />Back to Series List
        </Button>
        <div></div>
        </div>
        <Row >
          <Col xs='12' sm='6'>
            <img width="100%" src={cardData.artwork} alt="Card cap" />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{ color: 'rgb(162,81,87)' }}>
                {cardData && cardData.title}
              </div>
            </div>

            <div><p>{cardData.description}</p></div>
          </Col>
          <Col xs='12' sm='6'>
            <div className="story-screen-right-container">
                {
                sectionData && sectionData.map((section, index) => {
                  console.log(section)
                  if (section.story_id === cardData.id) {
                    return (
                      <div key={index}>
                        <h3>{section.title}</h3>
                        <h4>{section.sub_title}</h4>
                        <p>{section.text}</p>
                      </div>
                    )
                  }
                })
              }
        </div>
        <ReactPlayer width='100%' height="60px" controls='true' url={cardData.url} />
          </Col>
        </Row>
      </div >
    );
  }
};

export default StoryScreen;