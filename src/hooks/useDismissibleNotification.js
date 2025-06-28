import { useState, useEffect } from 'react';

const useDismissibleNotification = (key, resetAfterDays = 1) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const storedData = localStorage.getItem(key);

		if (storedData) {
			try {
				const { dismissedAt } = JSON.parse(storedData);
				const now = new Date().getTime();
				const daysPassed = (now - dismissedAt) / (1000 * 60 * 60 * 24);

				// If the notification was dismissed less than resetAfterDays ago, hide it
				if (daysPassed < resetAfterDays) {
					setIsVisible(false);
				} else {
					localStorage.removeItem(key);
					setIsVisible(true);
				}
			} catch (error) {
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
