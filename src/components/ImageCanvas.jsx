import React from 'react';
import { X } from 'lucide-react';
import ControlButtons from './ControlButtons';
import ImageUploadArea from './ImageUploadArea';
import InstructionsPanel from './InstructionsPanel';
import MagnifyingGlass from './MagnifyingGlass';
import useDismissibleNotification from '../hooks/useDismissibleNotification';

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
	const { isVisible: showMagnifyHint, dismiss: dismissMagnifyHint } =
		useDismissibleNotification('magnify-hint-dismissed', 1);
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

				{/* Magnify Hint */}
				{imageLoaded && showMagnifyHint && (
					<div className='mb-1 p-2 bg-amber-100/80 border border-amber-300 rounded-lg relative'>
						<div className='flex items-center justify-center gap-2 pr-6'>
							<span className='text-amber-600 text-lg'>🔍</span>
							<p className='text-amber-800 text-sm font-medium'>
								Hold{' '}
								<kbd className='px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded text-xs font-bold'>
									Ctrl
								</kbd>{' '}
								while hovering to magnify
							</p>
						</div>
						<button
							onClick={dismissMagnifyHint}
							className='absolute top-1 right-1 p-1 text-amber-600 hover:text-amber-800 hover:bg-amber-200 rounded transition-colors'
							aria-label='Dismiss magnify hint'
						>
							<X size={14} />
						</button>
					</div>
				)}

				{/* Canvas Container */}
				<div className='canvas-container'>
					{/* Loading Overlay */}
					{isLoading && (
						<div className='absolute inset-0 flex items-center justify-center bg-white/80 z-10'>
							<div className='text-gray-800 text-lg'>
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
						className='w-full h-auto cursor-crosshair bg-gray-100'
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
