import { NavLink } from 'react-router-dom';
import { Image, Palette } from 'lucide-react';

const Navigation = () => {
	return (
		<nav className='bg-white shadow-lg border border-gray-200 rounded-xl sm:rounded-2xl p-1 sm:p-2 max-w-fit mx-auto'>
			<div className='flex space-x-1 sm:space-x-2'>
				<NavLink
					to='/'
					className={({ isActive }) =>
						`flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
							isActive
								? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg sm:shadow-xl shadow-blue-500/25'
								: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200'
						}`
					}
				>
					<Image size={18} className='sm:w-[22px] sm:h-[22px]' />
					<span className='text-sm sm:text-base'>
						Pick from Image
					</span>
				</NavLink>

				<NavLink
					to='/color-picker'
					className={({ isActive }) =>
						`flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
							isActive
								? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg sm:shadow-xl shadow-purple-500/25'
								: 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 border-2 border-transparent hover:border-purple-200'
						}`
					}
				>
					<Palette size={18} className='sm:w-[22px] sm:h-[22px]' />
					<span className='text-sm sm:text-base'>Visual Picker</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default Navigation;
