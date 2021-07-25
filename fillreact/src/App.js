import './App.css';
import NavBar from './components/navigation/Nav';
import Home from './components/routing/HomeScreen/HomeScreen';
import Series from './components/routing/SeriesScreen/SeriesScreen';
import DonateScreen from './components/routing/DonateScreen/DonateScreen';
import FillSistersScreen from './components/routing/FillSistersScreen/FillSistersScreen';
import DashBoardScreen from './components/routing/SeriesScreen/DashBoardScreen';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';
import { Card, CardFooter, Container } from 'reactstrap';

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
        {/* <header className="App-header"> */}
        <Container>
          <NavBar />
        </Container>
        {/* </header> */}
        <Container>
          <Switch >
            <Route exact path="/" component={Home} />
            <ProtectedRoute path="/series" component={DashBoardScreen} />
            <ProtectedRoute path="/donate" component={DonateScreen} />
            <ProtectedRoute path="/fillsisters" component={FillSistersScreen} />
          </Switch>
        </Container>
        <Card className="border-top-0 bg-white">
          <CardFooter style={{ backgroundColor: "rgba(255,0,0,0.1)", paddingBottom: "0", marginBottom: "0" }} className="text-muted text-center border-top-0 "><p style={{ marginBottom: "0" }}>© GraceMeetsReality. All rights reserved.</p></CardFooter>
        </Card>
      </BrowserRouter>
    </div>
  </Auth0Provider>
  );
}

export default App;
