export const LOADING_MESSAGES = {
  FEEDBACK: {
    FETCHING: "Fetching feedback messages...",
    SUBMITTING: "Submitting your feedback...",
    SUCCESS: "Feedback submitted successfully!",
    ERROR: "Something went wrong. Please try again.",
  },
  DEFAULT: "Loading...",
};

export const getRandomLoadingMessage = (type) => {
  const messages = {
    FETCHING: [
      "Gathering feedback from our community...",
      "Loading valuable insights...",
      "Retrieving feedback messages...",
    ],
    SUBMITTING: [
      "Sending your feedback...",
      "Sharing your thoughts with us...",
      "Processing your feedback...",
    ],
  };

  const typeMessages = messages[type] || [LOADING_MESSAGES.DEFAULT];
  return typeMessages[Math.floor(Math.random() * typeMessages.length)];
};
