import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  LOADING_MESSAGES,
  getRandomLoadingMessage,
} from "../../utils/loadingMessages";
import "./index.css";

const Feedback = () => {
  const [previousFeedbacks, setPreviousFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    LOADING_MESSAGES.DEFAULT
  );
  const [tipIndex, setTipIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const feedbackPerPage = 3;

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setTipIndex((prev) => (prev + 1) % 3);
        setLoadingMessage(
          getRandomLoadingMessage(loading ? "FETCHING" : "SUBMITTING")
        );
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    fetchFeedbacks();
  }, [submitted]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    setLoadingMessage(getRandomLoadingMessage("FETCHING"));
    try {
      const response = await fetch(
        "https://healu-backend.onrender.com/api/feedback"
      );
      if (response.ok) {
        const data = await response.json();
        setPreviousFeedbacks(data);
      }
    } catch (error) {
      console.error("Error fetching previous feedbacks:", error);
      setLoadingMessage(LOADING_MESSAGES.FEEDBACK.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage(getRandomLoadingMessage("SUBMITTING"));
    try {
      const response = await fetch(
        "https://healu-backend.onrender.com/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: feedback }),
        }
      );

      if (response.ok) {
        setFeedback("");
        setSubmitted(true);
        setLoadingMessage(LOADING_MESSAGES.FEEDBACK.SUCCESS);
      } else {
        setLoadingMessage(LOADING_MESSAGES.FEEDBACK.ERROR);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setLoadingMessage(LOADING_MESSAGES.FEEDBACK.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (index) => {
    const updatedFeedbacks = [...previousFeedbacks];
    updatedFeedbacks[index].isOpen = !updatedFeedbacks[index].isOpen;
    setPreviousFeedbacks(updatedFeedbacks);
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

  const displayedFeedbacks = previousFeedbacks.slice(
    currentPage * feedbackPerPage,
    (currentPage + 1) * feedbackPerPage
  );

  return (
    <>
      <Navbar />
      <div className="feedback-container">
        <div className="feedback-content">
          <motion.div
            className="feedback-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>
              Share Your <span>Feedback</span>
            </h1>
            <p>Help us improve your experience with HealU</p>
          </motion.div>

          <div className="feedback-grid">
            <motion.div
              className="feedback-form-container"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    className="loading-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TailSpin
                      height="40"
                      width="40"
                      color="#e91e63"
                      ariaLabel="loading-spinner"
                    />
                    <p className="loading-message" key={tipIndex}>
                      {loadingMessage}
                    </p>
                  </motion.div>
                ) : submitted ? (
                  <motion.div
                    className="feedback-thank-you"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <div className="thank-you-content">
                      <h3>Thank you for your feedback!</h3>
                      <p>Your input helps us improve our services.</p>
                      <motion.button
                        className="btn-submit"
                        onClick={() => setSubmitted(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Submit Another
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="feedback-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <textarea
                      value={feedback}
                      onChange={handleFeedbackChange}
                      placeholder="Share your thoughts, suggestions, or experiences with us..."
                      required
                      rows="8"
                      className="feedback-textarea"
                    />
                    <motion.button
                      type="submit"
                      className="btn-submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Feedback
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="recent-feedbacks"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2>Recent Feedback</h2>

              {loading ? (
                <div className="spinner-container">
                  <TailSpin
                    height="50"
                    width="50"
                    color="#e91e63"
                    ariaLabel="loading-spinner"
                  />
                  <p className="loading-message" key={tipIndex}>
                    {loadingMessage}
                  </p>
                </div>
              ) : displayedFeedbacks.length > 0 ? (
                <>
                  <div className="feedback-cards">
                    {displayedFeedbacks.map((fb, index) => (
                      <motion.div
                        key={index}
                        className="feedback-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <p>
                          {fb.isOpen
                            ? fb.message
                            : fb.message.length > 100
                              ? `${fb.message.slice(0, 100)}...`
                              : fb.message}
                        </p>
                        {fb.message.length > 100 && (
                          <button
                            className="read-more-btn"
                            onClick={() =>
                              handleReadMore(
                                index + currentPage * feedbackPerPage
                              )
                            }
                          >
                            {fb.isOpen ? "Read Less" : "Read More"}
                          </button>
                        )}
                        <div className="feedback-date">
                          {new Date(fb.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination">
                      <motion.button
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={currentPage === 0 ? "disabled" : ""}
                      >
                        &lt; Previous
                      </motion.button>
                      <span className="page-indicator">
                        {currentPage + 1} of {totalPages}
                      </span>
                      <motion.button
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages - 1}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={
                          currentPage >= totalPages - 1 ? "disabled" : ""
                        }
                      >
                        Next &gt;
                      </motion.button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-feedback">
                  <p>
                    No feedback available yet. Be the first to share your
                    thoughts!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Feedback;
