import React from 'react';
import { useLocation } from 'react-router-dom';

const SEOHead = () => {
	const location = useLocation();
	const baseUrl = 'https://imagehue.com';

	// Define page-specific meta data
	const pageData = {
		'/': {
			title: 'ImageHue - Free Online Image Color Picker Tool | Extract Colors from Images | Pixel Color Detector',
			description:
				'Free online image color picker tool. Upload images or paste from clipboard to extract exact color values. Get Hex, RGB, HSL codes from any pixel. Professional color picker with magnifying glass, color variations, and one-click copy.',
			canonical: baseUrl + '/',
			ogTitle:
				'ImageHue - Free Online Image Color Picker Tool | Extract Colors from Images',
			ogDescription:
				'Professional image color picker tool. Upload images to extract exact color values (Hex, RGB, HSL). Features magnifying glass, color variations, clipboard support, and one-click copy.',
			keywords:
				'image color picker, pixel color tool, color picker from image, extract colors from image, image pixel color detector, online color picker, hex color picker, rgb color picker'
		},
		'/color-picker': {
			title: 'Visual Color Picker - ImageHue | Interactive Color Wheel & Palette Tool',
			description:
				'Interactive visual color picker with color wheel and palette. Select colors by hue, saturation, and brightness. Get Hex, RGB, HSL codes instantly. Perfect for designers and developers.',
			canonical: baseUrl + '/color-picker',
			ogTitle:
				'Visual Color Picker - ImageHue | Interactive Color Wheel Tool',
			ogDescription:
				'Interactive visual color picker tool for selecting colors by wheel and palette. Get precise color codes in multiple formats.',
			keywords:
				'visual color picker, color wheel, color palette, interactive color picker, hue selector, saturation picker, color tool'
		}
	};

	const currentPage = pageData[location.pathname] || pageData['/'];

	React.useEffect(() => {
		document.title = currentPage.title;

		const metaDescription = document.querySelector(
			'meta[name="description"]'
		);
		if (metaDescription) {
			metaDescription.setAttribute('content', currentPage.description);
		}

		let canonicalLink = document.querySelector('link[rel="canonical"]');
		if (canonicalLink) {
			canonicalLink.setAttribute('href', currentPage.canonical);
		} else {
			canonicalLink = document.createElement('link');
			canonicalLink.setAttribute('rel', 'canonical');
			canonicalLink.setAttribute('href', currentPage.canonical);
			document.head.appendChild(canonicalLink);
		}

		const ogUrl = document.querySelector('meta[property="og:url"]');
		if (ogUrl) {
			ogUrl.setAttribute('content', currentPage.canonical);
		}

		const ogTitle = document.querySelector('meta[property="og:title"]');
		if (ogTitle) {
			ogTitle.setAttribute('content', currentPage.ogTitle);
		}

		const ogDescription = document.querySelector(
			'meta[property="og:description"]'
		);
		if (ogDescription) {
			ogDescription.setAttribute('content', currentPage.ogDescription);
		}

		const twitterUrl = document.querySelector('meta[name="twitter:url"]');
		if (twitterUrl) {
			twitterUrl.setAttribute('content', currentPage.canonical);
		}

		const twitterTitle = document.querySelector(
			'meta[name="twitter:title"]'
		);
		if (twitterTitle) {
			twitterTitle.setAttribute('content', currentPage.ogTitle);
		}

		const twitterDescription = document.querySelector(
			'meta[name="twitter:description"]'
		);
		if (twitterDescription) {
			twitterDescription.setAttribute(
				'content',
				currentPage.ogDescription
			);
		}

		const metaKeywords = document.querySelector('meta[name="keywords"]');
		if (metaKeywords) {
			metaKeywords.setAttribute('content', currentPage.keywords);
		}
	}, [location.pathname, currentPage]);

	return null;
};

export default SEOHead;
