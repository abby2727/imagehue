import React from 'react';
import { Upload, Clipboard, RotateCcw } from 'lucide-react';

/**
 * ControlButtons Component
 * Renders the control buttons for uploading, pasting, and resetting
 */
const ControlButtons = ({
	onUploadClick,
	onPasteClick,
	onResetClick,
	isLoading
}) => {
	return (
		<div className='flex flex-wrap gap-3 mb-3'>
			<button
				onClick={onUploadClick}
				className='copy-button'
				disabled={isLoading}
			>
				<Upload className='w-4 h-4' />
				Upload Image
			</button>

			<button
				onClick={onPasteClick}
				className='copy-button'
				disabled={isLoading}
			>
				<Clipboard className='w-4 h-4' />
				Paste from Clipboard
			</button>

			<button onClick={onResetClick} className='copy-button'>
				<RotateCcw className='w-4 h-4' />
				Reset
			</button>
		</div>
	);
};

export default ControlButtons;
