import React from 'react';
import { Heart, Coffee, Github, ExternalLink } from 'lucide-react';

/**
 * Footer Component
 * Contains app information, links, and Buy Me a Coffee button
 */
const Footer = () => {
	return (
		<footer className='mt-12 border-t border-gray-200 bg-gray-50'>
			<div className='max-w-6xl mx-auto px-4 py-8'>
				<div className='grid md:grid-cols-3 gap-8'>
					{/* App Info */}
					<div className='text-center md:text-left'>
						<h3 className='font-bold text-gray-800 mb-2'>
							PixelPick
						</h3>
						<p className='text-gray-600 text-sm'>
							A powerful color picker tool for extracting colors
							from images and creating custom color palettes.
						</p>
					</div>

					{/* Features */}
					<div className='text-center'>
						<h4 className='font-semibold text-gray-800 mb-2'>
							Features
						</h4>
						<ul className='text-gray-600 text-sm space-y-1'>
							<li>🎨 Visual Color Picker</li>
							<li>📸 Image Color Extraction</li>
							<li>🎯 8 Color Format Support</li>
							<li>🌈 Color Variations Generator</li>
							<li>📋 One-Click Copy</li>
						</ul>
					</div>

					{/* Support */}
					<div className='text-center md:text-right'>
						<h4 className='font-semibold text-gray-800 mb-3'>
							Support the Project
						</h4>

						{/* Buy Me a Coffee Button */}
						<a
							href='https://coff.ee/abby2727'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md'
						>
							<Coffee className='w-4 h-4' />
							Buy Me a Coffee
							<ExternalLink className='w-3 h-3' />
						</a>

						<p className='text-gray-500 text-xs mt-2'>
							Your support helps keep this project alive!
						</p>
					</div>
				</div>

				{/* Bottom Section */}
				<div className='mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center'>
					<p className='text-gray-500 text-sm mb-4 md:mb-0'>
						Made with{' '}
						<Heart className='w-4 h-4 text-red-500 inline' /> using
						React.js
					</p>

					<div className='flex items-center gap-4 text-sm text-gray-500'>
						<span>© 2024 PixelPick</span>
						<span>•</span>
						<span>Free & Open Source</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
