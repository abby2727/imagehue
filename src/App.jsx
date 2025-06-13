import React from 'react';

// Custom hooks
import useFeedback from './hooks/useFeedback';
import useImageHandler from './hooks/useImageHandler';
import useClipboard from './hooks/useClipboard';

// Components
import Header from './components/Header';
import ImageCanvas from './components/ImageCanvas';
import ColorInfoPanel from './components/ColorInfoPanel';
import FeedbackMessage from './components/FeedbackMessage';
import MagnifyingGlass from './components/MagnifyingGlass';

/**
 * PixelPick - Main Application Component
 * A React-based color picker tool that allows users to upload or paste images
 * and extract color values (Hex and RGB) by clicking on pixels
 */
const App = () => {
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

	return (
		<div className='min-h-screen p-4 flex items-center justify-center'>
			<div className='w-full max-w-6xl mx-auto'>
				{/* Header Section */}
				<Header />

				{/* Main Content Grid */}
				<div className='grid lg:grid-cols-3 gap-6'>
					{/* Image Canvas Area */}
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

					{/* Color Information Panel */}
					<ColorInfoPanel
						selectedColor={selectedColor}
						onCopy={copyToClipboard}
					/>
				</div>

				{/* Feedback Message */}
				<FeedbackMessage message={feedback} />

				{/* Hidden File Input */}
				<input
					ref={fileInputRef}
					type='file'
					accept='image/*'
					onChange={handleFileUpload}
					className='hidden'
				/>
			</div>

			{/* Magnifying Glass - Rendered at App level for maximum z-index */}
			<MagnifyingGlass
				isVisible={showMagnifier && imageLoaded}
				mousePosition={mousePosition}
				sourceCanvas={canvasRef.current}
				zoomLevel={8}
				size={120}
			/>
		</div>
	);
};

export default App;
