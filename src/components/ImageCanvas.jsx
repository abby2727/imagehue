import { X } from 'lucide-react';
import ControlButtons from './ControlButtons';
import ImageUploadArea from './ImageUploadArea';
import InstructionsPanel from './InstructionsPanel';
import useDismissibleNotification from '../hooks/useDismissibleNotification';

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

	// Check if user is on mobile device
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		) || window.innerWidth < 768;

	return (
		<div className='lg:col-span-2'>
			<div className='glass-card p-6'>
				<ControlButtons
					onUploadClick={onUploadClick}
					onPasteClick={onPasteClick}
					onResetClick={onResetClick}
					isLoading={isLoading}
				/>

				{imageLoaded && showMagnifyHint && !isMobile && (
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

				<div className='relative'>
					<div
						className='canvas-container'
						style={{ minHeight: '300px' }}
					>
						{!imageLoaded && <ImageUploadArea />}

						{isLoading && (
							<div className='absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm'>
								<div className='flex items-center gap-3 text-gray-600'>
									<div className='w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin'></div>
									<span>Loading image...</span>
								</div>
							</div>
						)}

						<canvas
							ref={canvasRef}
							onClick={onCanvasClick}
							onMouseMove={onCanvasMouseMove}
							onMouseEnter={onCanvasMouseEnter}
							onMouseLeave={onCanvasMouseLeave}
							className='max-w-full h-auto cursor-crosshair'
							style={{ display: imageLoaded ? 'block' : 'none' }}
						/>
					</div>
				</div>

				<div className='hidden md:block'>
					<InstructionsPanel />
				</div>
			</div>
		</div>
	);
};

export default ImageCanvas;
