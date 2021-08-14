import React from 'react';
import { Button } from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';


const LogoutButton = () => {

  const { logout } = useAuth0();

  return (
    <Button
      className="the-fill-app-button"
      outline
      onClick={() => {
        logout({ returnTo: window.location.origin });
      }}>
      Log out
    </Button>
  );
}

export default LogoutButton;