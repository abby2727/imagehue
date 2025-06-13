import React from 'react';
import ColorPicker from './ColorPicker';

/**
 * ColorPickerPanel Component
 * Wrapper panel for the color picker interface
 */
const ColorPickerPanel = ({ onColorSelect }) => {
	return (
		<div className='lg:col-span-2'>
			<div className='glass-card p-6'>
				<h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
					🎨 Visual Color Picker
				</h3>

				<div className='max-w-md mx-auto'>
					<ColorPicker onColorSelect={onColorSelect} />
				</div>

				<div className='mt-6 text-center text-gray-600 text-sm'>
					<p className='mb-2'>
						<strong>How to use:</strong>
					</p>
					<ul className='text-left max-w-md mx-auto space-y-1'>
						<li>
							• Click on the gradient area to select saturation
							and lightness
						</li>
						<li>• Click on the rainbow bar to select hue</li>
						<li>• Type a hex color code to set a specific color</li>
						<li>
							• All color formats will be generated automatically
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ColorPickerPanel;
