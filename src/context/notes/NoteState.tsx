import React, { ReactNode, useState } from 'react';
import { NoteContext } from './NoteContext';

export const NoteState: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiResponse = {
    "statusCode": 200,
    "message": "Notes fetched successfully.",
    "data": [
        {
            "_id": "66169346742da3b9e22db1ec",
            "user": "661692fb742da3b9e22db1e4",
            "title": "Computer",
            "tag": "digital",
            "description": "This is my computer note",
            "createdDate": "2024-04-10T13:25:26.698Z",
            "__v": 0
        },
        {
            "_id": "66169356742da3b9e22db1ef",
            "user": "661692fb742da3b9e22db1e4",
            "title": "School",
            "tag": "Student",
            "description": "This is my school note",
            "createdDate": "2024-04-10T13:25:42.647Z",
            "__v": 0
        },
        {
            "_id": "66169363742da3b9e22db1f2",
            "user": "661692fb742da3b9e22db1e4",
            "title": "Office",
            "tag": "Employee",
            "description": "This is my office note",
            "createdDate": "2024-04-10T13:25:55.102Z",
            "__v": 0
        },
        {
            "_id": "66169370742da3b9e22db1f5",
            "user": "661692fb742da3b9e22db1e4",
            "title": "Home",
            "tag": "Market",
            "description": "This is my home note",
            "createdDate": "2024-04-10T13:26:08.908Z",
            "__v": 0
        }
    ]
  }
  
  const [notes, setNotes] = useState(apiResponse.data);

  const addNote = () => {

  }

  const deleteNote = () => {
    
  }

  const editNode = () => {

  }

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};
