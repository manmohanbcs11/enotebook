import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { NoteDto } from '../dto';

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({
    id: '',
    eTitle: '',
    eDescription: '',
    eTag: ''
  });


  useEffect(() => {
    getNotes();
  }, []);

  const ref = useRef<HTMLButtonElement>(null);
  const refClose = useRef<HTMLButtonElement>(null);

  const updateNote = (id: string, title: string, description: string, tag: string) => {
    console.log('updateNote method.');
    if (ref.current) {
      ref.current.click();
      setNote({ id: id, eTitle: title, eDescription: description, eTag: tag });
    }
  }

  const handleOnSave = (event: FormEvent<HTMLFormElement>) => {
    console.log('handleOnSave method:', note);
    event.preventDefault();
    editNote(note.id, note.eTitle, note.eDescription, note.eTag);
    refClose.current?.click();
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3' onSubmit={handleOnSave}>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>Title</label>
                  <input type='text' className='form-control' id='eTitle' name='eTitle' value={note.eTitle} onChange={handleOnChange} minLength={3} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>Description</label>
                  <input type='text' className='form-control' id='eDescription' name='eDescription' value={note.eDescription} onChange={handleOnChange} minLength={5} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor='tag' className='form-label'>Tag</label>
                  <input type='text' className='form-control' id='eTag' name='eTag' value={note.eTag} onChange={handleOnChange} minLength={3} required />
                </div>

                <div className="modal-footer">
                  <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-2 my-3'>
        <h2>Your Notes:</h2>
        <div className='row'>
          {notes.length === 0 && <p>No notes to show.</p>}
          {notes.map((noteItem: NoteDto) => {
            return <NoteItem key={noteItem._id} updateNote={updateNote} note={noteItem} />;
          })}
        </div>
      </div>
    </>
  );
}
