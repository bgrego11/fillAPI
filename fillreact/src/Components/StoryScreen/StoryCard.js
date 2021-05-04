import React, { useState } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
// import EditSeriesModal from './EditSeriesModal';

const StoryCard = ({cardData, toggleScreen}) => {

const [modal, setModal] = useState(false);
const toggle = () => {
  console.log("i am working")
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
    console.log(data);
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

  return (
    <div className="space-bottom">
      <Card>
        <CardImg top width="100%" src={cardData.artwork} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{cardData && cardData.title}</CardTitle>
          <CardText className="seriesText">{cardData.description}</CardText>
          {/* <Button onClick={() => toggleScreen('story', cardData.id)}>Add Stories</Button> */}
          <Button isOpen={modal} onClick={toggle} >Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </CardBody>
      </Card>
      {/* <EditSeriesModal id={cardData.id} title={cardData.title} img={cardData.img} description={cardData.description} likes={cardData.likes} isOpen={modal} toggle={toggle}  /> */}
    </div>
  );
};

export default StoryCard;