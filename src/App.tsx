import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { About } from './components/About';
import { Home } from './components/Home';
import { NavBar } from './components/NavBar';
import { NoteState } from './context/notes/NoteState';
import { Alert } from './components/Alert';
import { useState } from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

const App: React.FC = () => {
  const [alert, setAlert] = useState<{ type: string; message: string }>({ type: '', message: '' });

  const showAlert = (type: string, message: string) => {
    setAlert({
      message: message,
      type: type
    });

    setTimeout(() => {
      setAlert({
        message: '',
        type: ''
      });
    }, 3000);
  };
  
  return (
    <NoteState>
      <Router>
        <NavBar />
        <Alert alert={alert} />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;