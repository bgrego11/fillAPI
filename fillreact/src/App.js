import './App.scss';
import './index.css'

import TheFillNavBar from './components/navigation/TheFillNavBar';
import Home from './components/screens/HomeScreen/HomeScreen';
import DonateScreen from './components/screens/DonateScreen/DonateScreen';
import { Switch, Route } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { Container } from 'reactstrap';
import DashboardSeriesScreen from './components/screens/DashBoardScreen/Dashboard';
import DonateCheckoutScreen from './components/screens/DonateScreen/DonateCheckoutScreen';
import SeriesStoriesScreen from './components/screens/StoryScreen/SeriesStoriesScreen';
import AllStoriesScreen from './components/screens/StoryScreen/AllStoriesScreen';
import SeriesScreen from './components/screens/SeriesScreen/SeriesScreen';
import StoryScreen from './components/screens/StoryScreen/StoryScreen';
import LoadingScreen from './components/screens/LoadingScreen/LoadingScreen';
import Profile from './components/profile/Profile';
import TheFillFooter from './components/footer/TheFillFooter';
import EditStoryscreen from './components/screens/DashBoardScreen/EditStoryscreen'
import ErrorScreen from './components/error/ErrorScreen';
import EditCarouselImages from './components/screens/DashBoardScreen/EditCarouselImages';

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component, {
    onRedirecting: () => <LoadingScreen />,
  })} {...args} />
);

function App() {

  const { isLoading } = useAuth0();


  return (
    < >
      {/* <Container> */}
      <TheFillNavBar />
      {/* </Container> */}
      {
        isLoading
          ?
          <LoadingScreen />
          :

          <>
            <Container style={{ paddingTop: '2rem' }} >
              <main className='main-container'>
                <Switch >
                  <Route exact path="/" component={Home} />
                  <ProtectedRoute path="/serieslist" component={SeriesScreen} />
                  <ProtectedRoute path="/donatecheckout" component={DonateCheckoutScreen} />
                  <ProtectedRoute path="/donate" component={DonateScreen} />
                  <ProtectedRoute path="/donatecheckout" component={DonateCheckoutScreen} />
                  <ProtectedRoute path="/seriesstories/:seriesID" component={SeriesStoriesScreen} />
                  <ProtectedRoute path="/allstories" component={AllStoriesScreen} />
                  {/* <ProtectedRoute path="/userprofile" component={UserProfileScreen} /> */}
                  <ProtectedRoute path="/singlestory" component={StoryScreen} />
                  <ProtectedRoute path="/userprofile" component={Profile} />
                  <ProtectedRoute path="/editdashboard" component={DashboardSeriesScreen} />
                  <ProtectedRoute path="/editstories/:seriesID" component={EditStoryscreen} />
                  <ProtectedRoute path="/editcarousel" component={EditCarouselImages} />
                  <Route path="/error" component={ErrorScreen} />
                </Switch>
              </main>

              <TheFillFooter />
              {/* <Card className="border-top-0 bg-white">
              <CardFooter style={{ backgroundColor: "rgb(249,217,229)", paddingBottom: "0", marginBottom: "0" }} className="text-muted text-center border-top-0 "><p style={{ marginBottom: "0" }}>© GraceMeetsReality. All rights reserved.</p></CardFooter>
            </Card> */}
            </Container>
          </>
      }

    </>

  );
}

export default App;
