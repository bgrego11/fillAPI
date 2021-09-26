import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardBody, CardTitle, Button
} from 'reactstrap';
import GOTO_FEATHER_SVG from '../../../assets/svg/GOTO_FEATHER_SVG';


import EditSeriesModal from './EditSeriesModal';
import DELETE_TRASH_FEATHER_SVG from '../../../assets/svg/DELETE_TRASH_FEATHER_SVG';
import EDIT_FEATHER_SVG from '../../../assets/svg/EDIT_FEATHER_SVG';
import PLUS_ADD_FEATHER_SVG from '../../../assets/svg/PLUS_ADD_FEATHER_SVG';



const SeriesCard = (props) => {

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
    fetch(`https://evening-springs-63282.herokuapp.com/api/series/${props.seriesData.id}`, requestOptions)
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

  return (
    <div className="space-bottom">
      <Card style={{ borderColor: 'rgba(250, 146, 164, .2)' }}>
        <CardImg top width="100%" src={props.seriesData.img} alt="Card image cap" />
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <CardTitle
                style={{ color: 'rgb(162,81,87)' }}
                tag="h5">
                {props.seriesData && props.seriesData.title}
              </CardTitle>
            </div>
            {/* Admin Section begin */}
            <div style={{ display: 'flex', verticalAlign: 'top' }}>
              <div onClick={() => props.toggleScreen('story', props.seriesData.id)}>
                <PLUS_ADD_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
              </div>
              <div isOpen={modal} onClick={toggle}>
                <EDIT_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
              </div>
              <div onClick={handleDelete}>
                <DELETE_TRASH_FEATHER_SVG
                  size='20' color='rgb(250, 146, 164)' />
              </div>
            </div>
            {/* Admin Section end */}
          </div>

          <GOTO_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />
          <Button
            tag={Link} to={{
              pathname: `/seriesstories/${props.seriesData.id}`,
              state: props.seriesData,
            }}
            className="the-fill-app-button">Expand this series
          </Button>
        </CardBody>
      </Card>
      <EditSeriesModal id={props.seriesData.id} title={props.seriesData.title} img={props.seriesData.img} description={props.seriesData.description} likes={props.seriesData.likes} isOpen={modal} toggle={toggle} />
    </div >
  );
};

export default SeriesCard;