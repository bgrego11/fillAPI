import React from 'react';
import { Col, Row } from 'reactstrap';
import HomeCarousel from './HomeCarousel';
import ChristineImage from '../../../assets/img/Website-Selfie3.png';
// import { useAuth0 } from '@auth0/auth0-react';

const HomeScreen = () => {
  // const { isLoading, error } = useAuth0();

  return (
    // isLoading ?
    //   <Spinner primary />
    //   :
    // <Container>
    <>
      {/* <Row className="justify-content-center">
        <Col className="text-center">The Daily Routine</Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center" >To Make True Fulfillment a Lifestyle</Col>
      </Row> */}
      < Row className="justify-content-center" >
        <Col >
          <HomeCarousel />
        </Col>
      </Row >
      {/* <div className='divider' /> */}
      <Row style={{ height: '15px' }}>
      </Row>
      {/* <Row className="justify-content-center">
        <Col xs="4" sm="4" md="4" lg="4" xl="4" className="text-center" > */}
      {/* <Col xs="8" sm="8" md="6" lg="5" xl="4" className="text-center" > */}
      {/* <img width="100%" src={ChristineImage} alt="" />
        </Col>
      </Row> */}
      <Row>
        <Col>
          <img style={{ marginRight: '10px' }} width="35%" align="left" src={ChristineImage} alt="" />
          {/* <span style={{ color: 'rgb(162, 81, 87)', textIndent: '30px' }}> */}
          <p style={{ textAlign: "center" }}><strong>If we haven’t met yet, I’m Christine!</strong></p>

          <p>While I love Jesus and consider it an honor to lead people to discover Him in the midst of their real lives, I have to be honest and say that I never considered myself a “Bible Study Girl.”</p>

          <p>You know, she’s that picture perfect woman who has her life together, is always calm, peaceful, and never, ever, screws up!</p>

          <p>Nope, I am simply a girl who tries to be an overall decent human being … But, truthfully, I am a hot mess on my BEST day. I have doubts and questions, and I screw up far more than I’d like to admit.</p>

          <p>It was through my very unconventional call to work in ministry that I actually discovered REAL faith in my own life. Contrary to what I believed, my flaws and imperfections were not rejected or even glossed over. They were accepted, validated, and used in beautiful ways.</p>

          <p>My eyes were opened to a truth …</p>

          <p style={{ textAlign: "center" }}><strong>You don’t have to be a “bible study girl,” to be a girl who studies the Bible.</strong></p>

          <p>So regardless of your church experience, Sunday school attendance record, or your knowledge of the Bible … I can guarantee that The Fill is a safe space for you to explore how to make this whole faith thing actually impact your daily life, for the better.</p>

          <p>I am ecstatic to get to know you, and walk through this journey of faith together!</p>

          <p style={{ textAlign: "center" }}>With Love,</p>
          <p style={{ textAlign: "center" }}>Christine</p>
          {/* </span> */}
        </Col>
      </Row>
      {/* <div className="divider" /> */}
      <Row style={{ height: '15px' }}>
      </Row>
      {/* <Row>
        <Col className="divider">
        </Col>
      </Row> */}
      {/* <Row className="justify-content-center">
        <Col xs="auto" lg="4">
          <Card1 />
        </Col>
      </Row>
      <Row>
        <Col className="divider">
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto" lg="4">
          <Card2 />
        </Col>
        <Col xs="auto" lg="4">
          <Card3 />
        </Col>
      </Row>
      <Row>
        <Col className="divider">
        </Col>
      </Row> */}
    </>

    // </Container >
  )
}

export default HomeScreen;