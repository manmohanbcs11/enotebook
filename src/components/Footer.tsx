import { NavLink } from 'react-router-dom';
import '../css/Footer.css';

export default function Footer() {
  return (
    <footer className='footer-container'>
      <div className='footer-content'>
        <p>© 2024 eNotepad. All rights reserved.</p>
        <div className='footer-links'>
          <NavLink to='/aboutus'>About Us</NavLink>
          <NavLink to='/contact'>Contact Us</NavLink>
          <NavLink to='/terms'>Terms of Service</NavLink>
        </div>
      </div>
    </footer>
  );
}
