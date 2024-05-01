import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/notes/NoteContext';
import '../css/AddNote.css';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

interface NotesProps {
  showAlert: (type: string, message: string) => void;
}

export default function Notes(props: NotesProps) {
  const { notes, getNotes, editNote } = useContext(NoteContext);
  const navigate = useNavigate();

  // Check if the token exists only once when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getNotes(); // Call `getNotes` only once when component mounts
    } else {
      navigate('/login'); // Redirect to login if token is absent
    }
  }, [navigate]); // Include stable function references in the dependency array

  const [note, setNote] = useState({
    id: '',
    eTitle: '',
    eDescription: '',
    eTag: ''
  });

  const ref = useRef<HTMLButtonElement>(null);
  const refClose = useRef<HTMLButtonElement>(null);

  const updateNote = (id: string, title: string, description: string, tag: string) => {
    if (ref.current) {
      ref.current.click(); // Open modal
      setNote({ id, eTitle: title, eDescription: description, eTag: tag }); // Set state
    }
  };

  const handleOnSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editNote(note.id, note.eTitle, note.eDescription, note.eTag); // Save changes
    refClose.current?.click(); // Close modal
    props.showAlert('success', 'Note updated successfully'); // Alert
  };

  return (
    <div className="container">
      <AddNote showAlert={props.showAlert} />
      {/* Edit Note Modal */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch Edit Note Modal
      </button>
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3" onSubmit={handleOnSave}>
                <div className="mb-3">
                  <label htmlFor="eTitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTitle"
                    name="eTitle"
                    value={note.eTitle}
                    onChange={(e) => setNote({ ...note, eTitle: e.target.value })}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eDescription"
                    name="eDescription"
                    value={note.eDescription}
                    onChange={(e) => setNote({ ...note, eDescription: e.target.value })}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eTag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTag"
                    name="eTag"
                    value={note.eTag}
                    onChange={(e) => setNote({ ...note, eTag: e.target.value })}
                    minLength={3}
                    required
                  />
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
      {/* Notes List */}
      <div className="mx-2 my-3">
        <h2>Your Notes:</h2>
        <div className="row">
          {notes?.length === 0 ? <p>No notes to show.</p> : notes.map((noteItem) => (
            <NoteItem key={noteItem._id} updateNote={updateNote} note={noteItem} showAlert={props.showAlert} />
          ))}
        </div>
      </div>
    </div>
  );
}
