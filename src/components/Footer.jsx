import React from 'react';
import { Heart, Coffee, Github, ExternalLink } from 'lucide-react';

/**
 * Footer Component
 * Contains app information, links, and Buy Me a Coffee button
 */
const Footer = () => {
	return (
		<footer className='mt-12 border-t border-gray-200 bg-gray-50'>
			<div className='max-w-6xl mx-auto px-4 py-6'>
				<div className='flex flex-col md:flex-row justify-between items-center gap-6'>
					{/* Support Section */}
					<div className='text-center md:text-left'>
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
							Free to use, but your support helps keep it going.
						</p>
					</div>

					{/* Made with React */}
					<div className='text-center md:text-right'>
						<p className='text-gray-500 text-sm'>
							Made with{' '}
							<Heart className='w-4 h-4 text-red-500 inline' />{' '}
							using React.js
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
