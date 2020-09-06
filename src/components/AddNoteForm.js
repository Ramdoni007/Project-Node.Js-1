import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormGroup, Label, Input, TextArea } from "./ui/Form";
import Button from "./ui/Button";
import Message from "./ui/Message";
import getLocalStorageData from '../utils/getLocalStorageData';

const AddNoteForm = () => {
  const [state, setState] = useState({ title: '', note: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  const handleNoteChange = (e) => {
    setState({ ...state, note: e.target.value });
  };

  const handleSubmit = (e) => {
    const notes = getLocalStorageData('notes');

    const noteId = uuidv4();

    notes.push({ ...state, id: noteId });

    localStorage.setItem('notes', JSON.stringify(notes));

    setIsSuccess(true);

    e.preventDefault();
  };

  const { title, note } = state;

  return (
    <>
      {isSuccess && <Message text="Data berhasil disimpan" />}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input type="text" name="title" value={title} onChange={handleTitleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Note</Label>
          <TextArea name="note" rows="12" value={note} onChange={handleNoteChange} />
        </FormGroup>
        <FormGroup>
          <Button type="submit">Add</Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default AddNoteForm;
