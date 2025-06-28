import { Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import FeedbackMessage from './components/FeedbackMessage';
import SEOHead from './components/SEOHead';
import ImageColorPicker from './pages/ImageColorPicker';
import VisualColorPicker from './pages/VisualColorPicker';

const App = () => {
	return (
		<AppProvider>
			<AppContent />
		</AppProvider>
	);
};

const AppContent = () => {
	const { feedback } = useAppContext();

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col'>
			<SEOHead />
			<Header />

			<div className='px-4 pt-4'>
				<div className='max-w-7xl mx-auto flex justify-center'>
					<Navigation />
				</div>
			</div>

			{/* Main Content */}
			<Routes>
				<Route path='/' element={<ImageColorPicker />} />
				<Route path='/color-picker' element={<VisualColorPicker />} />
			</Routes>

			<Footer />
			<FeedbackMessage message={feedback} />
		</div>
	);
};

export default App;
