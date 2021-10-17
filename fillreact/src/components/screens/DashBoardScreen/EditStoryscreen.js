import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Row, Col, Card, CardBody,
  CardTitle, Button, Spinner
} from 'reactstrap';

// Components
import StoryCard from '../StoryScreen/StoryCard'
import NewStoryModal from '../StoryScreen/NewStoryModal'



const EditStoryScreen = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [storyTagData, setStoryTagDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newModal, setNewModal] = useState(false);
  const { seriesID } = useParams()
  const newModaltoggle = () => {
    setNewModal(!newModal);
  }

  const fetchStoryTagData = async () => {
    let res = await fetch(`https://thefill.herokuapp.com/api/storytag`, {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    );
    let storyTData = await res.json();
    console.log(storyTData);
    setStoryTagDate(storyTData);
  };

  useEffect(() => {
    fetchStoryTagData();
  }, []);

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


  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        let res = await fetch(`https://thefill.herokuapp.com/api/series/${seriesID}`, {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
        );
        let seriesData = await res.json();
        setSeriesData(seriesData.stories);
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    };
    fetchStoryData();
  }, [seriesID, sectionData]);


  const handleScreen = () => {
    window.location = '/editDashboard'
  }

  return (
    <div className="seriesContainer">
      <Button onClick={handleScreen}>Back to Series</Button>
      {loading ?
        <div className="spinnerCenter">
          <Spinner type="grow" style={{ width: '5rem', height: '5rem', color: "#f092a4" }} />
        </div>
        :
        <div className="seriesContainer">
          <Row>
            {seriesData && seriesData.map((story, index) => {
              return <Col key={index} xs="12" sm="4"><StoryCard sectionData={sectionData && sectionData} storyTagData={storyTagData} cardData={story} /></Col>
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

export default EditStoryScreen;