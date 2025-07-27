import { useState } from 'react';
import { ChevronDown, ChevronUp, Palette, Copy } from 'lucide-react';
import { generateTints, generateShades } from '../utils/colorVariations';
import { useAppContext } from '../contexts/AppContext';

const ColorVariations = ({ selectedColor, onCopy }) => {
	const { uiStates, updateUiStates } = useAppContext();
	const { showVariations } = uiStates;
	const [showTints, setShowTints] = useState(true);
	const [showShades, setShowShades] = useState(true);

	if (!selectedColor) {
		return null;
	}

	const tints = generateTints(
		selectedColor.r,
		selectedColor.g,
		selectedColor.b
	);
	const shades = generateShades(
		selectedColor.r,
		selectedColor.g,
		selectedColor.b
	);

	const handleVariationClick = (variation) => {
		onCopy(variation.hex);
	};

	const renderVariationGrid = (variations, type) => {
		return (
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-3'>
				{variations.map((variation, index) => {
					const isOriginal = variation.percentage === 0;
					return (
						<button
							key={`${type}-${index}`}
							onClick={() => handleVariationClick(variation)}
							className={`group rounded-lg transition-all duration-200 relative text-center p-2 ${
								isOriginal
									? 'bg-blue-100 border-2 border-blue-500 ring-2 ring-blue-200'
									: 'bg-white border border-gray-200 hover:border-gray-300'
							}`}
							title={`Copy ${variation.hex}`}
						>
							{isOriginal && (
								<div className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg'>
									★
								</div>
							)}
							<div
								className='w-full h-16 rounded-md mb-2 transition-transform group-hover:scale-105 border border-gray-300'
								style={{ backgroundColor: variation.hex }}
							/>
							<div className='text-left'>
								<div
									className={`text-xs font-semibold ${
										isOriginal
											? 'text-blue-800'
											: 'text-gray-700'
									}`}
								>
									{variation.percentage}%
								</div>
								<div
									className={`text-xs font-mono mt-1 ${
										isOriginal
											? 'text-blue-900 font-bold'
											: 'text-gray-600'
									}`}
								>
									{variation.hex}
								</div>
							</div>
							<div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
								<Copy className='w-3 h-3 text-gray-500' />
							</div>
						</button>
					);
				})}
			</div>
		);
	};

	return (
		<div className='pt-4 border-t border-gray-200'>
			<button
				onClick={() =>
					updateUiStates({ showVariations: !showVariations })
				}
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

			{showVariations && (
				<div className='mt-4 space-y-4'>
					{/* Tints Section */}
					<div className='bg-gray-50 p-3 rounded-lg'>
						<button
							onClick={() => setShowTints(!showTints)}
							className='w-full flex justify-between items-center'
						>
							<h4 className='text-gray-700 text-sm font-medium'>
								Tints
							</h4>
							{showTints ? (
								<ChevronUp className='w-4 h-4 text-gray-500' />
							) : (
								<ChevronDown className='w-4 h-4 text-gray-500' />
							)}
						</button>
						{showTints && (
							<>
								<p className='text-xs text-gray-500 mt-2 text-center'>
									Tints are created by adding white to a
									color, making it lighter.
								</p>
								{renderVariationGrid(tints, 'tint')}
							</>
						)}
					</div>

					{/* Shades Section */}
					<div className='bg-gray-50 p-3 rounded-lg'>
						<button
							onClick={() => setShowShades(!showShades)}
							className='w-full flex justify-between items-center'
						>
							<h4 className='text-gray-700 text-sm font-medium'>
								Shades
							</h4>
							{showShades ? (
								<ChevronUp className='w-4 h-4 text-gray-500' />
							) : (
								<ChevronDown className='w-4 h-4 text-gray-500' />
							)}
						</button>
						{showShades && (
							<>
								<p className='text-xs text-gray-500 mt-2 text-center'>
									Shades are created by adding black to a
									color, making it darker.
								</p>
								{renderVariationGrid(shades, 'shade')}
							</>
						)}
					</div>

					<div className='text-center text-gray-500 text-xs'>
						💡 Click any color to copy its hex value to clipboard
					</div>
				</div>
			)}
		</div>
	);
};

export default ColorVariations;
