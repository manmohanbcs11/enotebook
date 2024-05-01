import '../css/Contact.css';
import Footer from './Footer';

export const ContactUs = () => {
  return (
    <div>
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! You can reach out to us via the following channels:</p>

        <div className="contact-methods">
          <div className="contact-item">
            <strong>Email:</strong> <a href="mailto:manmohanbcs11@gmail.com">manmohanbcs11@gmail.com</a>
          </div>
          <div className="contact-item">
            <strong>Twitter:</strong> <a href="https://twitter.com/abossmanam" target="_blank" rel="noopener noreferrer">@abossmanam</a>
          </div>
          <div className="contact-item">
            <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/manmohan-kumar-nitc" target="_blank" rel="noopener noreferrer">Manmohan Kumar</a>
          </div>
        </div>
        <p>Thanks for reaching out!</p>
      </div>
      <Footer />
    </div>
  );
}
