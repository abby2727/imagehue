/**
 * Color Variations Utilities
 * Functions to generate tints and shades of colors
 */

/**
 * Convert hex to RGB
 * @param {string} hex - Hex color value
 * @returns {object} RGB values
 */
export const hexToRgb = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
		  }
		: null;
};

/**
 * Convert RGB to hex
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} Hex color value
 */
export const rgbToHex = (r, g, b) => {
	const toHex = (c) => {
		const hex = Math.round(Math.max(0, Math.min(255, c))).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Generate a tint (lighter version) of a color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @param {number} factor - Tint factor (0-1, where 1 = white)
 * @returns {object} RGB values for tint
 */
export const getTint = (r, g, b, factor) => {
	return {
		r: Math.round(r + (255 - r) * factor),
		g: Math.round(g + (255 - g) * factor),
		b: Math.round(b + (255 - b) * factor)
	};
};

/**
 * Generate a shade (darker version) of a color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @param {number} factor - Shade factor (0-1, where 1 = black)
 * @returns {object} RGB values for shade
 */
export const getShade = (r, g, b, factor) => {
	return {
		r: Math.round(r * (1 - factor)),
		g: Math.round(g * (1 - factor)),
		b: Math.round(b * (1 - factor))
	};
};

/**
 * Generate color variations from 0% to 100%
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @param {number} steps - Number of variations to generate
 * @returns {array} Array of color variations
 */
export const generateColorVariations = (r, g, b, steps = 11) => {
	const variations = [];

	for (let i = 0; i < steps; i++) {
		const percentage = (i / (steps - 1)) * 100;
		let color;

		if (percentage === 0) {
			// 0% = Pure white
			color = { r: 255, g: 255, b: 255 };
		} else if (percentage === 100) {
			// 100% = Pure black
			color = { r: 0, g: 0, b: 0 };
		} else if (percentage < 50) {
			// 0-50% = Tints (lighter versions)
			const factor = (50 - percentage) / 50;
			color = getTint(r, g, b, factor);
		} else if (percentage === 50) {
			// 50% = Original color
			color = { r, g, b };
		} else {
			// 50-100% = Shades (darker versions)
			const factor = (percentage - 50) / 50;
			color = getShade(r, g, b, factor);
		}

		const hex = rgbToHex(color.r, color.g, color.b);

		variations.push({
			percentage: Math.round(percentage),
			hex,
			rgb: `rgb(${color.r}, ${color.g}, ${color.b})`,
			r: color.r,
			g: color.g,
			b: color.b
		});
	}

	return variations;
};

/**
 * Get the closest variation percentage for a given color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {number} Closest percentage (0-100)
 */
export const getColorLightness = (r, g, b) => {
	// Convert to relative luminance
	const normalize = (c) => {
		c = c / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	};

	const rNorm = normalize(r);
	const gNorm = normalize(g);
	const bNorm = normalize(b);

	const luminance = 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;

	// Convert luminance to percentage (0 = black, 100 = white)
	return Math.round((1 - luminance) * 100);
};
