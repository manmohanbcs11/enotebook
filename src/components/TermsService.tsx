import '../css/TermService.css';
import Footer from './Footer';

export const TermsService = () => {
  return (
    <div>
      <div className="container justify-content-center flex-column">
        <h2>Terms of Service</h2>
        <p>Welcome to FlexiTool. By using our website or services, you agree to comply with and be bound by the following terms and conditions.</p>

        <h3>1. Acceptance of Terms</h3>
        <p>By accessing or using our services, you agree to these terms. If you do not agree, please do not use our services.</p>

        <h3>2. User Obligations</h3>
        <p>As a user, you agree to use our services in a manner consistent with all applicable laws and regulations. You must not engage in any illegal or unauthorized activities.</p>

        <h3>3. Intellectual Property</h3>
        <p>All content on this website, including text, images, logos, and code, is the property of FlexiTool or its licensors. Unauthorized use of this content is prohibited.</p>

        <h3>4. Limitation of Liability</h3>
        <p>FlexiTool shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use our services.</p>

        <h3>5. Changes to Terms</h3>
        <p>We reserve the right to modify these terms at any time. It is your responsibility to review these terms periodically. Continued use of our services after modifications indicates acceptance of the new terms.</p>

        <p>By using our services, you acknowledge that you have read and understood these terms and agree to be bound by them.</p>
      </div>
      <Footer />
    </div>
  );
}
