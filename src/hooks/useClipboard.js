import { useCallback } from 'react';

/**
 * Custom hook for clipboard operations
 */
const useClipboard = (showFeedback) => {
	/**
	 * Copy text to clipboard with fallback for older browsers
	 * @param {string} text - Text to copy to clipboard
	 */
	const copyToClipboard = useCallback(
		async (text) => {
			try {
				// Modern clipboard API (preferred method)
				if (navigator.clipboard && navigator.clipboard.writeText) {
					await navigator.clipboard.writeText(text);
					showFeedback(`Copied: ${text}`);
				} else {
					// Fallback method for older browsers
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
