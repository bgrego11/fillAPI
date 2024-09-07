import React, { useState, useEffect } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle
} from 'reactstrap';
import DELETE_TRASH_FEATHER_SVG from '../../../assets/svg/DELETE_TRASH_FEATHER_SVG';
import EDIT_FEATHER_SVG from '../../../assets/svg/EDIT_FEATHER_SVG';
import EditStoryModal from './EditStoryModal'

const StoryCard = ({ cardData, storyTagData }) => {

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
    fetch(`/api/story/${cardData.id}`, requestOptions)
      .then(async response => {
        const data = await response.json();
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


  return (
    <div className="space-bottom">
      <Card>
        <CardImg top width="100%" src={cardData.artwork} alt="Card image cap" />
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <CardTitle
                style={{ color: 'rgb(162,81,87)' }}
                tag="h5">
                {cardData && cardData.title}
              </CardTitle>
            </div>
            <div style={{ display: 'flex', verticalAlign: 'top' }}>
              {/* <div onClick={() => props.toggleScreen('story', props.seriesData.id)}>
                <PLUS_ADD_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
              </div> */}
              <div isOpen={modal} onClick={toggle}>
                <EDIT_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
              </div>
              <div onClick={handleDelete}>
                {/* <Button style={{ width: '22px', height: '22px' }}> */}
                <DELETE_TRASH_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
                {/* </Button> */}
              </div>
            </div>
          </div>

          <CardText className="storyText">{cardData.description}</CardText>
          <CardText></CardText>
          {/* <Button onClick={() => toggleScreen('story', cardData.id)}>Add Stories</Button> */}
          {/* <Button isOpen={modal} onClick={toggle} >Edit</Button>
          <Button onClick={handleDelete}>Delete</Button> */}
        </CardBody>
      </Card>
      <EditStoryModal 
        id={cardData.id} 
        title={cardData.title} 
        img={cardData.artwork} 
        description={cardData.description} 
        duration={cardData.duration} 
        isOpen={modal} 
        audioURL={cardData.url} 
        storyTagData={storyTagData}
        toggle={toggle} />
    </div>
  );
};

export default StoryCard;