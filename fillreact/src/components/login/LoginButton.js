import React from 'react';
import { Button } from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';
// import ErrorScreen from '../error/ErrorScreen';


const LoginButton = () => {

  const { loginWithRedirect, isLoading, error } = useAuth0();

  if (isLoading) {
    <LoadingScreen />
  }
  // if (!error) {
  //   <ErrorScreen error={error} />
  // }

  return (
    <Button className="the-fill-app-button"
      outline
      onClick={() => loginWithRedirect()}>
      Log in
    </Button>
  )
}

export default LoginButton;