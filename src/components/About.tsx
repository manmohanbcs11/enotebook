import React, { useContext } from 'react'
import { NoteContext } from '../context/notes/NoteContext';

export const About = () => {
  const value = useContext(NoteContext);

  return (
    <div>
      <h2>About</h2>
      <p>About Tile is: {value.title}</p>
      <p>About Description is: {value.description}</p>
    </div>
  )
}
