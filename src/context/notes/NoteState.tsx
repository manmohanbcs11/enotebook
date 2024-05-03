import React, { ReactNode, useState, useCallback } from 'react';
import { NoteContext } from './NoteContext';

export const NoteState: React.FC<{ children: ReactNode }> = ({ children }) => {
  const AUTH_TOKEN = localStorage.getItem('token') || '';
  const [notes, setNotes] = useState<any[]>([]);

  // Memoize getNotes to ensure stable reference
  const getNotes = useCallback(async () => {
    console.log('Fetching notes...');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': AUTH_TOKEN,
      },
    });
    const responseJson = await response.json();
    setNotes(responseJson.data); // Store fetched notes in state
  }, [AUTH_TOKEN]); // Ensure stable function reference

  const addNote = useCallback(
    async (title: string, description: string, tag: string) => {
      console.log('Adding a note:', title, description, tag);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': AUTH_TOKEN,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const responseJson = await response.json();
      const newNote = {
        _id: responseJson.data._id,
        title,
        description,
        tag,
        createdDate: responseJson.data.createdDate,
      };

      setNotes((prevNotes) => [...prevNotes, newNote]);
    },
    [AUTH_TOKEN], // Ensure stable function reference
  );

  const deleteNote = useCallback(
    async (id: string) => {
      console.log('Deleting a note with id:', id);

      await fetch(`${process.env.REACT_APP_API_URL}/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': AUTH_TOKEN,
        },
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    },
    [AUTH_TOKEN], // Stable function reference
  );

  const editNote = useCallback(
    async (id: string, title: string, description: string, tag: string) => {
      console.log('Editing a note with id:', id);

      await fetch(`${process.env.REACT_APP_API_URL}/notes/updatenote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': AUTH_TOKEN,
        },
        body: JSON.stringify({ id, title, description, tag }),
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? { ...note, title, description, tag } : note)),
      );
    },
    [AUTH_TOKEN], // Stable function reference
  );

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
