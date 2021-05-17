import React, { Fragment, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const EditStoryModal = (props) => {
  const {
    className,
  } = props;

  const [modal, setModal] = useState(false);
  const [title, setTitle ] = useState('');
  const [description, setDescription ] = useState('');
  const [coverImage, setCoverImage ] = useState('');
  const [storyDuration, setStoryDuration] = useState('');
  const [sectionData, setSectionData] = useState([])

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleCoverImageChange = event => {
    setCoverImage(event.target.value);
  };

  const handleStoryDurationChange = event => {
    setCoverImage(event.target.value);
  };

  const handleSubmit = (event) => { 

    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        "img": coverImage,
        "likes": props.likes, 
       })
  };
  fetch(`https://evening-springs-63282.herokuapp.com/api/story/${props.id}`, requestOptions)
  .then(async response => {
      const data = await response.json();
      console.log(data);
      props.toggle();
      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);    
      }
      
  })
  .catch(error => {
    
      console.error('There was an error!', error);

  });
};

      useEffect(() => {
        setModal(props.isOpen)
        setTitle(props.title);
        setDescription(props.description)
        setCoverImage(props.img)
        setStoryDuration(props.duration)
        fetchSectionData()

      }, [ props.isOpen, props.title, props.description, props.img, props.storyDuration ]);

    const fetchSectionData = async () => {
      let res = await fetch(`https://evening-springs-63282.herokuapp.com/api/story/${props.id}`, {
          'Content-Type':'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
      }
      );
      let section = await res.json();
      console.log('this is the section', section.sections)
      setSectionData(section.sections);
    };


  return (
    <div>
      <Modal isOpen={modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Edit a Story</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="storyTitle" placeholder="Add Title" onChange={handleTitleChange} value={title} />
                <Label for="description">Description</Label>
                <Input type="textarea" name="title" id="storyDesc" placeholder="Add Description" onChange={handleDescriptionChange} value={description} />
                <Label for="imageUrl">Cover Image URL</Label>
                <Input type="text" name="title" id="storyImg" placeholder="Add Image URL" onChange={handleCoverImageChange} value={coverImage} />
                <Label for="imageUrl">Duration of Audio</Label>
                <Input type="text" name="title" id="storyDuration" placeholder="Add Duration Amount in Seconds" onChange={handleStoryDurationChange} value={storyDuration} />
                {
                  sectionData.map((section) => {
                    return (
                      <Fragment>
                      <Label for="imageUrl">Enter Section</Label>
                        <Input type="text" name="title" id="storyDuration" placeholder="Add Section Title"  value={section.title} />
                        <Input type="text" name="title" id="storyDuration" placeholder="Add Section Title" value={section.sub_title} />
                        <Input type="text" name="title" id="storyDuration" placeholder="Add Section Title" value={section.text} />
                      </Fragment>
                    )
                  })
                }
            </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Update Story</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditStoryModal;