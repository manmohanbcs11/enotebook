import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { About } from './components/About';
import { Home } from './components/Home';
import { NavBar } from './components/NavBar';
import { NoteState } from './context/notes/NoteState';


const App: React.FC = () => {

  return (
    <NoteState>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
    </NoteState>
  );
}

export default App;