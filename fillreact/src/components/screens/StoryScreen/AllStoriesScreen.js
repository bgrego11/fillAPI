/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Button, ListGroup, ListGroupItem, Container,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

// Components
import ARROW_LEFT_FEATHER_SVG from '../../../assets/svg/ARROW_LEFT_FEATHER_SVG';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ErrorScreen from '../../error/ErrorScreen';



const SeriesStoriesScreen = (props) => {

  const [allStoryData, setAllStoryData] = useState([])
  const [storiesData, setStoriesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [sortOptions, setSortOptions] = useState([]);
  const [allStoryTags, setAllStoryTags] = useState([]);


  // toggle our drop down filters open/close state
  const toggle = () => {
    setDropDownOpen(!dropdownOpen);
  }

  // We need to filter sotries by their respective paramter 
  // In order to do this we will take a key from the tag and update our array
  const filterStories = (sortParams) => {
    const matchingStoryTags = []
    let newStoryArray = []
    if (sortParams.length < 1) {
      setStoriesData(allStoryData)
      return
    }

    allStoryData.map((story) => {
      story.st_tags.map((filterTag) => {

        sortParams.map((filterName) => {
          if (filterTag.tag.toLowerCase() === filterName) {
            if (matchingStoryTags.indexOf(filterTag.story_id) === -1) {
              matchingStoryTags.push(filterTag.story_id)
            }
          }
        })
      })
    })
  
    allStoryData.map((getIT) => {
      matchingStoryTags.map((story) => {
        if (story === getIT.id) {
          newStoryArray.push(getIT)
        }
      })
    })

    setStoriesData(newStoryArray)

  }

  const toggleSortOption = (sortParam) => {
    let newOptions = sortOptions
    if (sortOptions.indexOf(sortParam) === -1) {
      newOptions.push(sortParam)
      setSortOptions(newOptions)
    } else {
      newOptions = sortOptions.filter((option) => option !== sortParam)
      setSortOptions(newOptions)
    }
    filterStories(newOptions)
    console.log('newIotions',newOptions)
  }

  const fetchStoryData = async () => {
    try {
      let res = await fetch(`https://thefill.herokuapp.com/api/story/`, {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      );
      let rawStoriesData = await res.json();
      let storyTagArray = []

      setAllStoryData(rawStoriesData);
      setStoriesData(rawStoriesData);

      // set our story tag options for dropdown
      rawStoriesData.map((story) => {
        story.st_tags.map((tagItem) => {
          const tag = tagItem.tag.toLowerCase()
          if (storyTagArray.indexOf(tag) === -1) {
            storyTagArray.push(tag);
          }
        })
      })
      setAllStoryTags(storyTagArray)
      setIsLoaded(true);
    }
    catch (error) {
      setErr(error);
      setIsLoaded(true);
    }
  };

  const clearSortParams = () => {
    setSortOptions([])
    filterStories([])
  }

  useEffect(() => {
    fetchStoryData();
  }, []);

  if (err) {
    return <ErrorScreen error={err} />
  }
  else if (!isLoaded) {
    return <LoadingScreen />
  }
  else {
    return (
      <div className="seriesContainer">
        <Row>
          <Col>
            {/* <div style={{ display: 'flex' }}> */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Button
                  style={{
                    display: 'inline-flex', alignItems: 'center'
                  }}
                  tag={Link} to="/"
                  small outline className="the-fill-app-button" > <ARROW_LEFT_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />Home
                </Button>
              </div>
              {/* <div style={{ display: 'flex' }}> */}
              {/* <div> */}
              {/* <Button
                    style={{
                      display: 'inline-flex', alignItems: 'center'
                    }}
                    small outline className="the-fill-app-button"
                    onClick={newModaltoggle}
                  > <PLUS_ADD_FEATHER_SVG
                      size='20' color='rgb(250, 146, 164)' />Add New Story
                  </Button> */}
              {/* <NewStoryModal isOpen={newModal} toggle={newModaltoggle} /> */}
              {/* </div> */}

            <Dropdown isOpen={dropdownOpen} toggle={() => toggle()}>
              <DropdownToggle color="primary" caret>
                Filter by story type
              </DropdownToggle>
              <DropdownMenu>
                {
                  allStoryTags && allStoryTags.map((option) => {

                    if (sortOptions.indexOf(option) !== -1) {
                      return <DropdownItem onClick={() => toggleSortOption(option)}>&#10004; {option}</DropdownItem>
                    } else {
                      return (
                        <DropdownItem onClick={() => toggleSortOption(option)}>{option}</DropdownItem>
                      )
                    }
                  })
                }
                <DropdownItem onClick={() => clearSortParams()}>Clear Filters</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </div>
          </Col>
        </Row>
        {/* <Row>
            <Col xs="12">
              <img width="100%" src={seriesData.img} alt={seriesData.title} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ paddingTop: '2rem' }}>
                <p>{seriesData.description}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <span style={{ color: 'rgb(240, 146, 164)' }}>
                <h3>Series Content:</h3>
              </span>
            </Col>
          </Row> */}
        <Row>
          <Container>
            <ListGroup>
              {storiesData && storiesData.map((story, index) => {
                return (
                  <ListGroupItem key={index} tag={Link} to={{
                    pathname: '/singlestory',
                    state: story,
                  }}>
                    <img width='30rem' height='30rem' src={story.artwork} alt={story.title} />
                    <Button small outline className="the-fill-app-button">
                      {story.title}
                    </Button>
                  </ListGroupItem>
                )
              })
              }
            </ListGroup>
          </Container>
          {/* <Col xs="12" sm="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Add New Story</CardTitle>
                  <Button onClick={newModaltoggle}>Click to Add</Button>
                </CardBody>
              </Card>
            </Col> */}
        </Row>
        {/* <NewStoryModal isOpen={newModal} seriesID={seriesID} toggle={newModaltoggle} /> */}
      </div>
    );
  }
}

export default SeriesStoriesScreen;