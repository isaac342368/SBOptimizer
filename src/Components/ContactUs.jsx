import React, { useState, useEffect } from 'react';
import Footer from './footer';
import Header from "../Header";
import { gapi } from 'gapi-script';
import "../ContactUs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../MoneyLinePage.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        // Your actual API key and client ID should be used here, and should be secured
        apiKey: "AIzaSyCVO0bJ872q1G9QQJNzEKkMhBApNj00Rjk",
        clientId: "902640214511-d6hv2ad5guhpohm0rajidkvaej53g3oj.apps.googleusercontent.com",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
        scope: "https://www.googleapis.com/auth/gmail.send"
      }).then(() => {
        // Handle the initial sign-in state
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        updateSigninStatus(isSignedIn);
      });
    };

    // Load the Google API client library
    gapi.load('client:auth2', initClient);
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    // If the user isn't signed in, you may want to prompt them to sign in here
    if (!isSignedIn) {
       gapi.auth2.getAuthInstance().signIn();
    }
  };

  const sendEmail = () => {
    // Ensure the client is loaded and sign-in is complete before calling this method.
    if (!gapi.client) {
      console.error('Client not loaded, make sure you have initialized the client.');
      return;
    }

    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      console.error('You must be signed in to send an email.');
      return;
    }

    // Construct email RFC 5322 formatted message.
    const encodedEmail = btoa(
      `From: "Me" <me@example.com>\r\n` +
      `To: ${formData.email}\r\n` +
      `Subject: ${formData.subject}\r\n\r\n` +
      `${formData.message}`
    ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const request = gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': encodedEmail
      }
    });

    request.execute(response => {
      if (response.error) {
        console.error(response.error.message);
        alert('Error sending email: ' + response.error.message);
      } else {
        alert('Email sent successfully');
        setFormData({
          email: '',
          subject: '',
          message: ''
        });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  return (
    <div>
      <Header />
      <div className="contact-page-container">
        <div className="contact-container">
          <div className="card">
            <h1>Contact Us</h1>
            <p>Have any suggestions? Feel free to reach out!</p>
          </div>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="input-field"
                placeholder="Your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="input-field"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                className="text-area-field"
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ContactUs;
