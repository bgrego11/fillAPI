import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

// Components
import SeriesScreen from './SeriesScreen';
import StoryScreen from '../StoryScreen/StoryScreen';

const DashBoardScreen = (props) => {
  const [screenType, setScreenType] = useState('Series');
  const [sectionData, setSectionData] = useState([]);
  const [seriesID, setSeriesID] = useState('')
  const toggleScreen = (screen, id) => {
    setScreenType(screen)
    setSeriesID(id)
  }

  const fetchSectionData = async () => {
    let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/section`, {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
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
      {screenType === 'Series' ? <SeriesScreen toggleScreen={toggleScreen} /> : <StoryScreen sectionData={sectionData} seriesID={seriesID} />}
    </Container>
  );
}
export default DashBoardScreen;