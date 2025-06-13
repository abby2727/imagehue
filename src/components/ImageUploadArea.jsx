import React from 'react';
import { Upload } from 'lucide-react';

/**
 * ImageUploadArea Component
 * Displays the upload placeholder when no image is loaded
 */
const ImageUploadArea = () => {
	return (
		<div className='absolute inset-0 flex items-center justify-center'>
			<div className='upload-area w-full h-full flex items-center justify-center'>
				<div className='text-gray-500'>
					<Upload className='w-12 h-12 mx-auto mb-4' />
					<p className='text-lg font-medium'>
						Click to upload an image
					</p>
					<p className='text-sm'>or use the paste button above</p>
				</div>
			</div>
		</div>
	);
};

export default ImageUploadArea;
