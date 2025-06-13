import React from 'react';
import { Palette } from 'lucide-react';
import ColorDisplay from './ColorDisplay';
import EmptyColorState from './EmptyColorState';

/**
 * ColorInfoPanel Component
 * Displays the color information panel with selected color details or empty state
 */
const ColorInfoPanel = ({ selectedColor, onCopy }) => {
	return (
		<div className='lg:col-span-1'>
			<div className='glass-card p-6'>
				<h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
					<Palette className='w-5 h-5' />
					Color Information
				</h2>

				{selectedColor ? (
					<ColorDisplay
						selectedColor={selectedColor}
						onCopy={onCopy}
					/>
				) : (
					<EmptyColorState />
				)}
			</div>
		</div>
	);
};

export default ColorInfoPanel;
