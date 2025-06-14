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
				{/* Main Content Grid - Improved Mobile Layout */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Image Canvas Area */}
					<div className='lg:col-span-2 order-1 lg:order-1'>
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
					</div>

					{/* Color Information Panel - Higher Priority on Mobile */}
					<div className='lg:col-span-1 order-2 lg:order-2'>
						<ColorInfoPanel
							selectedColor={selectedColor}
							onCopy={copyToClipboard}
						/>

						{/* Mobile Quick Tips */}
						<div className='mt-4 lg:hidden'>
							<div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
								<h4 className='text-sm font-semibold text-blue-800 mb-2'>
									Quick Tips:
								</h4>
								<ul className='text-xs text-blue-700 space-y-1'>
									<li>
										• Tap any pixel to extract its color
									</li>
									<li>• Scroll down for color variations</li>
									<li>• Use copy buttons to save colors</li>
								</ul>
							</div>
						</div>
					</div>
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

			{/* Magnifying Glass - Only shown on desktop */}
			{!(
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				) || window.innerWidth < 768
			) && (
				<MagnifyingGlass
					isVisible={showMagnifier && imageLoaded}
					mousePosition={mousePosition}
					sourceCanvas={canvasRef.current}
					zoomLevel={8}
					size={120}
				/>
			)}
		</main>
	);
};

export default ImageColorPicker;
