import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      document.title = "eNotebook - About";
    } else {
      document.title = "eNotebook - Login";
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <h2>About</h2>
      <p>About Tile</p>
      <p>About Description</p>
    </div>
  )
}
