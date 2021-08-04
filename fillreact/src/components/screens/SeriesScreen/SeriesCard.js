import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button, Row, Col
} from 'reactstrap';
import DELETE_TRASH_FEATHER_SVG from '../../../assets/svg/DELETE_TRASH_FEATHER_SVG';
import EDIT_FEATHER_SVG from '../../../assets/svg/EDIT_FEATHER_SVG';
import GOTO_FEATHER_SVG from '../../../assets/svg/GOTO_FEATHER_SVG';
import PLUS_ADD_FEATHER_SVG from '../../../assets/svg/PLUS_ADD_FEATHER_SVG';
import EditSeriesModal from './EditSeriesModal';

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
      <Card style={{ borderColor: 'rgba(250, 146, 164, .2)' }}>
        {/* <Row style={{ margin: '5px' }}>
          <Col xs='3'>
            <CardImg
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              src={props.seriesData.img} alt="Card image cap" />
          </Col>
          <Col xs='9'>
            <CardTitle
              style={{ color: 'rgb(162,81,87)' }}
              tag="h5">
              {props.seriesData && props.seriesData.title}
            </CardTitle>
          </Col>
        </Row> */}
        <CardImg top width="100%" src={props.seriesData.img} alt="Card image cap" />
        <CardBody>
          {/* <CardTitle tag="h5">{props.seriesData && props.seriesData.title}</CardTitle> */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <CardTitle
                style={{ color: 'rgb(162,81,87)' }}
                tag="h5">
                {props.seriesData && props.seriesData.title}
              </CardTitle>
            </div>
            <div style={{ display: 'flex', verticalAlign: 'top' }}>
              <div onClick={() => props.toggleScreen('story', props.seriesData.id)}>
                <PLUS_ADD_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
              </div>
              <div isOpen={modal} onClick={toggle}>
                <EDIT_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
              </div>
              <div>
                {/* <Button style={{ width: '22px', height: '22px' }}> */}
                <DELETE_TRASH_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
                {/* </Button> */}
              </div>
            </div>
          </div>
          {/* <CardText className="seriesText">{props.seriesData.description}</CardText> */}
          {/* <Button className="the-fill-app-button" onClick={() => props.toggleScreen('story', props.seriesData.id)}>
            Add Stories
          </Button>
          <Button className="the-fill-app-button" isOpen={modal} onClick={toggle} >Edit</Button>
          <Button className="the-fill-app-button" onClick={handleDelete}>Delete</Button> */}
          <GOTO_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />
          <Button
            tag={Link} to={{
              pathname: `/seriesstories/${props.seriesData.id}`,
              state: props.seriesData,
            }}
            small='true' outline className="the-fill-app-button">Expand this series
          </Button>
        </CardBody>
      </Card>
      <EditSeriesModal id={props.seriesData.id} title={props.seriesData.title} img={props.seriesData.img} description={props.seriesData.description} likes={props.seriesData.likes} isOpen={modal} toggle={toggle} />
    </div >
  );
};

export default SeriesCard;