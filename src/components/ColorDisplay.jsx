import React from 'react';
import { Copy } from 'lucide-react';

/**
 * ColorDisplay Component
 * Shows the selected color preview and values with copy functionality
 */
const ColorDisplay = ({ selectedColor, onCopy }) => {
	if (!selectedColor) {
		return null;
	}

	return (
		<div className='space-y-6'>
			{/* Color Preview */}
			<div className='text-center'>
				<div
					className='color-preview mx-auto mb-4'
					style={{ backgroundColor: selectedColor.hex }}
				/>
				<p className='text-white/80 text-sm'>
					Position: ({selectedColor.position.x},{' '}
					{selectedColor.position.y})
				</p>
			</div>

			{/* Color Values */}
			<div className='space-y-4'>
				{/* Hex Value */}
				<div>
					<label className='block text-white/70 text-sm mb-2'>
						Hex Value
					</label>
					<div className='flex items-center gap-2'>
						<input
							type='text'
							value={selectedColor.hex}
							readOnly
							className='flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-mono text-sm'
						/>
						<button
							onClick={() => onCopy(selectedColor.hex)}
							className='p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors'
							title='Copy Hex value'
						>
							<Copy className='w-4 h-4 text-white' />
						</button>
					</div>
				</div>

				{/* RGB Value */}
				<div>
					<label className='block text-white/70 text-sm mb-2'>
						RGB Value
					</label>
					<div className='flex items-center gap-2'>
						<input
							type='text'
							value={selectedColor.rgb}
							readOnly
							className='flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-mono text-sm'
						/>
						<button
							onClick={() => onCopy(selectedColor.rgb)}
							className='p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors'
							title='Copy RGB value'
						>
							<Copy className='w-4 h-4 text-white' />
						</button>
					</div>
				</div>

				{/* Individual RGB Components */}
				<div className='grid grid-cols-3 gap-3'>
					<div>
						<label className='block text-white/70 text-xs mb-1'>
							Red
						</label>
						<div className='bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm text-center font-mono'>
							{selectedColor.r}
						</div>
					</div>
					<div>
						<label className='block text-white/70 text-xs mb-1'>
							Green
						</label>
						<div className='bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm text-center font-mono'>
							{selectedColor.g}
						</div>
					</div>
					<div>
						<label className='block text-white/70 text-xs mb-1'>
							Blue
						</label>
						<div className='bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm text-center font-mono'>
							{selectedColor.b}
						</div>
					</div>
				</div>

				{/* Quick Copy Buttons */}
				<div className='space-y-2'>
					<button
						onClick={() => onCopy(selectedColor.hex)}
						className='copy-button w-full justify-center'
					>
						<Copy className='w-4 h-4' />
						Copy Hex ({selectedColor.hex})
					</button>
					<button
						onClick={() => onCopy(selectedColor.rgb)}
						className='copy-button w-full justify-center'
					>
						<Copy className='w-4 h-4' />
						Copy RGB ({selectedColor.rgb})
					</button>
				</div>
			</div>
		</div>
	);
};

export default ColorDisplay;
