import React from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Palette } from 'lucide-react';

const Navigation = () => {
	return (
		<nav className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-1'>
			<div className='flex space-x-1'>
				<NavLink
					to='/'
					className={({ isActive }) =>
						`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
							isActive
								? 'bg-white text-gray-800 shadow-lg'
								: 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
						}`
					}
				>
					<Image size={20} />
					<span>Pick from Image</span>
				</NavLink>

				<NavLink
					to='/color-picker'
					className={({ isActive }) =>
						`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
							isActive
								? 'bg-white text-gray-800 shadow-lg'
								: 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
						}`
					}
				>
					<Palette size={20} />
					<span>Visual Picker</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default Navigation;
