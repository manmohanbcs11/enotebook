import { ChangeEvent, useContext, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  const [text, setText] = useState('');

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }

  const handleOnSubmit = () => {
    if (text) {
      setNotes([...notes, text]);
      setText('');
    }
  }

  return (
    <div className='container mx-3'>
      <h3>Add Note:</h3>
      <div className="container">
        <textarea id="myBox" className="form-control" value={text} onChange={handleOnChange} rows={10}></textarea>
      </div>
      <button className="btn btn-primary mx-3 my-3" disabled={text === '' || text === undefined} onClick={handleOnSubmit}>Submit</button>
      <h2>Your Note:</h2>
      <div className='row'>
        {notes.map(noteItem => {
          return <NoteItem key={noteItem._id} note={noteItem} />;
        })}
      </div>
    </div>
  )
}
