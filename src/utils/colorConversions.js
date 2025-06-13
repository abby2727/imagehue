/**
 * Color Conversion Utilities
 * Functions to convert RGB colors to various color spaces
 */

/**
 * Convert RGB to HSL
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {object} HSL values
 */
export const rgbToHsl = (r, g, b) => {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100)
	};
};

/**
 * Convert RGB to XYZ
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {object} XYZ values
 */
export const rgbToXyz = (r, g, b) => {
	// Normalize RGB values
	r = r / 255;
	g = g / 255;
	b = b / 255;

	// Apply gamma correction
	r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
	g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
	b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

	// Observer = 2°, Illuminant = D65
	const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
	const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
	const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;

	return {
		x: Math.round(x * 100 * 100) / 100,
		y: Math.round(y * 100 * 100) / 100,
		z: Math.round(z * 100 * 100) / 100
	};
};

/**
 * Convert RGB to CMYK
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {object} CMYK values
 */
export const rgbToCmyk = (r, g, b) => {
	r /= 255;
	g /= 255;
	b /= 255;

	const k = 1 - Math.max(r, Math.max(g, b));
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return {
		c: Math.round(c * 100),
		m: Math.round(m * 100),
		y: Math.round(y * 100),
		k: Math.round(k * 100)
	};
};

/**
 * Convert XYZ to LAB
 * @param {number} x - X value
 * @param {number} y - Y value
 * @param {number} z - Z value
 * @returns {object} LAB values
 */
export const xyzToLab = (x, y, z) => {
	// Reference white D65
	const xn = 95.047;
	const yn = 100.0;
	const zn = 108.883;

	x = x / xn;
	y = y / yn;
	z = z / zn;

	const fx = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
	const fy = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
	const fz = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

	const l = 116 * fy - 16;
	const a = 500 * (fx - fy);
	const b_lab = 200 * (fy - fz);

	return {
		l: Math.round(l * 100) / 100,
		a: Math.round(a * 100) / 100,
		b: Math.round(b_lab * 100) / 100
	};
};

/**
 * Convert RGB to LAB (via XYZ)
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {object} LAB values
 */
export const rgbToLab = (r, g, b) => {
	const xyz = rgbToXyz(r, g, b);
	return xyzToLab(xyz.x, xyz.y, xyz.z);
};

/**
 * Convert XYZ to LUV
 * @param {number} x - X value
 * @param {number} y - Y value
 * @param {number} z - Z value
 * @returns {object} LUV values
 */
export const xyzToLuv = (x, y, z) => {
	// Reference white D65
	const xn = 95.047;
	const yn = 100.0;
	const zn = 108.883;

	const u_prime = (4 * x) / (x + 15 * y + 3 * z) || 0;
	const v_prime = (9 * y) / (x + 15 * y + 3 * z) || 0;
	const un_prime = (4 * xn) / (xn + 15 * yn + 3 * zn);
	const vn_prime = (9 * yn) / (xn + 15 * yn + 3 * zn);

	const yr = y / yn;
	const l = yr > 0.008856 ? 116 * Math.pow(yr, 1 / 3) - 16 : 903.3 * yr;
	const u = 13 * l * (u_prime - un_prime);
	const v = 13 * l * (v_prime - vn_prime);

	return {
		l: Math.round(l * 100) / 100,
		u: Math.round(u * 100) / 100,
		v: Math.round(v * 100) / 100
	};
};

/**
 * Convert RGB to LUV (via XYZ)
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {object} LUV values
 */
export const rgbToLuv = (r, g, b) => {
	const xyz = rgbToXyz(r, g, b);
	return xyzToLuv(xyz.x, xyz.y, xyz.z);
};

/**
 * Convert RGB to HWB
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {object} HWB values
 */
export const rgbToHwb = (r, g, b) => {
	const hsl = rgbToHsl(r, g, b);

	r /= 255;
	g /= 255;
	b /= 255;

	const w = Math.min(r, g, b);
	const b_hwb = 1 - Math.max(r, g, b);

	return {
		h: hsl.h,
		w: Math.round(w * 100),
		b: Math.round(b_hwb * 100)
	};
};

/**
 * Get all color format conversions for RGB values
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {object} All color format conversions
 */
export const getAllColorFormats = (r, g, b) => {
	const hsl = rgbToHsl(r, g, b);
	const xyz = rgbToXyz(r, g, b);
	const cmyk = rgbToCmyk(r, g, b);
	const lab = rgbToLab(r, g, b);
	const luv = rgbToLuv(r, g, b);
	const hwb = rgbToHwb(r, g, b);

	return {
		hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
		hslValues: hsl,
		xyz: `xyz(${xyz.x}, ${xyz.y}, ${xyz.z})`,
		xyzValues: xyz,
		cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
		cmykValues: cmyk,
		lab: `lab(${lab.l}, ${lab.a}, ${lab.b})`,
		labValues: lab,
		luv: `luv(${luv.l}, ${luv.u}, ${luv.v})`,
		luvValues: luv,
		hwb: `hwb(${hwb.h}, ${hwb.w}%, ${hwb.b}%)`,
		hwbValues: hwb
	};
};
