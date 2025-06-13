import React from 'react';
import { Palette } from 'lucide-react';

/**
 * Header Component
 * Displays the application title, logo, and description as a top navigation bar
 */
const Header = () => {
	return (
		<header className='bg-white border-b border-gray-200 shadow-sm'>
			<div className='max-w-6xl mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					{/* Logo and Title */}
					<div className='flex items-center gap-3'>
						<Palette className='w-8 h-8 text-gray-700' />
						<div>
							<h1 className='text-2xl font-bold text-gray-800'>
								PixelPick
							</h1>
							<p className='text-sm text-gray-600 hidden sm:block'>
								Professional Color Picker & Image Color
								Extractor
							</p>
						</div>
					</div>

					{/* Version Badge (optional) */}
					<div className='hidden md:flex items-center gap-3'>
						<span className='bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full'>
							v2.0
						</span>
						<span className='text-sm text-gray-500'>
							Free & Open Source
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
