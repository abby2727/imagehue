import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect
} from 'react';

const AppContext = createContext();

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};

export const AppProvider = ({ children }) => {
	const [imagePickerState, setImagePickerState] = useState({
		image: null,
		selectedColor: null,
		isLoading: false,
		imageLoaded: false,
		showMagnifier: false,
		mousePosition: { x: 0, y: 0 },
		isCtrlPressed: false,
		isHoveringCanvas: false
	});

	const [visualPickerState, setVisualPickerState] = useState({
		colorValue: '#ff0000',
		selectedColor: null
	});

	const [feedback, setFeedback] = useState(null);

	// Update image picker state
	const updateImagePickerState = useCallback((updates) => {
		setImagePickerState((prev) => ({ ...prev, ...updates }));
	}, []);

	const updateVisualPickerState = useCallback((updates) => {
		setVisualPickerState((prev) => ({ ...prev, ...updates }));
	}, []);

	const generateVisualSelectedColor = useCallback((hexColor) => {
		const hexToRgb = (hex) => {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
				hex
			);
			return result
				? {
						r: parseInt(result[1], 16),
						g: parseInt(result[2], 16),
						b: parseInt(result[3], 16)
				  }
				: null;
		};

		const rgb = hexToRgb(hexColor);
		if (!rgb) return null;

		return {
			hex: hexColor.toUpperCase(),
			rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
			r: rgb.r,
			g: rgb.g,
			b: rgb.b,
			position: { x: -1, y: -1 }
		};
	}, []);

	const updateVisualPickerColor = useCallback(
		(colorValue) => {
			const selectedColor = generateVisualSelectedColor(colorValue);
			setVisualPickerState({
				colorValue,
				selectedColor
			});
		},
		[generateVisualSelectedColor]
	);

	useEffect(() => {
		if (!visualPickerState.selectedColor) {
			const selectedColor = generateVisualSelectedColor(
				visualPickerState.colorValue
			);
			setVisualPickerState((prev) => ({ ...prev, selectedColor }));
		}
	}, [
		visualPickerState.colorValue,
		visualPickerState.selectedColor,
		generateVisualSelectedColor
	]);

	const value = {
		imagePickerState,
		updateImagePickerState,

		visualPickerState,
		updateVisualPickerState,
		updateVisualPickerColor,

		feedback,
		setFeedback
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
