import '../Styles/contact.css';

const Contact = () => (
  <div className="contact-container">
    <h1 className="contact-title">Get in Touch</h1>
    <p className="contact-subtitle">We’d love to hear from you! Reach us through any of the methods below.</p>

    <div className="contact-card">
      <div className="contact-item">
        <h3>📞 Phone</h3>
        <p>+91 7620290334</p>
      </div>
      <div className="contact-item">
        <h3>📧 Email</h3>
        <p>rupeshchandaniya3@gmail.com</p>
      </div>
      <div className="contact-item">
        <h3>📍 Address</h3>
        <p>Natthu Furniture Mart, New Overbridge , Ravidas Nagar, Kamptee, Maharashtra - 441002</p>
      </div>
      <div className="contact-item">
        <h3>🕒 Business Hours</h3>
        <p>Sat - Thu: 9:00 AM – 10:00 PM<br />Friday: Closed</p>
      </div>
    </div>
  </div>
);

export default Contact;
