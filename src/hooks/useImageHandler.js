import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for handling image loading, canvas drawing, and color picking
 */
const useImageHandler = (showFeedback) => {
	const [image, setImage] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [showMagnifier, setShowMagnifier] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isCtrlPressed, setIsCtrlPressed] = useState(false);
	const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

	const canvasRef = useRef(null);
	const fileInputRef = useRef(null);

	const defaultImageUrl =
		'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop&auto=format&q=80';

	/**
	 * Convert RGB values to hexadecimal color code
	 */
	const rgbToHex = useCallback((r, g, b) => {
		const toHex = (n) => {
			const hex = n.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
	}, []);

	/**
	 * Draw image on canvas with proper scaling and centering
	 */
	const drawImageOnCanvas = useCallback((img) => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		if (!canvas || !ctx || !img) return;

		const maxWidth = 800;
		const maxHeight = 600;

		let { width, height } = img;

		if (width > maxWidth || height > maxHeight) {
			const aspectRatio = width / height;
			if (width > height) {
				width = maxWidth;
				height = maxWidth / aspectRatio;
			} else {
				height = maxHeight;
				width = maxHeight * aspectRatio;
			}
		}

		canvas.width = width;
		canvas.height = height;
		canvas.style.maxWidth = '100%';
		canvas.style.height = 'auto';

		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(img, 0, 0, width, height);

		setImageLoaded(true);
	}, []);

	/**
	 * Load image from various sources
	 */
	const loadImage = useCallback(
		(source) => {
			setIsLoading(true);
			setImageLoaded(false);
			setSelectedColor(null);

			const img = new Image();

			img.onload = () => {
				setImage(img);
				drawImageOnCanvas(img);
				setIsLoading(false);
				showFeedback('Image loaded successfully!');
			};

			img.onerror = () => {
				setIsLoading(false);
				showFeedback('Failed to load image. Please try another image.');
			};

			if (typeof source === 'string') {
				img.crossOrigin = 'anonymous';
				img.src = source;
			} else if (source instanceof File) {
				const reader = new FileReader();
				reader.onload = (e) => {
					img.src = e.target.result;
				};
				reader.readAsDataURL(source);
			}
		},
		[drawImageOnCanvas, showFeedback]
	);

	/**
	 * Handle file upload from input element
	 */
	const handleFileUpload = useCallback(
		(event) => {
			const file = event.target.files[0];
			if (file && file.type.startsWith('image/')) {
				loadImage(file);
			} else {
				showFeedback('Please select a valid image file.');
			}
			event.target.value = '';
		},
		[loadImage, showFeedback]
	);

	/**
	 * Handle paste event for pasting images from clipboard
	 */
	const handlePaste = useCallback(
		(event) => {
			const items = event.clipboardData?.items;
			if (!items) return;

			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (item.type.startsWith('image/')) {
					const file = item.getAsFile();
					if (file) {
						loadImage(file);
						showFeedback('Image pasted successfully!');
					}
					break;
				}
			}
		},
		[loadImage, showFeedback]
	);

	/**
	 * Handle direct clipboard paste when button is clicked
	 */
	const handleClipboardPaste = useCallback(async () => {
		try {
			if (!navigator.clipboard || !navigator.clipboard.read) {
				showFeedback(
					'Clipboard API not supported. Please use Ctrl+V (Cmd+V on Mac) instead.',
					3000
				);
				return;
			}

			const clipboardItems = await navigator.clipboard.read();
			let imageFound = false;

			for (const clipboardItem of clipboardItems) {
				for (const type of clipboardItem.types) {
					if (type.startsWith('image/')) {
						const blob = await clipboardItem.getType(type);
						const file = new File(
							[blob],
							'pasted-image.' + type.split('/')[1],
							{ type }
						);
						loadImage(file);
						showFeedback('Image pasted from clipboard!');
						imageFound = true;
						break;
					}
				}
				if (imageFound) break;
			}

			if (!imageFound) {
				showFeedback(
					'No image found in clipboard. Copy an image first, then try again.',
					3000
				);
			}
		} catch (error) {
			console.error('Clipboard paste error:', error);

			if (error.name === 'NotAllowedError') {
				showFeedback(
					'Clipboard access denied. Please use Ctrl+V (Cmd+V on Mac) instead.',
					3000
				);
			} else if (error.name === 'NotFoundError') {
				showFeedback(
					'No image found in clipboard. Copy an image first, then try again.',
					3000
				);
			} else {
				showFeedback(
					'Failed to paste from clipboard. Please use Ctrl+V (Cmd+V on Mac) instead.',
					3000
				);
			}
		}
	}, [loadImage, showFeedback]);

	/**
	 * Handle mouse move over canvas for magnifying glass
	 */
	const handleCanvasMouseMove = useCallback(
		(event) => {
			if (!imageLoaded) return;

			setMousePosition({
				x: event.clientX,
				y: event.clientY
			});
		},
		[imageLoaded]
	);

	/**
	 * Handle mouse enter canvas
	 */
	const handleCanvasMouseEnter = useCallback(() => {
		if (imageLoaded) {
			setIsHoveringCanvas(true);
			// Only show magnifier if Ctrl is also pressed
			if (isCtrlPressed) {
				setShowMagnifier(true);
			}
		}
	}, [imageLoaded, isCtrlPressed]);

	/**
	 * Handle mouse leave canvas
	 */
	const handleCanvasMouseLeave = useCallback(() => {
		setIsHoveringCanvas(false);
		setShowMagnifier(false);
	}, []);

	/**
	 * Handle keydown events for Ctrl key
	 */
	const handleKeyDown = useCallback(
		(event) => {
			if (event.key === 'Control') {
				setIsCtrlPressed(true);
				// Show magnifier if also hovering over canvas
				if (isHoveringCanvas && imageLoaded) {
					setShowMagnifier(true);
				}
			}
		},
		[isHoveringCanvas, imageLoaded]
	);

	/**
	 * Handle keyup events for Ctrl key
	 */
	const handleKeyUp = useCallback((event) => {
		if (event.key === 'Control') {
			setIsCtrlPressed(false);
			setShowMagnifier(false);
		}
	}, []);

	/**
	 * Handle canvas click to pick color from image
	 */
	const handleCanvasClick = useCallback(
		(event) => {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');

			if (!canvas || !ctx || !imageLoaded) return;

			const rect = canvas.getBoundingClientRect();
			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;

			const x = Math.floor((event.clientX - rect.left) * scaleX);
			const y = Math.floor((event.clientY - rect.top) * scaleY);

			try {
				const imageData = ctx.getImageData(x, y, 1, 1);
				const [r, g, b, a] = imageData.data;

				if (a > 0) {
					const hex = rgbToHex(r, g, b);
					const rgb = `rgb(${r}, ${g}, ${b})`;

					setSelectedColor({
						hex,
						rgb,
						r,
						g,
						b,
						position: { x, y }
					});

					showFeedback(`Color picked: ${hex}`);
				}
			} catch (error) {
				console.error('Error picking color:', error);
				showFeedback('Failed to pick color. Please try again.');
			}
		},
		[imageLoaded, rgbToHex, showFeedback]
	);

	/**
	 * Reset application to initial state
	 */
	const resetApp = useCallback(() => {
		setImage(null);
		setSelectedColor(null);
		setImageLoaded(false);
		setShowMagnifier(false);
		setMousePosition({ x: 0, y: 0 });
		setIsCtrlPressed(false);
		setIsHoveringCanvas(false);

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}

		showFeedback('Application reset');
	}, [showFeedback]);

	/**
	 * Trigger file input click
	 */
	const handleUploadClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	// Load default image on mount
	useEffect(() => {
		loadImage(defaultImageUrl);
	}, [loadImage, defaultImageUrl]);

	// Add global paste event listener
	useEffect(() => {
		document.addEventListener('paste', handlePaste);
		return () => {
			document.removeEventListener('paste', handlePaste);
		};
	}, [handlePaste]);

	// Add global keyboard event listeners for Ctrl key
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		// Clean up Ctrl state when component unmounts
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleKeyDown, handleKeyUp]);

	return {
		// State
		image,
		selectedColor,
		isLoading,
		imageLoaded,
		showMagnifier,
		mousePosition,
		// Refs
		canvasRef,
		fileInputRef,
		// Handlers
		handleCanvasClick,
		handleCanvasMouseMove,
		handleCanvasMouseEnter,
		handleCanvasMouseLeave,
		handleUploadClick,
		handleFileUpload,
		handleClipboardPaste,
		resetApp
	};
};

export default useImageHandler;
