import { useContext, useEffect, useCallback, useRef, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import '../css/AddNote.css';

interface NotesProps {
  showAlert: (type: string, message: string) => void;
}

export default function Notes(props: NotesProps) {
  const { getNotes, notes, editNote } = useContext(NoteContext);
  const navigate = useNavigate();

  const fetchNotes = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getNotes();
    } else {
      navigate('/login');
    }
  }, [getNotes, navigate]); // Ensure stable function reference in the callback

  useEffect(() => {
    fetchNotes(); // Use stable function reference to avoid infinite loops
  }, [fetchNotes]); // Ensure stable dependency array to avoid React Hook warnings

  const [note, setNote] = useState({
    id: '',
    eTitle: '',
    eDescription: '',
    eTag: '',
  });

  const ref = useRef<HTMLButtonElement>(null);
  const refClose = useRef<HTMLButtonElement>(null);

  const updateNote = useCallback(
    (id: string, title: string, description: string, tag: string) => {
      if (ref.current) {
        ref.current.click(); // Open modal for editing
        setNote({ id, eTitle: title, eDescription: description, eTag: tag });
      }
    },
    [], // Empty dependency array ensures the function reference is stable
  );

  const handleOnSave = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      editNote(note.id, note.eTitle, note.eDescription, note.eTag); // Save changes
      refClose.current?.click(); // Close modal after saving
      props.showAlert('success', 'Note updated successfully'); // Display success alert
    },
    [editNote, note, props], // Ensure stable dependencies
  );

  return (
    <div className="container">
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Note
      </button>
      {/* Edit Note Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleOnSave}>
                <div className="mb-3">
                  <label htmlFor="eTitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTitle"
                    value={note.eTitle}
                    onChange={(e) => setNote({ ...note, eTitle: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="eDescription"
                    value={note.eDescription}
                    onChange={(e) => setNote({ ...note, eDescription: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eTag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTag"
                    value={note.eTag}
                    onChange={(e) => setNote({ ...note, eTag: e.target.value })}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr className="separator-line" />
      <div className="mx-2 my-3">
        <h2>Your Notes:</h2>
        <div className="row">
          {notes.length === 0 ? (
            <p>No notes to show.</p>
          ) : (
            notes.map((noteItem) => (
              <NoteItem
                key={noteItem._id}
                updateNote={updateNote}
                note={noteItem}
                showAlert={props.showAlert}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
