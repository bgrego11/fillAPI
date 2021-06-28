import './App.css';
import NavBar from './components/navigation/Nav';
import Home from './components/routing/HomeScreen/HomeScreen';
import Series from './components/routing/SeriesScreen/SeriesScreen';
import Donate from './components/routing/DonateScreen/DonateScreen';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};


function App() {
  // const { loginWithRedirect } = useAuth0();
  // <button onClick={() => loginWithRedirect()}>Log In</button>

  //add auth0
  return (<Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <div className="App">
      <BrowserRouter history={history}>
        <header className="App-header">
          <NavBar />
        </header>

        <Switch >
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/series" component={Series} />
          <ProtectedRoute path="/donate" component={Donate} />
          {/* <Route path="/shop" component={Shop} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  </Auth0Provider>
  );
}

export default App;
