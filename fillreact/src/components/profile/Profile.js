import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Col, Row } from "reactstrap";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();



  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // console.log(user);
  return (
    Object.keys(user).map((key, val) => {
      return (
        <Row key={key}>
          <Col>{key}</Col>
          <Col>{user[key]}</Col>
        </Row>
      )
    }
    ))
};

export default Profile;