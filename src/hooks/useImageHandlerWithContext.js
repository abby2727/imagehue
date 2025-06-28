import { useRef, useCallback, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

const useImageHandlerWithContext = (showFeedback) => {
	const { imagePickerState, updateImagePickerState } = useAppContext();
	const canvasRef = useRef(null);
	const fileInputRef = useRef(null);

	const defaultImageUrl = '/default-image.jpg';

	const rgbToHex = useCallback((r, g, b) => {
		const toHex = (n) => {
			const hex = n.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
	}, []);

	const drawImageOnCanvas = useCallback(
		(img) => {
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

			updateImagePickerState({ imageLoaded: true });
		},
		[updateImagePickerState]
	);

	const loadImage = useCallback(
		(source) => {
			updateImagePickerState({
				isLoading: true,
				imageLoaded: false,
				selectedColor: null
			});

			const img = new Image();

			img.onload = () => {
				updateImagePickerState({ image: img, isLoading: false });
				drawImageOnCanvas(img);
				showFeedback('Image loaded successfully!');
			};

			img.onerror = () => {
				updateImagePickerState({ isLoading: false });
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
		[drawImageOnCanvas, showFeedback, updateImagePickerState]
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
			if (!imagePickerState.imageLoaded) return;

			updateImagePickerState({
				mousePosition: {
					x: event.clientX,
					y: event.clientY
				}
			});
		},
		[imagePickerState.imageLoaded, updateImagePickerState]
	);

	const handleCanvasMouseEnter = useCallback(() => {
		if (imagePickerState.imageLoaded) {
			updateImagePickerState({ isHoveringCanvas: true });
			if (imagePickerState.isCtrlPressed) {
				updateImagePickerState({ showMagnifier: true });
			}
		}
	}, [
		imagePickerState.imageLoaded,
		imagePickerState.isCtrlPressed,
		updateImagePickerState
	]);

	const handleCanvasMouseLeave = useCallback(() => {
		updateImagePickerState({
			isHoveringCanvas: false,
			showMagnifier: false
		});
	}, [updateImagePickerState]);

	const handleKeyDown = useCallback(
		(event) => {
			if (event.key === 'Control') {
				updateImagePickerState({ isCtrlPressed: true });
				if (
					imagePickerState.isHoveringCanvas &&
					imagePickerState.imageLoaded
				) {
					updateImagePickerState({ showMagnifier: true });
				}
			}
		},
		[
			imagePickerState.isHoveringCanvas,
			imagePickerState.imageLoaded,
			updateImagePickerState
		]
	);

	const handleKeyUp = useCallback(() => {
		updateImagePickerState({ isCtrlPressed: false, showMagnifier: false });
	}, [updateImagePickerState]);

	// Handle canvas click to pick color
	const handleCanvasClick = useCallback(
		(event) => {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d', { willReadFrequently: true });

			if (!canvas || !ctx || !imagePickerState.imageLoaded) return;

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

					const selectedColor = {
						hex,
						rgb,
						r,
						g,
						b,
						position: { x, y }
					};

					updateImagePickerState({ selectedColor });
					showFeedback(`Color picked: ${hex}`);
				}
			} catch (error) {
				console.error('Error picking color:', error);
				showFeedback('Failed to pick color. Please try again.');
			}
		},
		[
			imagePickerState.imageLoaded,
			rgbToHex,
			showFeedback,
			updateImagePickerState
		]
	);

	const resetApp = useCallback(() => {
		updateImagePickerState({
			image: null,
			selectedColor: null,
			imageLoaded: false,
			showMagnifier: false,
			mousePosition: { x: 0, y: 0 },
			isCtrlPressed: false,
			isHoveringCanvas: false
		});

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d', { willReadFrequently: true });
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}

		showFeedback('Application reset');
	}, [showFeedback, updateImagePickerState]);
	const handleUploadClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	// Load default image on mount if no image is loaded
	useEffect(() => {
		if (!imagePickerState.image && !imagePickerState.isLoading) {
			loadImage(defaultImageUrl);
		}
	}, [loadImage, imagePickerState.image, imagePickerState.isLoading]);

	useEffect(() => {
		if (imagePickerState.image && canvasRef.current) {
			const timer = setTimeout(() => {
				drawImageOnCanvas(imagePickerState.image);
			}, 10);

			return () => clearTimeout(timer);
		}
	}, [imagePickerState.image, drawImageOnCanvas]);

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
		selectedColor: imagePickerState.selectedColor,
		isLoading: imagePickerState.isLoading,
		imageLoaded: imagePickerState.imageLoaded,
		showMagnifier: imagePickerState.showMagnifier,
		mousePosition: imagePickerState.mousePosition,
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

export default useImageHandlerWithContext;
