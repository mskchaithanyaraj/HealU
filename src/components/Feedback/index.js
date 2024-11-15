import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import "./index.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { motion, AnimatePresence } from "framer-motion";

const Feedback = () => {
  const [previousFeedbacks, setPreviousFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const feedbackPerPage = 4;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://healu-backend.onrender.com/api/feedback"
        );
        if (response.ok) {
          const data = await response.json();
          // Add the isOpen property to each feedback
          const feedbacksWithOpenState = data.map((fb) => ({
            ...fb,
            isOpen: false, // default state for expanded feedback
          }));
          setPreviousFeedbacks(feedbacksWithOpenState);
        }
      } catch (error) {
        console.error("Error fetching previous feedbacks:", error);
      } finally {
        setLoading(false);
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
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: feedback }),
      });

      if (response.ok) {
        setFeedback("");
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
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
      <motion.div
        className="feedback-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inputs-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="input-feedback-container">
            <h2 className="feedback-title">Feedback</h2>
            <AnimatePresence>
              {submitted ? (
                <motion.p
                  className="feedback-thank-you"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  Thank you for your feedback!
                </motion.p>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="feedback-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Write your feedback here..."
                    required
                    rows="15"
                    className="feedback-textarea"
                  />
                  <br />
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
          </div>

          <div className="input-feedback-description">
            <h1 className="feedback-description">
              Give us a Chance <span>to Improve</span>
            </h1>
          </div>
        </motion.div>

        <motion.div
          className="recent-feedbacks"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Most Recent Feedbacks</h3>
          {loading ? (
            <div className="spinner-container">
              <TailSpin
                height="80"
                width="80"
                color="#ffffff"
                ariaLabel="loading-spinner"
              />
            </div>
          ) : (
            <motion.div
              className="previous-feedbacks"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {displayedFeedbacks.map((fb, index) => (
                <motion.div
                  key={index}
                  className={`feedback-card ${fb.isOpen ? "open" : ""}`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <p>{fb.isOpen ? fb.message : fb.message.substring(0, 100)}</p>
                  <span
                    className="feedback-date"
                    onClick={() => handleReadMore(index)}
                  >
                    {fb.isOpen ? "... read less" : "... read more"}
                  </span>
                  <span className="feedback-date">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
          <div className="pagination">
            <motion.button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              &lt; Prev
            </motion.button>
            <motion.button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next &gt;
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Feedback;
