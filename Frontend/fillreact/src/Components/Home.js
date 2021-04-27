import React, { useState} from 'react';
import { Container} from 'reactstrap';

// Components
import SeriesScreen from './SeriesScreen/SeriesScreen';
import StoryScreen from './StoryScreen/StoryScreen';

const EditScreen = (props) => {
    const [screenType, setScreenType] = useState('Series');
    const [seriesID, setSeriesID] = useState('')
    const toggleScreen = (screen, id) => {
        console.log("i am working")
        setScreenType(screen)
        setSeriesID(id)
        console.log(screen)
        console.log(id)
    }

return (
    <Container className="seriesContainer">
        {screenType === 'Series' ? <SeriesScreen toggleScreen={toggleScreen} /> : <StoryScreen seriesID={seriesID} toggleScreen={toggleScreen} />}
        {/* <SeriesScreen toggleScreen={toggleScreen} /> */}
    </Container>
);
}
export default EditScreen;