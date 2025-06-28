const FeedbackMessage = ({ message }) => {
	if (!message) {
		return null;
	}

	return (
		<div className='fixed bottom-6 right-6 bg-gray-800/90 backdrop-blur-lg border border-gray-700 rounded-lg px-4 py-3 text-white shadow-lg animate-in slide-in-from-bottom-2 duration-300'>
			{message}
		</div>
	);
};

export default FeedbackMessage;
