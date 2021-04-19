import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const NewSeriesModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const addSeries = () => {

  }

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
                <Label for="exampleEmail">Title</Label>
                <Input type="text" name="title" id="seriesTitle" placeholder="Add Title" />
                <Label for="exampleEmail">Description</Label>
                <Input type="text" name="title" id="seriesDesc" placeholder="Add Description" />
                <Label for="exampleEmail">Cover Image URL</Label>
                <Input type="text" name="title" id="seriesImg" placeholder="Add Image URL" />
            </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>Add Series</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NewSeriesModal;