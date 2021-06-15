import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody,
  CardTitle, Button, Spinner} from 'reactstrap';

// Components
import StoryCard from './StoryCard'
import NewStoryModal from './NewStoryModal'



const StoryScreen = ({seriesID, sectionData}) => {
    const [seriesData, setSeriesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newModal, setNewModal] = useState(false);

    const newModaltoggle = () => {
      setNewModal(!newModal);
    }
      
    useEffect(() => {
        fetchStoryData();
      }, [ seriesID, sectionData ]);
    
      const fetchStoryData = async () => {
        let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/series/${seriesID}`, {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
        );
        let seriesData = await res.json();
        setSeriesData(seriesData.stories);
        setLoading(false)
      };


      const handleScreen = () => {
        window.location = '/'
      }

    return (
      <div className="seriesContainer">
        <Button onClick={handleScreen}>Back to Series</Button>
        { loading ?   
        <div className="spinnerCenter">
        <Spinner type="grow" style={{  width: '5rem', height: '5rem', color:"#f092a4" }} />
        </div>
        :
        <div className="seriesContainer">
        <Row>
            {seriesData && seriesData.map((story, index) => {
                return <Col key={index} xs="12" sm="4"><StoryCard sectionData={sectionData} cardData={story}/></Col>
            })
          }
        <Col xs="12" sm="4">
              <Card>
        <CardBody>
          <CardTitle tag="h3">Add New Story</CardTitle>
          <Button onClick={newModaltoggle}>Click to Add</Button>
        </CardBody>
      </Card>
      </Col>
        </Row>
        <NewStoryModal isOpen={newModal} seriesID={seriesID} toggle={newModaltoggle} />
        </div>
}
      </div>
    );
  }
  
  export default StoryScreen;