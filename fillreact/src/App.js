import './App.css';
import NavBar from './components/navigation/Nav';
import Home from './components/screens/HomeScreen/HomeScreen';
// import Series from './components/routing/SeriesScreen/SeriesScreen';
import DonateScreen from './components/screens/DonateScreen/DonateScreen';
import FillSistersScreen from './components/screens/FillSistersScreen/FillSistersScreen';
import DashBoardScreen from './components/screens/SeriesScreen/DashBoardScreen';


import { Switch, Route } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { Card, CardFooter, Container } from 'reactstrap';
import SeriesStoriesScreen from './components/screens/SeriesStoriesScreen/SeriesStoriesScreen';
import AllStoriesScreen from './components/screens/AllStoriesScreen/AllStoriesScreen';

// import BackgroundSlider from 'react-background-slider';
// import image1 from './assets/homeCarousel1.png';
// import image2 from './assets/homeCarousel2.png';
// import image3 from './assets/homeCarousel3.png';


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
      <NavBar />
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
                <ProtectedRoute path="/serieslist" component={DashBoardScreen} />
                <ProtectedRoute path="/donate" component={DonateScreen} />
                {/* <ProtectedRoute path="/allseriesstories" component={FillSistersScreen} /> */}
                <ProtectedRoute path="/seriesstories/:seriesId" component={SeriesStoriesScreen} />
                <ProtectedRoute path="/allstories" component={AllStoriesScreen} />
              </Switch>

              <Card className="border-top-0 bg-white">
                <CardFooter style={{ backgroundColor: "rgb(249,217,229)", paddingBottom: "0", marginBottom: "0" }} className="text-muted text-center border-top-0 "><p style={{ marginBottom: "0" }}>© GraceMeetsReality. All rights reserved.</p></CardFooter>
              </Card>
            </Container>
          </>
      }
      {/* <BackgroundSlider
        images={[image1, image2, image3]}
        duration={8}
        transition={2}
      /> */}
    </>

  );
}

export default App;
