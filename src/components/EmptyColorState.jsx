import React from 'react';
import { Palette } from 'lucide-react';

/**
 * EmptyColorState Component
 * Displays placeholder content when no color is selected in the color picker
 */
const EmptyColorState = () => {
	return (
		<div className='text-center text-gray-500 py-12'>
			<Palette className='w-12 h-12 mx-auto mb-4 opacity-50' />
			<p className='text-lg font-medium'>No Color Selected</p>
			<p className='text-sm mt-2'>
				Click on any pixel in the image to extract its color
			</p>
			<div className='mt-4 text-xs text-gray-400 space-y-1'>
				<p>✨ Get exact Hex, RGB, and HSL color codes</p>
				<p>🎨 View color variations and tints</p>
				<p>📋 One-click copy to clipboard</p>
				<p>🔍 Use magnifying glass for precision</p>
			</div>
		</div>
	);
};

export default EmptyColorState;
