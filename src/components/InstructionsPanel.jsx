import React from 'react';

/**
 * InstructionsPanel Component
 * Displays usage instructions for the application
 */
const InstructionsPanel = () => {
	return (
		<div className='mt-4 text-gray-800 text-sm'>
			<p className='font-semibold mb-2'>Instructions:</p>
			<ul className='list-disc list-inside space-y-1 text-gray-700'>
				<li>Click "Upload Image" to select a file from your device</li>
				<li>
					Click "Paste from Clipboard" or use Ctrl+V (Cmd+V on Mac) to
					paste images
				</li>
				<li>Click anywhere on the image to pick a color</li>
				<li>Color values will appear in the panel on the right</li>
			</ul>
		</div>
	);
};

export default InstructionsPanel;
