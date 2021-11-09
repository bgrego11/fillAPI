import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const EditCarouselsModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [desktopImage, setDesktopImage] = useState('')
  const [mobileImage, setMobileImage] = useState('') 


  const handleDesktopChange = event => {
    setDesktopImage(event.target.value);
  };

  const handleMobileChange = event => {
    setMobileImage(event.target.value);
  };

  const handleSubmit = (event) => { 


    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "dt_url": desktopImage,
        "dt_route_name": "thefill.org",
        "mb_url": mobileImage,
        "mb_route_name": "thefill.org"
       })
  };
  fetch(`https://thefill.herokuapp.com/api/carousel/${props.id}`, requestOptions)
  .then(async response => {
      const data = await response.json();
      console.log(data);
      setModal(!modal)
      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);    
      }
      window.location.reload()
  })
  .catch(error => {
    
      console.error('There was an error!', error);

  });
};

const toggleModal = () => {
    setModal(!modal)
}

useEffect(() => {
    setDesktopImage(props.desktopURL)
    setMobileImage(props.mobileURL)
}, [props.desktopURL, props.mobileURL])

  return (
    <div>
        <Button onClick={toggleModal}>Edit Slide</Button>
      <Modal isOpen={modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Edit Slide Images</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
                <Label for="title">Desktop Image URL</Label>
                <Input type="text" name="title" id="seriesTitle" placeholder="Edit Desktop" onChange={handleDesktopChange} value={desktopImage} />
                <Label for="description">Mobile Image URL</Label>
                <Input type="text" name="title" id="seriesDesc" placeholder="Edit Mobile Image" onChange={handleMobileChange} value={mobileImage} />
            </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Save Edit Slide</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditCarouselsModal;