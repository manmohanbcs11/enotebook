import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';

export default function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: ''
  });


  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // not to reload the page after submit
    addNote(note.title, note.description, note.tag); // Pass individual properties to addNote
    setNote({
      title: '',
      description: '',
      tag: ''
    });
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  }
  
  return (
    <div>
      <h3>Add Note:</h3>
      <form className='my-3' onSubmit={handleOnSubmit}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>Title</label>
          <input type='text' className='form-control' id='title' name='title' onChange={handleOnChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>Description</label>
          <input type='text' className='form-control' id='description' name='description' onChange={handleOnChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor='tag' className='form-label'>Tag</label>
          <input type='text' className='form-control' id='tag' name='tag' onChange={handleOnChange} />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}
