import React from 'react';
import card1Image from '../../../assets/card1.jpeg';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';
import FB_SVG from '../../../assets/FB_SVG';
import INSTAGRAM_SVG from '../../../assets/INSTAGRAM_SVG';

const Card1 = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Find It All Here</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">[more]</CardSubtitle>
        </CardBody>
        <img width="100%" src={card1Image} alt="" />
        <CardBody>
          <CardText>Stuff.</CardText>
          <CardLink href="https://www.facebook.com/thefillapp" rel="noopener noreferrer" target="_blank"><FB_SVG color="blue" /></CardLink>
          <CardLink href="https://www.instagram.com/christine_thefill/" rel="noopener noreferrer" target="_blank"><INSTAGRAM_SVG color="red" /></CardLink>
        </CardBody>
      </Card>
    </div>
  );
};

export default Card1;