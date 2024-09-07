import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ARROW_LEFT_FEATHER_SVG from '../../../assets/svg/ARROW_LEFT_FEATHER_SVG';
import PLUS_ADD_FEATHER_SVG from '../../../assets/svg/PLUS_ADD_FEATHER_SVG';
import { Link } from 'react-router-dom';
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
    let res = await fetch(`/api/storytag`, {
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
    let res = await fetch(`/api/section`, {
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
        let res = await fetch(`/api/series/${seriesID}`, {
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

  return (
    <div className="seriesContainer">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          style={{
            display: 'inline-flex', alignItems: 'center'
          }}
          tag={Link} to="/editdashboard"
          small outline className="the-fill-app-button" > <ARROW_LEFT_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />Dashboard
        </Button>
        <div>
        <Button
        style={{
          display: 'inline-flex', alignItems: 'center'
        }}
        small outline className="the-fill-app-button"
        onClick={newModaltoggle}
      > <PLUS_ADD_FEATHER_SVG
          size='20' color='rgb(250, 146, 164)' />Add New Story
      </Button>
      </div>
      </div>
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
          </Row>
          <NewStoryModal isOpen={newModal} seriesID={seriesID} toggle={newModaltoggle} />
        </div>
      }
    </div>
  );
}

export default EditStoryScreen;