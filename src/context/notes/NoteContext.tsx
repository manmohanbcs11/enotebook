import { createContext } from 'react';

interface NoteContextType {
  notes: any[];
  getNotes(): void;
  addNote: (title: string, description: string, tag: string) => void;
  deleteNote: (id: string) => void;
  editNote: (id: string, title: string, description: string, tag: string) => void;
}

export const NoteContext = createContext<NoteContextType>({
  notes: [],
  getNotes: () => { },
  addNote: () => { },
  deleteNote: () => { },
  editNote: () => { }
});
