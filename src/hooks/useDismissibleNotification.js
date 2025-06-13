import { useState, useEffect } from 'react';

/**
 * Custom hook for managing dismissible notifications with persistence
 * @param {string} key - Unique key for localStorage
 * @param {number} resetAfterDays - Number of days after which to show the notification again
 * @returns {object} - { isVisible, dismiss }
 */
const useDismissibleNotification = (key, resetAfterDays = 1) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const storedData = localStorage.getItem(key);

		if (storedData) {
			try {
				const { dismissedAt } = JSON.parse(storedData);
				const now = new Date().getTime();
				const daysPassed = (now - dismissedAt) / (1000 * 60 * 60 * 24);

				// If less than resetAfterDays have passed, keep it dismissed
				if (daysPassed < resetAfterDays) {
					setIsVisible(false);
				} else {
					// Reset - remove old data and show notification again
					localStorage.removeItem(key);
					setIsVisible(true);
				}
			} catch (error) {
				// Invalid data, remove it and show notification
				localStorage.removeItem(key);
				setIsVisible(true);
			}
		}
	}, [key, resetAfterDays]);

	const dismiss = () => {
		const dismissData = {
			dismissedAt: new Date().getTime()
		};
		localStorage.setItem(key, JSON.stringify(dismissData));
		setIsVisible(false);
	};

	return { isVisible, dismiss };
};

export default useDismissibleNotification;
