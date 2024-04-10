
interface NoteItemProps {
  note: any;
}

export default function NoteItem(props: NoteItemProps) {
  const { note } = props;

  return (
    <div className='col-md-4 my-3'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text"><small className="text-muted">Created On: {new Date(note.createdDate).toLocaleString()}</small></p>
          <i className="far fa-trash-alt mx-2"></i>
          <i className="far fa-edit mx-2"></i>
        </div>
      </div>
    </div>
  )
}
