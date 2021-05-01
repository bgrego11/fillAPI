import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const NewSeriesModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [title, setTitle ] = useState('');
  const [description, setDescription ] = useState('');
  const [coverImage, setCoverImage ] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleCoverImageChange = event => {
    setCoverImage(event.target.value);
  };

  const handleSubmit = (event) => { 

    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        "img": coverImage,
        "likes": 0
       })
  };
  fetch('https://evening-springs-63282.herokuapp.com/api/series', requestOptions)
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
      }, [ props.isOpen ]);


  return (
    <div>
      <Modal isOpen={modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Add a Series</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="seriesTitle" placeholder="Add Title" onChange={handleTitleChange} />
                <Label for="description">Description</Label>
                <Input type="textarea" name="title" id="seriesDesc" placeholder="Add Description" onChange={handleDescriptionChange} />
                <Label for="imageUrl">Cover Image URL</Label>
                <Input type="text" name="title" id="seriesImg" placeholder="Add Image URL" onChange={handleCoverImageChange} />
            </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Add Series</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NewSeriesModal;