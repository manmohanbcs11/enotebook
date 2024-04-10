import { createContext } from 'react';

interface NoteContextType {
  title: string;
  description: string;
}

export const NoteContext = createContext<NoteContextType>({
  title: '',
  description: ''
});
