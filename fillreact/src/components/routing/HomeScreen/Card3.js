import React from 'react';
import PourOutImage from '../../../assets/Picture1-150x150.png';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';

import { Link } from 'react-router-dom';

const Card3 = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Find Out</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">[more]</CardSubtitle>
        </CardBody>
        <img width="100%" src={PourOutImage} alt="" />
        <CardBody>
          <CardText>The Connection You’re Craving</CardText>
          <CardLink tag={Link} to="/fillsisters">Fill Sisters</CardLink>
        </CardBody>
      </Card>
    </div>
  );
};

export default Card3;