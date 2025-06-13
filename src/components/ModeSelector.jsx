import React from 'react';
import { Image, Palette } from 'lucide-react';

/**
 * ModeSelector Component
 * Provides tabs to switch between different color selection modes
 */
const ModeSelector = ({ activeMode, onModeChange }) => {
	const modes = [
		{
			id: 'image',
			label: 'Pick color from image',
			icon: Image,
			description: 'Upload or paste an image to pick colors'
		},
		{
			id: 'picker',
			label: 'Color Picker',
			icon: Palette,
			description: 'Use a visual color picker interface'
		}
	];

	return (
		<div className='mb-8'>
			<div className='bg-gray-100 rounded-lg p-1 inline-flex gap-1'>
				{modes.map((mode) => {
					const IconComponent = mode.icon;
					const isActive = activeMode === mode.id;

					return (
						<button
							key={mode.id}
							onClick={() => onModeChange(mode.id)}
							className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
								isActive
									? 'bg-white text-gray-800 shadow-sm'
									: 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
							}`}
						>
							<IconComponent className='w-4 h-4' />
							{mode.label}
						</button>
					);
				})}
			</div>

			{/* Mode Description */}
			{/* <div className='mt-3'>
				<p className='text-gray-600 text-sm'>
					{modes.find((mode) => mode.id === activeMode)?.description}
				</p>
			</div> */}
		</div>
	);
};

export default ModeSelector;
