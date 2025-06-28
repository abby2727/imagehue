import { Link } from 'react-router-dom';
import { Palette, Bug, ExternalLink } from 'lucide-react';
import packageJson from '../../package.json';

const Header = () => {
	return (
		<header className='bg-white border-b border-gray-200 shadow-sm'>
			<div className='max-w-7xl mx-auto px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Link
							to='/'
							className='hover:scale-110 transition-transform duration-200'
						>
							<Palette className='w-8 h-8 text-gray-700' />
						</Link>
						<div>
							<Link
								to='/'
								className='inline-block hover:scale-105 transition-transform duration-200'
							>
								<h1 className='text-2xl font-bold text-gray-800'>
									ImageHue
								</h1>
							</Link>
							<p className='text-sm text-gray-600 hidden sm:block'>
								Professional Image Color Picker & Pixel Color
								Extractor Tool
							</p>
						</div>
					</div>

					<div className='hidden md:flex flex-col items-end gap-2'>
						<span className='bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full'>
							v{packageJson.version}
						</span>
						<a
							href='mailto:abbydev261@gmail.com?subject=Bug Report - ImageHue&body=Hi,%0D%0A%0D%0AI found a bug in ImageHue:%0D%0A%0D%0A(explain what happen and include images if possible...)%0D%0A%0D%0AThanks!'
							className='inline-flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium px-2 py-1 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md'
						>
							<Bug className='w-3 h-3' />
							Found a bug? Report here
							<ExternalLink className='w-2 h-2' />
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
