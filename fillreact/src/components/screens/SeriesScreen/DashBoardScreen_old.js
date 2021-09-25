import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

// Components
import DashboardSeriesScreen from '../DashBoardScreen/Dashboard';
import StoryScreen from '../StoryScreen/StoryScreen_old';

const DashBoardScreen = (props) => {
  const [screenType, setScreenType] = useState('Series');
  const [sectionData, setSectionData] = useState([]);
  const [seriesID, setSeriesID] = useState('')
  const toggleScreen = (screen, id) => {
    setScreenType(screen)
    setSeriesID(id)
  }

  const fetchSectionData = async () => {
    let res = await fetch(`https://thefill.herokuapp.com/api/section`, {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    );
    let sectionData = await res.json();
    console.log(sectionData);
    setSectionData(sectionData);
  };

  useEffect(() => {
    fetchSectionData();
  }, []);

  return (
    <Container className="seriesContainer">
      {screenType === 'Series' ? <DashboardSeriesScreen toggleScreen={toggleScreen} /> : <StoryScreen sectionData={sectionData} seriesID={seriesID} />}
    </Container>
  );
}
export default DashBoardScreen;