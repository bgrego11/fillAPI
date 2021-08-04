import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button, Row, Col
} from 'reactstrap';
import DELETE_TRASH_FEATHER_SVG from '../../../assets/svg/DELETE_TRASH_FEATHER_SVG';
import EDIT_FEATHER_SVG from '../../../assets/svg/EDIT_FEATHER_SVG';
import EditStoryModal from './EditStoryModal'

// const StoryScreen = ({ cardData, toggleScreen, sectionData }) => {
const StoryScreen = (props) => {

  const [sectionData, setSectionData] = useState();

  const cardData = props.location.state;

  // console.log("IN THE NEW STORYSCREEN: ");
  // console.log(cardData);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    // console.log("i am working")
    setModal(!modal);
  }

  const handleDelete = (event) => {

    event.preventDefault();
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`https://evening-springs-63282.herokuapp.com/api/story/${cardData.id}`, requestOptions)
      .then(async response => {
        const data = await response.json();
        // console.log("STORY INFO")
        // console.log(data);
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

      })
      .catch(error => {

        console.error('There was an error!', error);

      });
  };

  const fetchSectionData = async () => {
    let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/section`, {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
    );
    let data = await res.json();
    // console.log(sectionData);
    console.log("SECTION DATA")
    console.log(data);
    setSectionData(data);
  };

  useEffect(() => {
    fetchSectionData();
  }, []);


  return (
    // <div className="space-bottom">
    <div style={{ justifyContent: 'center' }}>
      <Row >


        <Col xs='12' sm='6'>
          <img width="100%" src={cardData.artwork} alt="Card image cap" />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{ color: 'rgb(162,81,87)' }}>
              {cardData && cardData.title}
            </div>
            <div style={{ display: 'flex', verticalAlign: 'top' }}>
              <div isOpen={modal} onClick={toggle}>
                <EDIT_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
              </div>
              <div>
                <DELETE_TRASH_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
              </div>
            </div>
          </div>

          <div><p>{cardData.description}</p></div>

          {/* <ReactPlayer width='100%' height='100%' controls='true' url={cardData.url} /> */}
        </Col>
        <Col xs='12' sm='6'>
          <ReactPlayer width='100%' height='100%' controls='true' url={cardData.url} />

        </Col>
      </Row>
      {/* <Row style={{ height: '70px' }}>
        <Col xs='12' sm='6'>
          <ReactPlayer width='100%' height='100%' light={cardData.artwork} controls='true' url={cardData.url} />
        </Col>
      </Row> */}
      {/* <Row style={{ height: '100px' }}>
        <Col>
          <ReactPlayer width='100%' height='100%' controls='true' url={cardData.url} />
        </Col>
      </Row> */}

      {
        sectionData && sectionData.map((section, index) => {
          return (
            section.story_id === cardData.id ? <p>{section.title}</p> : ""
          )
        })
      }

      <EditStoryModal id={cardData.id} title={cardData.title} img={cardData.artwork} description={cardData.description} duration={cardData.duration} isOpen={modal} audioURL={cardData.url} toggle={toggle} />
    </div >
  );
};

export default StoryScreen;