import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from '../Navbar';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [previousFeedbacks, setPreviousFeedbacks] = useState([]);
  // Fetch previous feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('https://healu-backend.onrender.com/api/feedback');
        if (response.ok) {
          const data = await response.json();
          setPreviousFeedbacks(data);
        }
      } catch (error) {
        console.error('Error fetching previous feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, [submitted]); // Re-fetch after new feedback is submitted

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
    <>
      <Navbar />
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
        <h3>Previous Feedback</h3>
        <div className="previous-feedbacks">
          {previousFeedbacks.map((fb, index) => (
            <div key={index} className="feedback-card" style={{ background: `linear-gradient(to right, #4e54c8, #8f94fb)` }}>
              <p>{fb.message}</p>
              <span className="feedback-date">{new Date(fb.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feedback;
