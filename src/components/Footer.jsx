import { Heart, Coffee, ExternalLink } from 'lucide-react';

const Footer = () => {
	return (
		<footer className='mt-12 border-t border-gray-200 bg-gray-50'>
			<div className='max-w-7xl mx-auto px-6 py-6'>
				<div className='flex flex-col md:flex-row justify-between items-center gap-6'>
					<div className='text-center md:text-left'>
						<h4 className='font-semibold text-gray-800 mb-3'>
							Support the Project
						</h4>
						<a
							href='https://www.buymeacoffee.com/abby2727'
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
					<div className='text-center md:text-right'>
						<p className='text-gray-500 text-sm'>
							Made with{' '}
							<Heart className='w-4 h-4 text-red-500 inline transition-all duration-300 hover:text-red-600 hover:fill-red-600 hover:scale-110 cursor-pointer' />
						</p>
						<p className='text-gray-400 text-xs mt-2 max-w-md'>
							Extract exact color values from images • Hex, RGB,
							HSL codes • Free online tool for designers &
							developers
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
