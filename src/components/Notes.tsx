import { useContext, useEffect } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <AddNote />
      <div className='container mx-3'>
        <h2>Your Note:</h2>
        <div className='row'>
          {notes.map(noteItem => {
            return <NoteItem key={noteItem._id} note={noteItem} />;
          })}
        </div>
      </div>
    </>
  )
}
