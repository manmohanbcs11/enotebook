import { createContext } from 'react';

interface NoteContextType {
  notes: any[];
  setNotes: (notes: any[]) => void;
}

export const NoteContext = createContext<NoteContextType>({
  notes: [],
  setNotes: () => {},
});
