import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import { Row, Col } from 'reactstrap';
import DELETE_TRASH_FEATHER_SVG from '../../../assets/svg/DELETE_TRASH_FEATHER_SVG';
import EDIT_FEATHER_SVG from '../../../assets/svg/EDIT_FEATHER_SVG';
import ErrorScreen from '../../error/ErrorScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import EditStoryModal from './EditStoryModal'

// const StoryScreen = ({ cardData, toggleScreen, sectionData }) => {
const StoryScreen = (props) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [sectionData, setSectionData] = useState();

  const cardData = props.location.state;

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  }

  const handleDelete = (event) => {

    event.preventDefault();
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`https://thefill.herokuapp.com/api/story/${cardData.id}`, requestOptions)
      .then(async response => {
        const data = await response.json();
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
        <Row >
          <Col xs='12' sm='6'>
            <img width="100%" src={cardData.artwork} alt="Card cap" />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{ color: 'rgb(162,81,87)' }}>
                {cardData && cardData.title}
              </div>
              {/* <div style={{ display: 'flex', verticalAlign: 'top' }}>
                <div isOpen={modal} onClick={toggle}>
                  <EDIT_FEATHER_SVG
                    size='20' color='rgb(250, 146, 164)' />
                </div>
                <div>
                  <DELETE_TRASH_FEATHER_SVG
                    size='20' color='rgb(250, 146, 164)' />
                </div>
              </div> */}
            </div>

            <div><p>{cardData.description}</p></div>
          </Col>
          <Col xs='12' sm='6'>
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
            <ReactPlayer width='100%' controls='true' url={cardData.url} />
          </Col>
        </Row>

        <EditStoryModal id={cardData.id} title={cardData.title} img={cardData.artwork} description={cardData.description} duration={cardData.duration} isOpen={modal} audioURL={cardData.url} toggle={toggle} />
      </div >
    );
  }
};

export default StoryScreen;