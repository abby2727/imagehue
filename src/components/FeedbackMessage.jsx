import React from 'react';

/**
 * FeedbackMessage Component
 * Displays floating feedback messages to the user
 */
const FeedbackMessage = ({ message }) => {
	if (!message) {
		return null;
	}

	return (
		<div className='fixed bottom-6 right-6 bg-white/20 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white shadow-lg animate-in slide-in-from-bottom-2 duration-300'>
			{message}
		</div>
	);
};

export default FeedbackMessage;
