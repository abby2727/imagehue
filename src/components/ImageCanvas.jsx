import React from 'react';
import ControlButtons from './ControlButtons';
import ImageUploadArea from './ImageUploadArea';
import InstructionsPanel from './InstructionsPanel';
import MagnifyingGlass from './MagnifyingGlass';

/**
 * ImageCanvas Component
 * Handles the main canvas area with controls, loading states, and instructions
 */
const ImageCanvas = ({
	canvasRef,
	onCanvasClick,
	onCanvasMouseMove,
	onCanvasMouseEnter,
	onCanvasMouseLeave,
	onUploadClick,
	onPasteClick,
	onResetClick,
	isLoading,
	imageLoaded,
	showMagnifier,
	mousePosition
}) => {
	return (
		<div className='lg:col-span-2'>
			<div className='glass-card p-6'>
				{/* Control Buttons */}
				<ControlButtons
					onUploadClick={onUploadClick}
					onPasteClick={onPasteClick}
					onResetClick={onResetClick}
					isLoading={isLoading}
				/>

				{/* Canvas Container */}
				<div className='canvas-container'>
					{/* Loading Overlay */}
					{isLoading && (
						<div className='absolute inset-0 flex items-center justify-center bg-black/20 z-10'>
							<div className='text-white text-lg'>
								Loading image...
							</div>
						</div>
					)}

					{/* Main Canvas */}
					<canvas
						ref={canvasRef}
						onClick={onCanvasClick}
						onMouseMove={onCanvasMouseMove}
						onMouseEnter={onCanvasMouseEnter}
						onMouseLeave={onCanvasMouseLeave}
						className='w-full h-auto cursor-crosshair bg-white/5'
						style={{ minHeight: '300px' }}
					/>

					{/* Upload Area Placeholder */}
					{!imageLoaded && !isLoading && <ImageUploadArea />}
				</div>

				{/* Instructions */}
				<InstructionsPanel />
			</div>
		</div>
	);
};

export default ImageCanvas;
