import React, { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

/**
 * ColorPicker Component
 * Provides a professional color picker interface using react-colorful
 */
const ColorPicker = ({ onColorSelect }) => {
	const [color, setColor] = useState('#e600c7'); // Default purple

	// Convert hex to RGB
	const hexToRgb = (hex) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
			  }
			: { r: 0, g: 0, b: 0 };
	};

	// Handle color change
	const handleColorChange = (newColor) => {
		setColor(newColor);

		const rgb = hexToRgb(newColor);

		// Notify parent component with consistent format
		onColorSelect({
			r: rgb.r,
			g: rgb.g,
			b: rgb.b,
			hex: newColor,
			rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
			position: { x: 0, y: 0 } // No position for color picker
		});
	};

	// Initialize with default color
	useEffect(() => {
		handleColorChange(color);
	}, []); // Only run once on mount

	return (
		<div className='space-y-6'>
			{/* React Colorful Picker */}
			<div className='color-picker-container'>
				<HexColorPicker
					color={color}
					onChange={handleColorChange}
					style={{
						width: '100%',
						height: '200px'
					}}
				/>
			</div>

			{/* Color Info Section */}
			<div className='space-y-4'>
				{/* Hex Input */}
				<div className='flex items-center gap-3'>
					{/* Color Preview */}
					<div
						className='w-12 h-12 rounded-lg border-2 border-gray-300 shadow-lg flex-shrink-0'
						style={{ backgroundColor: color }}
					/>

					{/* Hex Input Field */}
					<div className='flex-1'>
						<HexColorInput
							color={color}
							onChange={handleColorChange}
							className='w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
							placeholder='#000000'
							prefixed
						/>
						<div className='text-xs text-gray-500 mt-1 text-center'>
							HEX
						</div>
					</div>
				</div>

				{/* Color Display Banner */}
				<div className='text-center'>
					<div
						className='mx-auto mb-2 px-4 py-3 rounded-lg text-white font-bold text-lg shadow-lg'
						style={{ backgroundColor: color }}
					>
						{color.toUpperCase()}
					</div>
					<div className='text-sm text-gray-600'>~ Custom Color</div>
				</div>
			</div>
		</div>
	);
};

export default ColorPicker;
