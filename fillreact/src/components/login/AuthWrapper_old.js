import React from 'react';
import { Spinner } from 'reactstrap';

import { useAuth0 } from '@auth0/auth0-react';
function AuthWrapper({ children }) {
  const {
    isLoading,
    error,
  } = useAuth0();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  return <>{children}</>;
}
export default AuthWrapper;