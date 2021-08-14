import React from 'react';
import { Button } from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {

  const { loginWithRedirect } = useAuth0();

  return (
    <Button className="the-fill-app-button"
      outline
      onClick={
        () =>
          loginWithRedirect({
            screen_hint: 'signup',
          })
      }>
      Sign up
    </Button>
  )

}

export default SignupButton;