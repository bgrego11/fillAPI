import React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

import Home from './HomeScreen/HomeScreen';
import Series from './SeriesScreen/SeriesScreen';
import Donate from './DonateScreen/DonateScreen';

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const Routes = () => {
  return (
    <BrowserRouter history={history}>
      <Switch >
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/series" component={Series} />
        <ProtectedRoute path="/donate" component={Donate} />
        {/* <Route path="/shop" component={Shop} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;