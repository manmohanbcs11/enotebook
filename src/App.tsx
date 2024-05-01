import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AboutUs } from './components/AboutUs';
import { Alert } from './components/Alert';
import { ContactUs } from './components/ContactUs';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { NavBar } from './components/NavBar';
import { Signup } from './components/Signup';
import { TermsService } from './components/TermsService';
import { NoteState } from './context/notes/NoteState';

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
    }, 2000);
  };

  return (
    <NoteState>
      <Router>
        <NavBar />
        <Alert alert={alert} />
        <div>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms" element={<TermsService />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;