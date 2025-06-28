import { Link } from 'react-router-dom';
import { Palette, Bug, ExternalLink, Github } from 'lucide-react';
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
						<div className='flex items-center gap-3'>
							<span className='text-xs text-gray-500 font-medium tracking-wide'>
								v{packageJson.version}
							</span>
							<div className='w-px h-4 bg-gray-300'></div>
							<a
								href='https://github.com/abby2727/imagehue'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-1.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 border border-gray-700'
							>
								<Github className='w-3.5 h-3.5' />
								Star on GitHub
							</a>
						</div>
						<a
							href='mailto:abbydev261@gmail.com?subject=Bug Report - ImageHue&body=Hi,%0D%0A%0D%0AI found a bug in ImageHue:%0D%0A%0D%0A(explain what happen and include images if possible...)%0D%0A%0D%0AThanks!'
							className='inline-flex items-center gap-1.5 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-150 text-red-700 hover:text-red-800 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-red-200 hover:border-red-300 group relative'
						>
							<Bug className='w-3.5 h-3.5' />
							Found a bug? Report here
							<ExternalLink className='w-3 h-3 opacity-70' />
							<div className='absolute top-full right-0 mt-3 px-4 py-2.5 bg-white text-gray-700 text-xs font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl border border-gray-200 w-56 z-30'>
								<div className='text-center'>
									<div className='text-gray-600 leading-relaxed'>
										You can report the bug directly to
										developer via email, but you can also
										click the Star on GitHub and open an
										issue directly to the repository.
									</div>
								</div>
								<div className='absolute bottom-full right-6 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white'></div>
								<div className='absolute bottom-full right-6 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-gray-200 -translate-y-px'></div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
