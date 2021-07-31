import React from 'react';
import { Button } from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';


const LoginInOutButton = () => {

  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();

  return (

    (!isAuthenticated && (
      // <Button onClick={loginWithPopup}>Log in</Button>
      <Button className="the-fill-app-button"
        outline
        onClick={() => loginWithRedirect()}>
        Log in
      </Button>
    ))

    ||

    (isAuthenticated && (
      <>
        <Button
          className="the-fill-app-button"
          outline
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}>
          Log out
        </Button>
      </>
    ))
  );

}

export default LoginInOutButton;