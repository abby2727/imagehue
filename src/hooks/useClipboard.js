import { useCallback } from 'react';

const useClipboard = (showFeedback) => {
	const copyToClipboard = useCallback(
		async (text) => {
			try {
				if (navigator.clipboard && navigator.clipboard.writeText) {
					await navigator.clipboard.writeText(text);
					showFeedback(`Copied: ${text}`);
				} else {
					const textArea = document.createElement('textarea');
					textArea.value = text;
					textArea.style.position = 'fixed';
					textArea.style.left = '-999999px';
					textArea.style.top = '-999999px';
					document.body.appendChild(textArea);
					textArea.focus();
					textArea.select();

					if (document.execCommand('copy')) {
						showFeedback(`Copied: ${text}`);
					} else {
						showFeedback('Copy failed. Please copy manually.');
					}

					document.body.removeChild(textArea);
				}
			} catch (err) {
				console.error('Failed to copy text: ', err);
				showFeedback('Copy failed. Please try again.');
			}
		},
		[showFeedback]
	);

	return {
		copyToClipboard
	};
};

export default useClipboard;
