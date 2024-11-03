import React, { useState } from 'react';
import './index.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://healu-backend.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: feedback }),
      });
  
      if (response.ok) {
        setFeedback('');
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Feedback</h2>
      {submitted ? (
        <p className="feedback-thank-you">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here..."
            required
            rows="5"
            className="feedback-textarea"
          />
          <br />
          <button type="submit" className="feedback-submit-button">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
