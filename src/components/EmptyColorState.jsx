import React from 'react';
import { Palette } from 'lucide-react';

/**
 * EmptyColorState Component
 * Displays placeholder content when no color is selected
 */
const EmptyColorState = () => {
	return (
		<div className='text-center text-gray-500 py-12'>
			<Palette className='w-12 h-12 mx-auto mb-4 opacity-50' />
			<p className='text-lg'>No color selected</p>
			<p className='text-sm mt-2'>Click on the image to pick a color</p>
		</div>
	);
};

export default EmptyColorState;
