import React, { ReactNode, useState } from 'react';
import { NoteContext } from './NoteContext';

export const NoteState: React.FC<{ children: ReactNode }> = ({ children }) => {
  const API_URL = "http://localhost:5000/api/notes";
  const AUTHTOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxNjkyZmI3NDJkYTNiOWUyMmRiMWU0Iiwicm9sZSI6IlVTRVIifSwiaWF0IjoxNzEyODQ1MzU4fQ.YcafedptrZ8QkC-nGuw78VU4qbRqUTcvknSntyWGBoI";
  const [notes, setNotes] = useState<any[]>([]);

  const getNotes = async () => {
    console.log('Fetching notes...');
    const response = await fetch(`${API_URL}/fetchnotes`, {
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

    const response = await fetch(`${API_URL}/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': AUTHTOKEN
      },
      body: JSON.stringify({ 'title': title, 'description': description, 'tag': tag })
    });

    const responseJson = await response.json();
    const newNote = {
      '_id': responseJson.data._id,
      'title': title,
      'description': description,
      'tag': tag
    };
    setNotes([...notes, newNote]);
  }

  const deleteNote = async (id: string) => {
    console.log('Deleting a note with id:', id);
    const response = await fetch(`${API_URL}/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': AUTHTOKEN
      }
    });

    // const responseJson = response.json();
    setNotes(notes.filter((note) => note._id !== id));
  }

  const editNote = async (id: string, title: string, description: string, tag: string) => {
    console.log('Editing a note with id:', id);

    const response = await fetch(`${API_URL}/updatenote`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': AUTHTOKEN
      },
      body: JSON.stringify({ 'id': id,  'title': title, 'description': description, 'tag': tag })
    });

    // const responseJson = response.json();
    setNotes(notes.map((note) => note._id === id ? { ...note, title, description, tag } : note));
  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {children}
    </NoteContext.Provider>
  );
};
