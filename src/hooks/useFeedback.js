import { useState, useCallback } from 'react';

const useFeedback = () => {
	const [feedback, setFeedback] = useState('');

	const showFeedback = useCallback((message, duration = 2000) => {
		setFeedback(message);
		setTimeout(() => setFeedback(''), duration);
	}, []);

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
