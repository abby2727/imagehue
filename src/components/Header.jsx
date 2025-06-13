import React from 'react';
import { Palette } from 'lucide-react';

/**
 * Header Component
 * Displays the application title, logo, and description
 */
const Header = () => {
	return (
		<header className='text-center mb-8'>
			<div className='flex items-center justify-center gap-3 mb-4'>
				<Palette className='w-10 h-10 text-gray-700' />
				<h1 className='text-4xl font-bold text-gray-800'>PixelPick</h1>
			</div>
			<p className='text-gray-600 text-lg'>
				Upload or paste an image, then click any pixel to get its color
				values
			</p>
		</header>
	);
};

export default Header;
