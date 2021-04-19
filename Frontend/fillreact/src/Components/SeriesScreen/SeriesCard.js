import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

const SeriesCard = (props) => {
console.log(props.seriesData)

  return (
    <div>
      <Card>
        <CardImg top width="100%" src={props.seriesData.img} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{props.seriesData && props.seriesData.title}</CardTitle>
          <CardText className="seriesText">{props.seriesData.description}</CardText>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default SeriesCard;