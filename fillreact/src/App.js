import './App.css';
import TheFillNavBar from './components/navigation/TheFillNavBar';
import Home from './components/screens/HomeScreen/HomeScreen';
// import Series from './components/routing/SeriesScreen/SeriesScreen';
import DonateScreen from './components/screens/DonateScreen/DonateScreen';
import DashBoardScreen from './components/screens/SeriesScreen/DashBoardScreen';


import { Switch, Route } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { Card, CardFooter, Container } from 'reactstrap';
import SeriesStoriesScreen from './components/screens/StoryScreen/SeriesStoriesScreen';
import AllStoriesScreen from './components/screens/StoryScreen/AllStoriesScreen';
import UserProfileScreen from './components/screens/UserProfileScreen/UserProfileScreen';
import SeriesScreen from './components/screens/SeriesScreen/SeriesScreen';
import StoryScreen from './components/screens/StoryScreen/StoryScreen';

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  })} {...args} />
);

function App() {

  const { isLoading } = useAuth0();

  // if (isLoading)
  //   return <div>Loading ... </div>

  return (
    <>
      {/* <Container> */}
      <TheFillNavBar />
      {/* </Container> */}
      {
        isLoading
          ?
          <div>Loading ...</div>
          :

          <>
            <Container>
              <Switch >
                <Route exact path="/" component={Home} />
                <ProtectedRoute path="/serieslist" component={SeriesScreen} />
                <ProtectedRoute path="/donate" component={DonateScreen} />
                {/* <ProtectedRoute path="/allseriesstories" component={FillSistersScreen} /> */}
                <ProtectedRoute path="/seriesstories/:seriesID" component={SeriesStoriesScreen} />
                <ProtectedRoute path="/allstories" component={AllStoriesScreen} />
                <ProtectedRoute path="/userprofile" component={UserProfileScreen} />
                <ProtectedRoute path="/singlestory" component={StoryScreen} />
              </Switch>

              <Card className="border-top-0 bg-white">
                <CardFooter style={{ backgroundColor: "rgb(249,217,229)", paddingBottom: "0", marginBottom: "0" }} className="text-muted text-center border-top-0 "><p style={{ marginBottom: "0" }}>© GraceMeetsReality. All rights reserved.</p></CardFooter>
              </Card>
            </Container>
          </>
      }

    </>

  );
}

export default App;
