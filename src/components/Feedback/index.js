import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Feedback = () => {
  // Initialize previousFeedbacks with default feedbacks
  const [previousFeedbacks, setPreviousFeedbacks] = useState([]);
  
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const feedbackPerPage = 4;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('https://healu-backend.onrender.com/api/feedback');
        if (response.ok) {
          const data = await response.json();
          // Append fetched feedbacks to the existing previousFeedbacks
          setPreviousFeedbacks(prevFeedbacks => [...prevFeedbacks, ...data]);
        }
      } catch (error) {
        console.error('Error fetching previous feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, [submitted]);

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

  const totalPages = Math.ceil(previousFeedbacks.length / feedbackPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedFeedbacks = previousFeedbacks.slice(currentPage * feedbackPerPage, (currentPage + 1) * feedbackPerPage);

  return (
    <>
      <Navbar />
      <div className="feedback-container">
        <div className='inputs-container'>
          <div className='input-feedback-container'>
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
                  rows="15"
                  className="feedback-textarea"
                />
                <br />
                <button type="submit" className="btn-submit">Submit Feedback</button>
              </form>
            )}
          </div>

          <div className='input-feedback-description'>
            <h1 className='feedback-description'>Give us a Chance <span>to Improve</span></h1>
          </div>
        </div>

        <div className='recent-feedbacks'>
          <h3>Most Recent Feedbacks</h3>
          <div className="previous-feedbacks">
            {displayedFeedbacks.map((fb, index) => (
                <div key={index} className="feedback-card">
                    <p>{fb.message}</p>
                    <span className="feedback-date">{new Date(fb.createdAt).toLocaleDateString()}</span>
                </div>
            ))}
        </div>

          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 0}>&lt; Prev</button>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Next &gt;</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Feedback;
