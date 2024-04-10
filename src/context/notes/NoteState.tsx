import React, { ReactNode, useEffect, useState } from 'react';
import { NoteContext } from './NoteContext';

export const NoteState: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Set title and description after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitle('Title');
      setDescription('Description');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Set title and description after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitle('New Title');
      setDescription('New Description');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NoteContext.Provider value={{ title, description }}>
      {children}
    </NoteContext.Provider>
  );
};
