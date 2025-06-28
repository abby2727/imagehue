import { useRef, useEffect } from 'react';

const MagnifyingGlass = ({
	isVisible,
	mousePosition,
	sourceCanvas,
	zoomLevel = 8,
	size = 120
}) => {
	const magnifyCanvasRef = useRef(null);

	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		) || window.innerWidth < 768;

	useEffect(() => {
		if (!isVisible || !sourceCanvas || !mousePosition) return;

		const magnifyCanvas = magnifyCanvasRef.current;
		const magnifyCtx = magnifyCanvas.getContext('2d', {
			willReadFrequently: true
		});
		const sourceCtx = sourceCanvas.getContext('2d', {
			willReadFrequently: true
		});

		if (!magnifyCtx || !sourceCtx) return;

		magnifyCtx.clearRect(0, 0, size, size);

		// Calculate source area to magnify
		const sourceSize = size / zoomLevel;
		const halfSourceSize = sourceSize / 2;

		// Get source canvas bounds for scaling mouse position
		const rect = sourceCanvas.getBoundingClientRect();
		const scaleX = sourceCanvas.width / rect.width;
		const scaleY = sourceCanvas.height / rect.height;

		// Convert mouse position to canvas coordinates
		const canvasX = (mousePosition.x - rect.left) * scaleX;
		const canvasY = (mousePosition.y - rect.top) * scaleY;

		// Calculate source rectangle bounds
		let sourceX = canvasX - halfSourceSize;
		let sourceY = canvasY - halfSourceSize;

		// Ensure we don't go outside canvas bounds
		sourceX = Math.max(
			0,
			Math.min(sourceCanvas.width - sourceSize, sourceX)
		);
		sourceY = Math.max(
			0,
			Math.min(sourceCanvas.height - sourceSize, sourceY)
		);

		try {
			const imageData = sourceCtx.getImageData(
				sourceX,
				sourceY,
				sourceSize,
				sourceSize
			);

			// Create a temporary canvas to draw the zoomed image
			const tempCanvas = document.createElement('canvas');
			tempCanvas.width = sourceSize;
			tempCanvas.height = sourceSize;
			const tempCtx = tempCanvas.getContext('2d', {
				willReadFrequently: true
			});
			tempCtx.putImageData(imageData, 0, 0);

			magnifyCtx.save();

			magnifyCtx.beginPath();
			magnifyCtx.arc(size / 2, size / 2, size / 2 - 2, 0, 2 * Math.PI);
			magnifyCtx.clip();

			magnifyCtx.drawImage(
				tempCanvas,
				0,
				0,
				sourceSize,
				sourceSize,
				0,
				0,
				size,
				size
			);

			magnifyCtx.restore();

			drawGrid(magnifyCtx, size, zoomLevel);

			drawBorder(magnifyCtx, size);

			drawCenterSquare(magnifyCtx, size, zoomLevel);
		} catch (error) {
			console.warn('Error drawing magnifying glass:', error);
		}
	}, [isVisible, mousePosition, sourceCanvas, zoomLevel, size, isMobile]);

	/**
	 * Draw grid overlay on the magnifying glass
	 */
	const drawGrid = (ctx, canvasSize, zoom) => {
		ctx.save();
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
		ctx.lineWidth = 0.5;

		const gridSize = canvasSize / zoom;

		// Draw vertical lines
		for (let i = 0; i <= zoom; i++) {
			const x = i * gridSize;
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvasSize);
			ctx.stroke();
		}

		// Draw horizontal lines
		for (let i = 0; i <= zoom; i++) {
			const y = i * gridSize;
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvasSize, y);
			ctx.stroke();
		}

		ctx.restore();
	};

	// Draw border around the magnifying glass
	const drawBorder = (ctx, canvasSize) => {
		ctx.save();
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(
			canvasSize / 2,
			canvasSize / 2,
			canvasSize / 2 - 1.5,
			0,
			2 * Math.PI
		);
		ctx.stroke();

		ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(
			canvasSize / 2,
			canvasSize / 2,
			canvasSize / 2 - 4,
			0,
			2 * Math.PI
		);
		ctx.stroke();

		ctx.restore();
	};

	// Draw a semi-transparent square in the center of the magnifying glass
	const drawCenterSquare = (ctx, canvasSize, zoom) => {
		ctx.save();

		const gridSize = canvasSize / zoom;
		const center = canvasSize / 2;

		const centerGridX = Math.floor(zoom / 2);
		const centerGridY = Math.floor(zoom / 2);

		const squareX = centerGridX * gridSize;
		const squareY = centerGridY * gridSize;

		ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
		ctx.fillRect(squareX, squareY, gridSize, gridSize);

		ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.lineWidth = 2;
		ctx.strokeRect(squareX, squareY, gridSize, gridSize);

		ctx.restore();
	};

	if (!isVisible || !mousePosition) {
		return null;
	}

	// Calculate smart positioning to keep magnifier visible and close to cursor
	const margin = 10;
	const defaultOffsetX = 25;
	const defaultOffsetY = -25;

	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	let offsetX = defaultOffsetX;
	let offsetY = defaultOffsetY;

	if (mousePosition.x + offsetX + size > viewportWidth - margin) {
		offsetX = -size - 25;
	}

	if (mousePosition.x + offsetX < margin) {
		offsetX = 25;
	}

	if (mousePosition.y + offsetY < margin) {
		offsetY = 25;
	}

	if (mousePosition.y + offsetY + size > viewportHeight - margin) {
		offsetY = -size - 25;
	}

	return (
		<div
			className='magnifying-glass fixed z-[10001]'
			style={{
				left: mousePosition.x + offsetX,
				top: mousePosition.y + offsetY,
				width: size,
				height: size,
				pointerEvents: 'none'
			}}
		>
			<canvas
				ref={magnifyCanvasRef}
				width={size}
				height={size}
				className='rounded-full shadow-lg border-2 border-white/20'
				style={{
					background:
						'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 100%)'
				}}
			/>

			<div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded whitespace-nowrap'>
				{isMobile
					? `${zoomLevel}x zoom`
					: `${zoomLevel}x zoom - Hold Ctrl`}
			</div>
		</div>
	);
};

export default MagnifyingGlass;
