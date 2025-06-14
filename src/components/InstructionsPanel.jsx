import React from 'react';

/**
 * InstructionsPanel Component
 * Displays usage instructions for the image color picker application
 */
const InstructionsPanel = () => {
	// Check if user is on mobile device
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		) || window.innerWidth < 768;

	return (
		<div className='mt-4 text-gray-800 text-sm'>
			<p className='font-semibold mb-2'>
				How to Use the Image Color Picker:
			</p>
			<ul className='list-disc list-inside space-y-1 text-gray-700'>
				<li>
					<strong>Upload Image:</strong> Click "Upload Image" to
					select any photo or image file from your device for color
					extraction
				</li>
				<li>
					<strong>Paste from Clipboard:</strong> Click "Paste from
					Clipboard" or use{' '}
					{isMobile
						? "your device's paste function"
						: 'Ctrl+V (Cmd+V on Mac)'}{' '}
					to paste images directly from your clipboard
				</li>
				<li>
					<strong>Pick Colors:</strong> {isMobile ? 'Tap' : 'Click'}{' '}
					anywhere on the image to extract the exact pixel color and
					get Hex, RGB values instantly
				</li>
				<li>
					<strong>Color Information:</strong> View detailed color
					information including Hex codes, RGB values, and color
					variations in the {isMobile ? 'panel below' : 'right panel'}
				</li>
				{!isMobile && (
					<li>
						<strong>Magnify Tool:</strong> Hold Ctrl while hovering
						over the image to use the magnifying glass for precise
						pixel color selection
					</li>
				)}
				<li>
					<strong>Copy Colors:</strong> Use the copy buttons to
					instantly copy color codes to your clipboard for use in
					design software
				</li>
			</ul>
			<div className='mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200'>
				<p className='text-xs text-blue-700'>
					💡 <strong>Pro Tip:</strong> This color picker tool supports
					all common image formats (JPG, PNG, GIF, WebP) and works
					great for web design, graphic design, and digital art
					projects.
				</p>
			</div>
		</div>
	);
};

export default InstructionsPanel;
