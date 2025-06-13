import React, { useState, useMemo } from 'react';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { getAllColorFormats } from '../utils/colorConversions';
import ColorVariations from './ColorVariations';

/**
 * ColorDisplay Component
 * Shows the selected color preview and values with copy functionality
 */
const ColorDisplay = ({ selectedColor, onCopy }) => {
	const [showMoreFormats, setShowMoreFormats] = useState(false);

	// Calculate all color formats when selectedColor changes
	const allFormats = useMemo(() => {
		if (!selectedColor) return null;
		return getAllColorFormats(
			selectedColor.r,
			selectedColor.g,
			selectedColor.b
		);
	}, [selectedColor]);

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
				<p className='text-gray-600 text-sm'>
					Position: ({selectedColor.position.x},{' '}
					{selectedColor.position.y})
				</p>
			</div>

			{/* Color Values */}
			<div className='space-y-4'>
				{/* Hex Value */}
				<div>
					<label className='block text-gray-600 text-sm mb-2'>
						Hex Value
					</label>
					<div className='flex items-center gap-2'>
						<input
							type='text'
							value={selectedColor.hex}
							readOnly
							className='flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-mono text-sm'
						/>
						<button
							onClick={() => onCopy(selectedColor.hex)}
							className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
							title='Copy Hex value'
						>
							<Copy className='w-4 h-4 text-gray-600' />
						</button>
					</div>
				</div>

				{/* RGB Value */}
				<div>
					<label className='block text-gray-600 text-sm mb-2'>
						RGB Value
					</label>
					<div className='flex items-center gap-2'>
						<input
							type='text'
							value={selectedColor.rgb}
							readOnly
							className='flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-mono text-sm'
						/>
						<button
							onClick={() => onCopy(selectedColor.rgb)}
							className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
							title='Copy RGB value'
						>
							<Copy className='w-4 h-4 text-gray-600' />
						</button>
					</div>
				</div>

				{/* Individual RGB Components */}
				{/* <div className='grid grid-cols-3 gap-3'>
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
				</div> */}

				{/* Quick Copy Buttons */}
				{/* <div className='space-y-2'>
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
				</div> */}

				{/* Show More Toggle */}
				<div className='pt-4 border-t border-gray-200'>
					<button
						onClick={() => setShowMoreFormats(!showMoreFormats)}
						className='w-full flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group'
					>
						<span className='text-gray-700 font-medium'>
							{showMoreFormats
								? 'Show Less'
								: 'Show More Color Formats'}
						</span>
						{showMoreFormats ? (
							<ChevronUp className='w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors' />
						) : (
							<ChevronDown className='w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors' />
						)}
					</button>
				</div>

				{/* Extended Color Formats */}
				{showMoreFormats && allFormats && (
					<div className='space-y-3 pt-4 border-t border-gray-200'>
						{/* HSL */}
						<div>
							<label className='block text-gray-600 text-sm mb-2'>
								HSL
							</label>
							<div className='flex items-center gap-2'>
								<input
									type='text'
									value={allFormats.hsl}
									readOnly
									className='flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-mono text-sm'
								/>
								<button
									onClick={() => onCopy(allFormats.hsl)}
									className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
									title='Copy HSL value'
								>
									<Copy className='w-4 h-4 text-gray-600' />
								</button>
							</div>
						</div>

						{/* XYZ */}
						<div>
							<label className='block text-gray-600 text-sm mb-2'>
								XYZ
							</label>
							<div className='flex items-center gap-2'>
								<input
									type='text'
									value={allFormats.xyz}
									readOnly
									className='flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-mono text-sm'
								/>
								<button
									onClick={() => onCopy(allFormats.xyz)}
									className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
									title='Copy XYZ value'
								>
									<Copy className='w-4 h-4 text-gray-600' />
								</button>
							</div>
						</div>

						{/* CMYK */}
						<div>
							<label className='block text-gray-600 text-sm mb-2'>
								CMYK
							</label>
							<div className='flex items-center gap-2'>
								<input
									type='text'
									value={allFormats.cmyk}
									readOnly
									className='flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-mono text-sm'
								/>
								<button
									onClick={() => onCopy(allFormats.cmyk)}
									className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
									title='Copy CMYK value'
								>
									<Copy className='w-4 h-4 text-gray-600' />
								</button>
							</div>
						</div>

						{/* LAB */}
						<div>
							<label className='block text-gray-600 text-sm mb-2'>
								LAB
							</label>
							<div className='flex items-center gap-2'>
								<input
									type='text'
									value={allFormats.lab}
									readOnly
									className='flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-mono text-sm'
								/>
								<button
									onClick={() => onCopy(allFormats.lab)}
									className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
									title='Copy LAB value'
								>
									<Copy className='w-4 h-4 text-gray-600' />
								</button>
							</div>
						</div>

						{/* LUV */}
						<div>
							<label className='block text-gray-600 text-sm mb-2'>
								LUV
							</label>
							<div className='flex items-center gap-2'>
								<input
									type='text'
									value={allFormats.luv}
									readOnly
									className='flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-mono text-sm'
								/>
								<button
									onClick={() => onCopy(allFormats.luv)}
									className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
									title='Copy LUV value'
								>
									<Copy className='w-4 h-4 text-gray-600' />
								</button>
							</div>
						</div>

						{/* HWB */}
						<div>
							<label className='block text-gray-600 text-sm mb-2'>
								HWB
							</label>
							<div className='flex items-center gap-2'>
								<input
									type='text'
									value={allFormats.hwb}
									readOnly
									className='flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-mono text-sm'
								/>
								<button
									onClick={() => onCopy(allFormats.hwb)}
									className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
									title='Copy HWB value'
								>
									<Copy className='w-4 h-4 text-gray-600' />
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Color Variations */}
				<ColorVariations
					selectedColor={selectedColor}
					onCopy={onCopy}
				/>
			</div>
		</div>
	);
};

export default ColorDisplay;
