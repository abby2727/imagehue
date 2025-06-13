import React, { useState } from 'react';

// Custom hooks
import useFeedback from './hooks/useFeedback';
import useImageHandler from './hooks/useImageHandler';
import useClipboard from './hooks/useClipboard';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ModeSelector from './components/ModeSelector';
import ImageCanvas from './components/ImageCanvas';
import ColorPickerPanel from './components/ColorPickerPanel';
import ColorInfoPanel from './components/ColorInfoPanel';
import FeedbackMessage from './components/FeedbackMessage';
import MagnifyingGlass from './components/MagnifyingGlass';

/**
 * PixelPick - Main Application Component
 * A React-based color picker tool that allows users to upload or paste images
 * and extract color values (Hex and RGB) by clicking on pixels, or use a visual color picker
 */
const App = () => {
	// Mode state
	const [activeMode, setActiveMode] = useState('image'); // 'image' or 'picker'
	const [colorPickerColor, setColorPickerColor] = useState(null);

	// Custom hooks for state management
	const { feedback, showFeedback } = useFeedback();
	const { copyToClipboard } = useClipboard(showFeedback);
	const {
		// State
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
	} = useImageHandler(showFeedback);

	// Handle color selection from color picker
	const handleColorPickerSelect = (color) => {
		setColorPickerColor(color);
	};

	// Get the current selected color based on active mode
	const currentSelectedColor =
		activeMode === 'image' ? selectedColor : colorPickerColor;

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Header at the very top */}
			<Header />

			{/* Main Content Area */}
			<main className='flex-1 p-4 flex items-center justify-center'>
				<div className='w-full max-w-6xl mx-auto'>
					{/* Mode Selector */}
					<ModeSelector
						activeMode={activeMode}
						onModeChange={setActiveMode}
					/>

					{/* Main Content Grid */}
					<div className='grid lg:grid-cols-3 gap-6'>
						{/* Content Area - Changes based on active mode */}
						{activeMode === 'image' ? (
							<ImageCanvas
								canvasRef={canvasRef}
								onCanvasClick={handleCanvasClick}
								onCanvasMouseMove={handleCanvasMouseMove}
								onCanvasMouseEnter={handleCanvasMouseEnter}
								onCanvasMouseLeave={handleCanvasMouseLeave}
								onUploadClick={handleUploadClick}
								onPasteClick={handleClipboardPaste}
								onResetClick={resetApp}
								isLoading={isLoading}
								imageLoaded={imageLoaded}
								showMagnifier={showMagnifier}
								mousePosition={mousePosition}
							/>
						) : (
							<ColorPickerPanel
								onColorSelect={handleColorPickerSelect}
							/>
						)}

						{/* Color Information Panel */}
						<ColorInfoPanel
							selectedColor={currentSelectedColor}
							onCopy={copyToClipboard}
						/>
					</div>

					{/* Hidden File Input */}
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						onChange={handleFileUpload}
						className='hidden'
					/>
				</div>
			</main>

			{/* Footer at the bottom */}
			<Footer />

			{/* Feedback Message */}
			<FeedbackMessage message={feedback} />

			{/* Magnifying Glass - Only show in image mode */}
			{activeMode === 'image' && (
				<MagnifyingGlass
					isVisible={showMagnifier && imageLoaded}
					mousePosition={mousePosition}
					sourceCanvas={canvasRef.current}
					zoomLevel={8}
					size={120}
				/>
			)}
		</div>
	);
};

export default App;
