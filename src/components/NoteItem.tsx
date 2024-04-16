import { useContext } from "react";
import { NoteContext } from "../context/notes/NoteContext";

interface NoteItemProps {
  note: any;
  updateNote: (id: string, title: string, description: string, tag: string) => void;
  showAlert: (type: string, message: string) => void;
}

export default function NoteItem(props: NoteItemProps) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  
  const handleOnDelete = (id: string) => {
    deleteNote(id);
    props.showAlert('success', 'Note deleted successfully!');
  }

  return (
    <div className='col-md-4 my-3'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text"><small className="text-muted">Created On: {new Date(note.createdDate).toLocaleString()}</small></p>
          <i className="far fa-trash-alt mx-2" onClick={() => handleOnDelete(note._id)}></i>
          <i className="far fa-edit mx-2" onClick={() => updateNote(note._id, note.title, note.description, note.tag )}></i>
        </div>
      </div>
    </div>
  )
}