import React from 'react';
import ImageCanvas from '../components/ImageCanvas';
import ColorInfoPanel from '../components/ColorInfoPanel';
import MagnifyingGlass from '../components/MagnifyingGlass';
import useImageHandlerWithContext from '../hooks/useImageHandlerWithContext';
import { useAppContext } from '../contexts/AppContext';
import useClipboard from '../hooks/useClipboard';

const ImageColorPicker = () => {
	const { feedback, setFeedback } = useAppContext();
	const showFeedback = (message, duration = 2000) => {
		setFeedback(message);
		setTimeout(() => setFeedback(null), duration);
	};
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
	} = useImageHandlerWithContext(showFeedback);

	return (
		<main className='flex-1 p-4 flex items-center justify-center'>
			<div className='w-full max-w-6xl mx-auto'>
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

				{/* Hidden File Input */}
				<input
					ref={fileInputRef}
					type='file'
					accept='image/*'
					onChange={handleFileUpload}
					className='hidden'
				/>
			</div>

			{/* Magnifying Glass */}
			<MagnifyingGlass
				isVisible={showMagnifier && imageLoaded}
				mousePosition={mousePosition}
				sourceCanvas={canvasRef.current}
				zoomLevel={8}
				size={120}
			/>
		</main>
	);
};

export default ImageColorPicker;
