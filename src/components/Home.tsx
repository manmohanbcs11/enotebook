import React, { useContext } from 'react'
import { NoteContext } from '../context/notes/NoteContext';

export const Home = () => {
  const value = useContext(NoteContext);

  return (
    <div>
      <h2>Home</h2>
      <p>Home Tile is: {value.title}</p>
      <p>Home Description is: {value.description}</p>
    </div>
  )
}