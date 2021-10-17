import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

// Components
import DashboardSeriesScreen from '../DashBoardScreen/Dashboard';
import StoryScreen from '../DashBoardScreen/EditStoryscreen';

const DashBoardScreen = (props) => {
  const [screenType, setScreenType] = useState('Series');
  const [seriesID, setSeriesID] = useState('')
  const toggleScreen = (screen, id) => {
    setScreenType(screen)
    setSeriesID(id)
  }


  return (
    <Container className="seriesContainer">
      <DashboardSeriesScreen toggleScreen={toggleScreen} />
    </Container>
  );
}
export default DashBoardScreen;