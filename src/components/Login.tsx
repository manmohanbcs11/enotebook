import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

interface LoginProps {
  showAlert: (type: string, message: string) => void;
}

export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "eNotebook - Login";
  }, []); // Adding empty dependency array to avoid continuous re-rendering

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const responseJson = await response.json();
        localStorage.setItem('token', responseJson.data.authToken); // Store token
        navigate('/'); // Navigate to home
        props.showAlert('success', 'Logged in successfully!');
      } else {
        const errorData = await response.json();
        props.showAlert('danger', errorData.message); // Show error message
      }
    } catch (error) {
      props.showAlert('danger', 'An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to eNotebook</h2> {/* Improved heading */}
      <form className="login-form my-4" onSubmit={handleOnSubmit}>
        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};
