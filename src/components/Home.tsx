import { useEffect } from 'react';
import Notes from './Notes';

interface HomeProps {
  showAlert: (type: string, message: string) => void;
}

export const Home = (props: HomeProps) => {

  useEffect(() => {
    document.title = "eNotepad - Home";
  });

  return (
    <div>
      <Notes showAlert={props.showAlert} />
    </div>
  )
}