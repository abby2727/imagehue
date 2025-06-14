import React from 'react';
import { Palette, Coffee, ExternalLink } from 'lucide-react';
import packageJson from '../../package.json';

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
								ImageHue
							</h1>
							<p className='text-sm text-gray-600 hidden sm:block'>
								Professional Image Color Picker & Pixel Color
								Extractor Tool
							</p>
						</div>
					</div>

					{/* Version Badge and Buy Me a Coffee */}
					<div className='hidden md:flex flex-col items-end gap-2'>
						<span className='bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full'>
							v{packageJson.version}
						</span>
						<a
							href='https://coff.ee/abby2727'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-xs font-medium px-2 py-1 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md'
						>
							<Coffee className='w-3 h-3' />
							Buy Me a Coffee
							<ExternalLink className='w-2 h-2' />
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
