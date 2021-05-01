import React, { useState } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
// import EditSeriesModal from './EditSeriesModal';

const SeriesCard = (props) => {

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
fetch(`https://evening-springs-63282.herokuapp.com/api/series/${props.seriesData.id}`, requestOptions)
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
        <CardImg top width="100%" src={props.seriesData.img} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{props.seriesData && props.seriesData.title}</CardTitle>
          <CardText className="seriesText">{props.seriesData.description}</CardText>
          <Button onClick={() => props.toggleScreen('story', props.seriesData.id)}>Add Stories</Button>
          <Button isOpen={modal} onClick={toggle} >Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </CardBody>
      </Card>
      {/* <EditSeriesModal id={props.seriesData.id} title={props.seriesData.title} img={props.seriesData.img} description={props.seriesData.description} likes={props.seriesData.likes} isOpen={modal} toggle={toggle}  /> */}
    </div>
  );
};

export default SeriesCard;