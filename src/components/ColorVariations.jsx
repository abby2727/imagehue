import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Palette, Copy } from 'lucide-react';
import { generateColorVariations } from '../utils/colorVariations';

/**
 * ColorVariations Component
 * Shows color variations from light (0%) to dark (100%)
 */
const ColorVariations = ({ selectedColor, onCopy }) => {
	const [showVariations, setShowVariations] = useState(false);

	if (!selectedColor) {
		return null;
	}

	const variations = generateColorVariations(
		selectedColor.r,
		selectedColor.g,
		selectedColor.b
	);

	const handleVariationClick = (variation) => {
		onCopy(variation.hex);
	};

	return (
		<div className='pt-4 border-t border-gray-200'>
			{/* Toggle Button */}
			<button
				onClick={() => setShowVariations(!showVariations)}
				className='w-full flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group'
			>
				<Palette className='w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors' />
				<span className='text-gray-700 font-medium'>
					{showVariations
						? 'Hide Color Variations'
						: 'Show Color Variations'}
				</span>
				{showVariations ? (
					<ChevronUp className='w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors' />
				) : (
					<ChevronDown className='w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors' />
				)}
			</button>

			{/* Color Variations Grid */}
			{showVariations && (
				<div className='mt-4 space-y-4'>
					{/* Variations Bar */}
					<div className='bg-gray-50 p-4 rounded-lg'>
						<h4 className='text-gray-700 text-sm font-medium mb-3 text-center'>
							Tints & Shades (0% = White, 50% = Original, 100% =
							Black)
						</h4>

						{/* Color Bar */}
						<div className='flex rounded-lg overflow-hidden shadow-lg border border-gray-200'>
							{variations.map((variation, index) => {
								const isOriginal = variation.percentage === 50;
								return (
									<button
										key={index}
										onClick={() =>
											handleVariationClick(variation)
										}
										className={`flex-1 group relative ${
											isOriginal
												? 'ring-2 ring-white ring-offset-2 ring-offset-transparent z-10'
												: ''
										}`}
										style={{
											backgroundColor: variation.hex
										}}
										title={`${variation.percentage}% - ${
											variation.hex
										}${isOriginal ? ' (Original)' : ''}`}
									>
										{/* Color Section */}
										<div className='h-12 w-full transition-transform group-hover:scale-105' />

										{/* Percentage Label */}
										<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20'>
											<span className='text-white text-xs font-bold drop-shadow-lg'>
												{variation.percentage}%
											</span>
										</div>

										{/* Original Color Indicator */}
										{isOriginal && (
											<div className='absolute -top-1 left-1/2 transform -translate-x-1/2'>
												<div className='bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg'>
													Original
												</div>
											</div>
										)}
									</button>
								);
							})}
						</div>

						{/* Percentage Labels */}
						<div className='flex justify-between mt-2 px-1'>
							{variations.map((variation, index) => (
								<div key={index} className='flex-1 text-center'>
									<span className='text-gray-500 text-xs font-medium'>
										{variation.percentage}%
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Variation Details Grid */}
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
						{variations.map((variation, index) => {
							const isOriginal = variation.percentage === 50;
							return (
								<button
									key={index}
									onClick={() =>
										handleVariationClick(variation)
									}
									className={`group p-3 rounded-lg transition-all duration-200 relative ${
										isOriginal
											? 'bg-gray-100 border-2 border-gray-400 ring-1 ring-gray-300'
											: 'bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
									}`}
									title={`Copy ${variation.hex}${
										isOriginal ? ' (Original)' : ''
									}`}
								>
									{/* Original Badge */}
									{isOriginal && (
										<div className='absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg'>
											★
										</div>
									)}

									{/* Color Preview */}
									<div
										className={`w-full h-8 rounded mb-2 transition-transform group-hover:scale-105 ${
											isOriginal
												? 'border-2 border-gray-400 ring-1 ring-gray-300'
												: 'border border-gray-300'
										}`}
										style={{
											backgroundColor: variation.hex
										}}
									/>

									{/* Color Info */}
									<div className='text-left'>
										<div
											className={`text-xs font-medium ${
												isOriginal
													? 'text-gray-800'
													: 'text-gray-600'
											}`}
										>
											{variation.percentage}%{' '}
											{isOriginal ? '(Original)' : ''}
										</div>
										<div
											className={`text-xs font-mono ${
												isOriginal
													? 'text-gray-800 font-bold'
													: 'text-gray-700'
											}`}
										>
											{variation.hex}
										</div>
									</div>

									{/* Copy Icon (appears on hover) */}
									<div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
										<Copy className='w-3 h-3 text-gray-500' />
									</div>
								</button>
							);
						})}
					</div>

					{/* Info Text */}
					<div className='text-center text-gray-500 text-xs'>
						💡 Click any color to copy its hex value to clipboard
					</div>
				</div>
			)}
		</div>
	);
};

export default ColorVariations;
