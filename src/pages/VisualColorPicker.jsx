import React from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import ColorInfoPanel from '../components/ColorInfoPanel';
import { useAppContext } from '../contexts/AppContext';
import useClipboard from '../hooks/useClipboard';

const VisualColorPicker = () => {
	const {
		visualPickerState,
		updateVisualPickerColor,
		feedback,
		setFeedback
	} = useAppContext();

	const showFeedback = (message, duration = 2000) => {
		setFeedback(message);
		setTimeout(() => setFeedback(null), duration);
	};
	const { copyToClipboard } = useClipboard(showFeedback);

	const { colorValue, selectedColor } = visualPickerState;

	return (
		<main className='flex-1 px-4 py-8'>
			<div className='max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Left Column - Color Picker */}
					<div className='space-y-6'>
						<div className='bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg'>
							<h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
								<span className='bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>
									Visual Color Picker
								</span>
							</h2>

							<div className='space-y-6'>
								{/* Color Picker */}
								<div className='flex flex-col items-center space-y-4'>
									<div className='color-picker-container'>
										<HexColorPicker
											color={colorValue}
											onChange={updateVisualPickerColor}
										/>
									</div>

									{/* Color Input */}
									<div className='w-full max-w-xs'>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Hex Color
										</label>
										<HexColorInput
											color={colorValue}
											onChange={updateVisualPickerColor}
											className='w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
											placeholder='#000000'
										/>
									</div>

									{/* Color Preview */}
									<div className='w-full max-w-xs'>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Color Preview
										</label>
										<div
											className='w-full h-16 rounded-lg border-2 border-gray-300 shadow-inner'
											style={{
												backgroundColor: colorValue
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Color Information */}
					<div className='space-y-6'>
						<ColorInfoPanel
							selectedColor={selectedColor}
							onCopy={copyToClipboard}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default VisualColorPicker;
