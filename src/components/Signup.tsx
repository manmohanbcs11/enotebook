import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';
import Footer from './Footer';

interface SignupProps {
  showAlert: (type: string, message: string) => void;
}

export const Signup: React.FC<SignupProps> = ({ showAlert }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "eNotepad - Signup";
  }, []); // Empty dependency array to avoid continuous re-rendering

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload

    const { name, email, password, cpassword } = formData;

    if (password !== cpassword) {
      showAlert('danger', 'Passwords do not match!');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const responseJson = await response.json();
        localStorage.setItem('token', responseJson.data.authToken); // Store auth token
        navigate('/'); // Navigate to home page
        showAlert('success', 'Registered successfully!');
      } else {
        const errorData = await response.json();
        showAlert('danger', errorData.message); // Show error message
      }
    } catch (error) {
      showAlert('danger', 'An error occurred during signup.');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="signup-container">
        <h2>Signup for eNotepad</h2> {/* Improved heading */}
        <form className="signup-form my-4" onSubmit={handleOnSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              minLength={3}
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              minLength={6}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="form-group">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              id="cpassword"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
