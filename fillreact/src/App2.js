import React from 'react';
import { Container, FormGroup, Input, Label } from 'reactstrap';

const App2 = () => {

  const onSelect = event => {
    console.log(event.target.value);
  }

  return (
    <Container>
      <FormGroup onChange={onSelect}>
        <FormGroup check >
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            Option one is this and that—be sure to include why it's great
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            Option two can be something else and selecting it will deselect option one
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            Option three is disabled
          </Label>
        </FormGroup>
      </FormGroup>
    </Container>
  )
}

export default App2;