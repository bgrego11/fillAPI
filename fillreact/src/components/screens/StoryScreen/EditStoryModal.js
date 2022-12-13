import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const EditStoryModal = (props) => {
  const {
    className,
  } = props;

  const [modal, setModal] = useState(false);
  const [title, setTitle ] = useState('');
  const [description, setDescription ] = useState('');
  const [coverImage, setCoverImage ] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [storyDuration, setStoryDuration] = useState('');
  const [storiesTags, setStoriestags] = useState([])
  const [addSectionTitle, setAddSectionTitle] = useState('');
  const [addSectionSubTitle, setAddSectionSubTitle] = useState('');
  const [addSectionText, setAddSectionText] = useState('');
  const [editSectionTitle, setEditSectionTitle] = useState('');
  const [editSectionSubTitle, setEditSectionSubTitle] = useState('');
  const [editSectionText, setEditSectionText] = useState('');
  const [sectionData, setSectionData] = useState([])
  const [addStoryTag, setAddStoryTag] = useState("")

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleCoverImageChange = event => {
    setCoverImage(event.target.value);
  };

  const handleStoryAudioURLChange = event => {
    setAudioURL(event.target.value);
  };

  const handleStoryDurationChange = event => {
    setCoverImage(event.target.value);
  };

  const handleEditSectionTitle = event => {
    setEditSectionTitle(event.target.value)
  }

  const handleEditSectionSubTitle = event => {
    setEditSectionSubTitle(event.target.value)
  }

  const handleEditSectionText = event => {
    setEditSectionText(event.target.value)
  }

  const handleAddSectionTitle = event => {
    setAddSectionTitle(event.target.value)
  }

  const handleAddSectionSubTitle = event => {
    setAddSectionSubTitle(event.target.value)
  }

  const handleAddSectionText = event => {
    setAddSectionText(event.target.value)
  }

  const handleAddStoryTagText = event => {
    setAddStoryTag(event.target.value)
  }

  const handleAddStoryTag = async (event) => {
    event.preventDefault();
    console.log("add story tag")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "story_id": `${props.id}`,
        "tag": `${addStoryTag}`,
       })
  };
  try {
  const response = await fetch('https://thefill.herokuapp.com/api/storytag', requestOptions)

      const data = await response.json();
      console.log(data);
    setAddStoryTag("")
      setStoriestags([...storiesTags, { id: data.id, "story_id": `${props.id}`, "tag": `${addStoryTag}`}])
      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);    
      }
    } catch(error) {
      console.error('There was an error!', error);
  };
  }

  const handleDeleteStoryTag = (tagId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
  };
  fetch(`https://thefill.herokuapp.com/api/storytag/${tagId}`, requestOptions)
  .then(async response => {
      const data = await response.json();
      console.log(data);
      const newStoryTagArr = storiesTags.filter(tags => tags.id !== tagId)
      console.log(newStoryTagArr)
      setStoriestags(newStoryTagArr)
      setAddStoryTag('')

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
  }

  const handleAddSection = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "title": addSectionTitle,
        "sub_title": addSectionSubTitle,
        "text": addSectionText,
        "story_id": `${props.id}`
       })
  };
  try {
  const response = await fetch('https://thefill.herokuapp.com/api/section', requestOptions)

      const data = await response.json();
      setSectionData([...sectionData, data])
      setAddSectionTitle('')
      setAddSectionSubTitle('')
      setAddSectionText('')

      // props.toggle();
      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);    
      }
    } catch(error) {
      console.error('There was an error!', error);
      alert("there was a problem with your request pleasw try again")
  };
}

  const handleSubmit = (event) => { 

    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        "artwork": coverImage,
        duration: storyDuration,
        url: audioURL,
       })
  };
  fetch(`https://thefill.herokuapp.com/api/story/${props.id}`, requestOptions)
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
      window.location.reload()
  })
  .catch(error => {
    
      console.error('There was an error!', error);

  });
};

const handleEditSection = (sectionId) => { 

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "title": editSectionTitle,
      "sub_title": editSectionSubTitle,
      "text": editSectionText,
     })
};
fetch(`https://thefill.herokuapp.com/api/section/${sectionId}`, requestOptions)
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

const handleDeleteSection = (sectionId) => { 

  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
};
fetch(`https://thefill.herokuapp.com/api/section/${sectionId}`, requestOptions)
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
        setAudioURL(props.audioURL)
        setStoryDuration(props.duration)
        fetchSectionData()
        console.log("this is edit storytag", props)

      }, [ props.isOpen, props.title, props.description, props.img, props.storyDuration ]);

      useEffect(() => {
        // Filter our story tags that match the story id
        const storyTags = props.storyTagData.filter(storyTags => storyTags.story_id === props.id)
        console.log("storyTags", storyTags)
        setStoriestags(storyTags)
      }, [props.id, props.storyTagData])

    const fetchSectionData = async () => {
      let res = await fetch(`https://thefill.herokuapp.com/api/story/${props.id}`, {
          'Content-Type':'application/json',
          'Accept': 'application/json',
      }
      );
      let section = await res.json();
      console.log('this is the section', section.sections)
      setSectionData(section.sections);
    };


  return (
    <div>
      <Modal size="lg" isOpen={modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Edit a Story</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
                <Label className="cardModalTitle" for="title">Title</Label>
                <Input type="text" name="title" id="storyTitle" placeholder="Add Title" onChange={handleTitleChange} defaultValue={title} />
                <Label className="cardModalTitle" for="description">Description</Label>
                <Input type="textarea" name="title" id="storyDesc" placeholder="Add Description" onChange={handleDescriptionChange} defaultValue={description} />
                <Label className="cardModalTitle" for="imageUrl">Cover Image URL</Label>
                <Input type="text" name="title" id="storyImg" placeholder="Add Image URL" onChange={handleCoverImageChange} defaultValue={coverImage} />
                <Label className="cardModalTitle" for="imageUrl">Audio URL</Label>
                <Input type="text" name="title" id="storyAudioURL" placeholder="Add Audio URL" onChange={handleStoryAudioURLChange} defaultValue={audioURL} />
                <Label className="cardModalTitle" for="imageUrl">Duration of Audio</Label>
                <Input type="text" name="title" id="storyDuration" placeholder="Add Duration Amount in Seconds" onChange={handleStoryDurationChange} defaultValue={storyDuration} />

                {
                  sectionData.length > 0 && sectionData.map((section) => {
                    return (
                      <div>
                      <Label className="addSection cardModalTitle" for="imageUrl">Enter Section</Label>
                        <Input type="text" name="title" id="storyDuration" placeholder="Add Section Title" onChange={handleEditSectionTitle}  defaultValue={section.title} />
                        <Input type="text" name="title" id="storyDuration" placeholder="Add Sub Title" onChange={handleEditSectionSubTitle}  defaultValue={section.sub_title} />
                        <Input type="textarea" name="title" id="storyDuration" placeholder="Add Section Text" onChange={handleEditSectionText} defaultValue={section.text} />
                        <Button color="primary" onClick={() => handleEditSection(section.id)} >Save Edited Section</Button>
                        <Button color="danger" onClick={() => handleDeleteSection(section.id)}>Delete Section</Button>
                      </div>
                    )
                  })
                }
                <div className="addSection">
                <Label className="addSection cardModalTitle" for="imageUrl">Add New Section</Label>
                    <Input type="text" name="title" placeholder="Add Section Title" onChange={handleAddSectionTitle}  defaultValue={addSectionTitle} />
                    <Input type="text" name="title" placeholder="Add Sub Title" onChange={handleAddSectionSubTitle} defaultValue={addSectionSubTitle} />
                    <Input type="textarea" name="title" placeholder="Add Section Text" onChange={handleAddSectionText} defaultValue={addSectionText} />
                <Button onClick={handleAddSection}>Add Section</Button>

                </div>
                <div className="addStoryTags">
                  <Label className="addSection cardModalTitle">Story Tags </Label>
                  {storiesTags && storiesTags.map((tag) => {
                    return (
                      <div>Tag: {tag.tag} <Button color="danger" onClick={() => handleDeleteStoryTag(tag.id)}>Delete Tag</Button></div>
                    )
                  })}
                  <Label className="addSection cardModalTitle" for="imageUrl">Add New Story Tag</Label>
                    <Input type="text" name="title" placeholder="Add Story Tag" onChange={handleAddStoryTagText}  defaultValue={addStoryTag} />
                    <Button color="primary" onClick={handleAddStoryTag}>Add Story Tag</Button>
                </div>
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