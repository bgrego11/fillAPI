import React from 'react';
import FillUpImage from '../../../assets/IMG_9236_jpg-150x150.jpeg';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';
import FB_SVG from '../../../assets/FB_SVG';
import INSTAGRAM_SVG from '../../../assets/INSTAGRAM_SVG';

const Card2 = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Fill Up</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">[more]</CardSubtitle>
        </CardBody>
        <img width="100%" src={FillUpImage} alt="" />
        <CardBody>
          <CardText>Encouragement for Daily Fill Up Time</CardText>
          <CardLink href="https://www.facebook.com/thefillapp" rel="noopener noreferrer" target="_blank"><FB_SVG color="rgb(66,103,178)" size="24" /></CardLink>
          <CardLink href="https://www.instagram.com/christine_thefill/" rel="noopener noreferrer" target="_blank"><INSTAGRAM_SVG color="rgb(253,29,29)" size="24" /></CardLink>
        </CardBody>
      </Card>
    </div>
  );
};

export default Card2;