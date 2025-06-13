import { useState, useCallback } from 'react';

/**
 * Custom hook for managing user feedback messages
 */
const useFeedback = () => {
	const [feedback, setFeedback] = useState('');

	/**
	 * Show temporary feedback message to user
	 * @param {string} message - Message to display
	 * @param {number} duration - Duration in milliseconds (default: 2000)
	 */
	const showFeedback = useCallback((message, duration = 2000) => {
		setFeedback(message);
		setTimeout(() => setFeedback(''), duration);
	}, []);

	/**
	 * Clear feedback message immediately
	 */
	const clearFeedback = useCallback(() => {
		setFeedback('');
	}, []);

	return {
		feedback,
		showFeedback,
		clearFeedback
	};
};

export default useFeedback;
