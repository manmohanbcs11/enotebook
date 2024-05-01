import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import '../css/AddNote.css';

interface AddNoteProps {
  showAlert: (type: string, message: string) => void;
}

const AddNote: React.FC<AddNoteProps> = (props) => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  });

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload on submit
    addNote(note.title, note.description, note.tag); // Add the note
    setNote({
      title: '',
      description: '',
      tag: '',
    });
    props.showAlert('success', 'Note added successfully');
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div className="add-note-container">
      <h2>Add a New Note</h2>
      <form className="note-form" onSubmit={handleOnSubmit}>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            id="title"
            name="title"
            value={note.title}
            onChange={handleOnChange}
            minLength={3}
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-textarea"
            id="description"
            name="description"
            value={note.description}
            onChange={handleOnChange}
            rows={4}
            required
          />
        </div>

        {/* Tag Input */}
        <div className="form-group">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-input"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleOnChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
