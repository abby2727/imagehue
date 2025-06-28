import { useState, useRef, useCallback, useEffect } from 'react';

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

	// Add default image in my public folder
	const defaultImageUrl = '/default-image.jpg';

	const rgbToHex = useCallback((r, g, b) => {
		const toHex = (n) => {
			const hex = n.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
	}, []);

	const drawImageOnCanvas = useCallback((img) => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d', { willReadFrequently: true });

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

	const handleCanvasMouseEnter = useCallback(() => {
		if (imageLoaded) {
			setIsHoveringCanvas(true);
			if (isCtrlPressed) {
				setShowMagnifier(true);
			}
		}
	}, [imageLoaded, isCtrlPressed]);

	const handleCanvasMouseLeave = useCallback(() => {
		setIsHoveringCanvas(false);
		setShowMagnifier(false);
	}, []);

	const handleKeyDown = useCallback(
		(event) => {
			if (event.key === 'Control') {
				setIsCtrlPressed(true);
				if (isHoveringCanvas && imageLoaded) {
					setShowMagnifier(true);
				}
			}
		},
		[isHoveringCanvas, imageLoaded]
	);

	const handleKeyUp = useCallback((event) => {
		if (event.key === 'Control') {
			setIsCtrlPressed(false);
			setShowMagnifier(false);
		}
	}, []);

	const handleCanvasClick = useCallback(
		(event) => {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d', { willReadFrequently: true });

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
			const ctx = canvas.getContext('2d', { willReadFrequently: true });
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}

		showFeedback('Application reset');
	}, [showFeedback]);

	const handleUploadClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	useEffect(() => {
		loadImage(defaultImageUrl);
	}, [loadImage, defaultImageUrl]);

	useEffect(() => {
		if (image && canvasRef.current) {
			const timer = setTimeout(() => {
				drawImageOnCanvas(image);
			}, 10);

			return () => clearTimeout(timer);
		}
	}, [image, drawImageOnCanvas, canvasRef.current]);

	useEffect(() => {
		document.addEventListener('paste', handlePaste);
		return () => {
			document.removeEventListener('paste', handlePaste);
		};
	}, [handlePaste]);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleKeyDown, handleKeyUp]);

	return {
		image,
		selectedColor,
		isLoading,
		imageLoaded,
		showMagnifier,
		mousePosition,
		canvasRef,
		fileInputRef,
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
