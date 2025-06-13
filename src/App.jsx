import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
	Upload,
	Clipboard,
	Copy,
	Download,
	RotateCcw,
	Palette
} from 'lucide-react';

/**
 * PixelPick - Main Application Component
 * A React-based color picker tool that allows users to upload or paste images
 * and extract color values (Hex and RGB) by clicking on pixels
 */
const App = () => {
	// State management for application data
	const [image, setImage] = useState(null); // Current loaded image
	const [selectedColor, setSelectedColor] = useState(null); // Currently selected color
	const [isLoading, setIsLoading] = useState(false); // Loading state for image processing
	const [feedback, setFeedback] = useState(''); // User feedback messages
	const [imageLoaded, setImageLoaded] = useState(false); // Track if image is loaded on canvas

	// Refs for DOM elements
	const canvasRef = useRef(null); // Canvas element for image display and color picking
	const fileInputRef = useRef(null); // Hidden file input for image upload
	const imageRef = useRef(null); // Image element for loading

	/**
	 * Default image URL - a colorful sample image for demonstration
	 * Using a reliable source that provides a vibrant image for color picking
	 */
	const defaultImageUrl =
		'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop&auto=format&q=80';

	/**
	 * Show temporary feedback message to user
	 * @param {string} message - Message to display
	 * @param {number} duration - Duration in milliseconds (default: 2000)
	 */
	const showFeedback = useCallback((message, duration = 2000) => {
		setFeedback(message);
		setTimeout(() => setFeedback(''), duration);
	}, []);

	/**
	 * Convert RGB values to hexadecimal color code
	 * @param {number} r - Red value (0-255)
	 * @param {number} g - Green value (0-255)
	 * @param {number} b - Blue value (0-255)
	 * @returns {string} Hexadecimal color code
	 */
	const rgbToHex = useCallback((r, g, b) => {
		const toHex = (n) => {
			const hex = n.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
	}, []);

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

	/**
	 * Draw image on canvas with proper scaling and centering
	 * @param {HTMLImageElement} img - Image element to draw
	 */
	const drawImageOnCanvas = useCallback((img) => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		if (!canvas || !ctx || !img) return;

		// Calculate canvas dimensions maintaining aspect ratio
		const maxWidth = 800;
		const maxHeight = 600;

		let { width, height } = img;

		// Scale image to fit within maximum dimensions
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

		// Set canvas dimensions
		canvas.width = width;
		canvas.height = height;
		canvas.style.maxWidth = '100%';
		canvas.style.height = 'auto';

		// Clear canvas and draw image
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(img, 0, 0, width, height);

		setImageLoaded(true);
	}, []);

	/**
	 * Load image from various sources (File, URL, etc.)
	 * @param {string|File} source - Image source (URL string or File object)
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

			// Handle different source types
			if (typeof source === 'string') {
				// URL source
				img.crossOrigin = 'anonymous'; // Enable CORS for external images
				img.src = source;
			} else if (source instanceof File) {
				// File source
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
	 * @param {Event} event - File input change event
	 */
	const handleFileUpload = useCallback(
		(event) => {
			const file = event.target.files[0];
			if (file && file.type.startsWith('image/')) {
				loadImage(file);
			} else {
				showFeedback('Please select a valid image file.');
			}
			// Reset file input
			event.target.value = '';
		},
		[loadImage, showFeedback]
	);

	/**
	 * Handle paste event for pasting images from clipboard
	 * @param {Event} event - Paste event
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
	 * Uses the modern Clipboard API to read image data directly
	 */
	const handleClipboardPaste = useCallback(async () => {
		try {
			// Check if Clipboard API is available
			if (!navigator.clipboard || !navigator.clipboard.read) {
				showFeedback(
					'Clipboard API not supported. Please use Ctrl+V (Cmd+V on Mac) instead.',
					3000
				);
				return;
			}

			// Request clipboard permission and read data
			const clipboardItems = await navigator.clipboard.read();

			let imageFound = false;

			for (const clipboardItem of clipboardItems) {
				// Look for image types in clipboard
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

			// Handle different types of errors with appropriate messages
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
	 * Handle canvas click to pick color from image
	 * @param {Event} event - Mouse click event on canvas
	 */
	const handleCanvasClick = useCallback(
		(event) => {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');

			if (!canvas || !ctx || !imageLoaded) return;

			// Get canvas bounds and calculate click position
			const rect = canvas.getBoundingClientRect();
			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;

			const x = Math.floor((event.clientX - rect.left) * scaleX);
			const y = Math.floor((event.clientY - rect.top) * scaleY);

			// Get pixel data at click position
			try {
				const imageData = ctx.getImageData(x, y, 1, 1);
				const [r, g, b, a] = imageData.data;

				// Only process opaque pixels
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

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}

		showFeedback('Application reset');
	}, [showFeedback]);

	/**
	 * Load default image on component mount
	 */
	useEffect(() => {
		loadImage(defaultImageUrl);
	}, [loadImage, defaultImageUrl]);

	/**
	 * Add global paste event listener
	 */
	useEffect(() => {
		document.addEventListener('paste', handlePaste);
		return () => {
			document.removeEventListener('paste', handlePaste);
		};
	}, [handlePaste]);

	return (
		<div className='min-h-screen p-4 flex items-center justify-center'>
			<div className='w-full max-w-6xl mx-auto'>
				{/* Header Section */}
				<header className='text-center mb-8'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<Palette className='w-10 h-10 text-white' />
						<h1 className='text-4xl font-bold text-white'>
							PixelPick
						</h1>
					</div>
					<p className='text-white/80 text-lg'>
						Upload or paste an image, then click any pixel to get
						its color values
					</p>
				</header>

				<div className='grid lg:grid-cols-3 gap-6'>
					{/* Main Canvas Area */}
					<div className='lg:col-span-2'>
						<div className='glass-card p-6'>
							{/* Control Buttons */}
							<div className='flex flex-wrap gap-3 mb-6'>
								<button
									onClick={() =>
										fileInputRef.current?.click()
									}
									className='copy-button'
									disabled={isLoading}
								>
									<Upload className='w-4 h-4' />
									Upload Image
								</button>

								<button
									onClick={handleClipboardPaste}
									className='copy-button'
									disabled={isLoading}
								>
									<Clipboard className='w-4 h-4' />
									Paste from Clipboard
								</button>

								<button
									onClick={resetApp}
									className='copy-button'
								>
									<RotateCcw className='w-4 h-4' />
									Reset
								</button>
							</div>

							{/* Canvas Container */}
							<div className='canvas-container'>
								{isLoading && (
									<div className='absolute inset-0 flex items-center justify-center bg-black/20 z-10'>
										<div className='text-white text-lg'>
											Loading image...
										</div>
									</div>
								)}

								<canvas
									ref={canvasRef}
									onClick={handleCanvasClick}
									className='w-full h-auto cursor-crosshair bg-white/5'
									style={{ minHeight: '300px' }}
								/>

								{!imageLoaded && !isLoading && (
									<div className='absolute inset-0 flex items-center justify-center'>
										<div className='upload-area w-full h-full flex items-center justify-center'>
											<div className='text-white/60'>
												<Upload className='w-12 h-12 mx-auto mb-4' />
												<p className='text-lg font-medium'>
													Click to upload an image
												</p>
												<p className='text-sm'>
													or use the paste button
													above
												</p>
											</div>
										</div>
									</div>
								)}
							</div>

							{/* Instructions */}
							<div className='mt-4 text-white/70 text-sm'>
								<p>
									<strong>Instructions:</strong>
								</p>
								<ul className='list-disc list-inside mt-2 space-y-1'>
									<li>
										Click "Upload Image" to select a file
										from your device
									</li>
									<li>
										Click "Paste from Clipboard" or use
										Ctrl+V (Cmd+V on Mac) to paste images
									</li>
									<li>
										Click anywhere on the image to pick a
										color
									</li>
									<li>
										Color values will appear in the panel on
										the right
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Color Information Panel */}
					<div className='lg:col-span-1'>
						<div className='glass-card p-6'>
							<h2 className='text-xl font-semibold text-white mb-6 flex items-center gap-2'>
								<Palette className='w-5 h-5' />
								Color Information
							</h2>

							{selectedColor ? (
								<div className='space-y-6'>
									{/* Color Preview */}
									<div className='text-center'>
										<div
											className='color-preview mx-auto mb-4'
											style={{
												backgroundColor:
													selectedColor.hex
											}}
										/>
										<p className='text-white/80 text-sm'>
											Position: (
											{selectedColor.position.x},{' '}
											{selectedColor.position.y})
										</p>
									</div>

									{/* Color Values */}
									<div className='space-y-4'>
										{/* Hex Value */}
										<div>
											<label className='block text-white/70 text-sm mb-2'>
												Hex Value
											</label>
											<div className='flex items-center gap-2'>
												<input
													type='text'
													value={selectedColor.hex}
													readOnly
													className='flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-mono text-sm'
												/>
												<button
													onClick={() =>
														copyToClipboard(
															selectedColor.hex
														)
													}
													className='p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors'
													title='Copy Hex value'
												>
													<Copy className='w-4 h-4 text-white' />
												</button>
											</div>
										</div>

										{/* RGB Value */}
										<div>
											<label className='block text-white/70 text-sm mb-2'>
												RGB Value
											</label>
											<div className='flex items-center gap-2'>
												<input
													type='text'
													value={selectedColor.rgb}
													readOnly
													className='flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-mono text-sm'
												/>
												<button
													onClick={() =>
														copyToClipboard(
															selectedColor.rgb
														)
													}
													className='p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors'
													title='Copy RGB value'
												>
													<Copy className='w-4 h-4 text-white' />
												</button>
											</div>
										</div>

										{/* Individual RGB Components */}
										<div className='grid grid-cols-3 gap-3'>
											<div>
												<label className='block text-white/70 text-xs mb-1'>
													Red
												</label>
												<div className='bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm text-center font-mono'>
													{selectedColor.r}
												</div>
											</div>
											<div>
												<label className='block text-white/70 text-xs mb-1'>
													Green
												</label>
												<div className='bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm text-center font-mono'>
													{selectedColor.g}
												</div>
											</div>
											<div>
												<label className='block text-white/70 text-xs mb-1'>
													Blue
												</label>
												<div className='bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm text-center font-mono'>
													{selectedColor.b}
												</div>
											</div>
										</div>

										{/* Quick Copy Buttons */}
										<div className='space-y-2'>
											<button
												onClick={() =>
													copyToClipboard(
														selectedColor.hex
													)
												}
												className='copy-button w-full justify-center'
											>
												<Copy className='w-4 h-4' />
												Copy Hex ({selectedColor.hex})
											</button>
											<button
												onClick={() =>
													copyToClipboard(
														selectedColor.rgb
													)
												}
												className='copy-button w-full justify-center'
											>
												<Copy className='w-4 h-4' />
												Copy RGB ({selectedColor.rgb})
											</button>
										</div>
									</div>
								</div>
							) : (
								<div className='text-center text-white/60 py-12'>
									<Palette className='w-12 h-12 mx-auto mb-4 opacity-50' />
									<p className='text-lg'>No color selected</p>
									<p className='text-sm mt-2'>
										Click on the image to pick a color
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Feedback Message */}
				{feedback && (
					<div className='fixed bottom-6 right-6 bg-white/20 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white shadow-lg'>
						{feedback}
					</div>
				)}

				{/* Hidden File Input */}
				<input
					ref={fileInputRef}
					type='file'
					accept='image/*'
					onChange={handleFileUpload}
					className='hidden'
				/>
			</div>
		</div>
	);
};

export default App;
