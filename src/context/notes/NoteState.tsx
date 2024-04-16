import React, { ReactNode, useState } from 'react';
import { NoteContext } from './NoteContext';

export const NoteState: React.FC<{ children: ReactNode }> = ({ children }) => {
  const AUTHTOKEN = process.env.REACT_APP_AUTH_TOKEN || '';
  const [notes, setNotes] = useState<any[]>([]);

  const getNotes = async () => {
    console.log('Fetching notes...');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': AUTHTOKEN
      }
    });
    const responseJson = await response.json();
    setNotes(responseJson.data);
  }

  const addNote = async (title: string, description: string, tag: string) => {
    console.log('Adding a note:', title, description, tag);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': AUTHTOKEN
      },
      body: JSON.stringify({ 'title': title, 'description': description, 'tag': tag })
    });

    const responseJson = await response.json();
    console.log(responseJson);
    const newNote = {
      '_id': responseJson.data._id,
      'title': title,
      'description': description,
      'tag': tag,
      'createdDate': responseJson.data.createdDate
    };
    setNotes([...notes, newNote]);
  }

  const deleteNote = async (id: string) => {
    console.log('Deleting a note with id:', id);
    await fetch(`${process.env.REACT_APP_API_URL}/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': AUTHTOKEN
      }
    });

    setNotes(notes.filter((note) => note._id !== id));
  }

  const editNote = async (id: string, title: string, description: string, tag: string) => {
    console.log('Editing a note with id:', id);

    await fetch(`${process.env.REACT_APP_API_URL}/notes/updatenote`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': AUTHTOKEN
      },
      body: JSON.stringify({ 'id': id,  'title': title, 'description': description, 'tag': tag })
    });

    setNotes(notes.map((note) => note._id === id ? { ...note, title, description, tag } : note));
  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {children}
    </NoteContext.Provider>
  );
};
