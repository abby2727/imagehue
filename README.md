# PixelPick - Color Picker Tool

A modern, responsive web application that allows users to upload or paste images and extract color values (Hex and RGB) by clicking on any pixel in the image.

## Features

-   🖼️ **Image Upload**: Upload images from your device
-   📋 **Clipboard Support**: Paste images directly from clipboard (Ctrl+V / Cmd+V)
-   🎨 **Color Picking**: Click any pixel to get its exact color values
-   📝 **Multiple Formats**: Get both Hex (#RRGGBB) and RGB (r, g, b) values
-   📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
-   🎯 **One-Click Copy**: Copy color values to clipboard instantly
-   🔄 **Reset Function**: Clear current image and start fresh
-   🌐 **Default Sample**: Loads with a beautiful default image

## Technologies Used

-   **React.js** - Frontend framework with ES6 syntax
-   **Vite** - Fast build tool and development server
-   **Tailwind CSS** - Utility-first CSS framework for styling
-   **Lucide React** - Beautiful icon library
-   **HTML Canvas API** - For image manipulation and color extraction
-   **Clipboard API** - For copying color values and pasting images

## Getting Started

### Prerequisites

-   Node.js (version 16 or higher)
-   npm or yarn package manager

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Usage

1. **Load an Image**:

    - Click "Upload Image" to select a file from your device
    - Or paste an image from clipboard using Ctrl+V (Cmd+V on Mac)
    - The app loads with a default colorful image for immediate use

2. **Pick Colors**:

    - Click anywhere on the image to select that pixel's color
    - The color information will appear in the right panel

3. **Copy Color Values**:

    - Use the copy buttons next to each color value
    - Or click the larger "Copy Hex" / "Copy RGB" buttons
    - Values are automatically copied to your clipboard

4. **Reset**:
    - Click the "Reset" button to clear the current image and start fresh

## File Structure

```
pixelpick/
├── public/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles and Tailwind imports
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite build configuration
└── README.md           # This file
```

## Browser Compatibility

-   Chrome 63+ (full features including Clipboard API)
-   Firefox 53+ (clipboard paste requires user permission)
-   Safari 13.1+ (limited clipboard support)
-   Edge 79+

For older browsers, the app gracefully falls back to `document.execCommand('copy')` for copying functionality.

## Deployment

The application is built for static hosting and can be deployed to:

-   **Hostinger Shared Hosting** (upload `dist` folder contents)
-   **Netlify** (drag & drop `dist` folder)
-   **Vercel** (connect GitHub repository)
-   **GitHub Pages** (serve from `dist` folder)
-   Any other static hosting service

### Deployment Steps for Hostinger:

1. Run `npm run build`
2. Upload all contents of the `dist` folder to your hosting directory
3. Ensure the uploaded `index.html` is in the root directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please create an issue in the repository or contact the development team.

---

Built with ❤️ using React.js and modern web technologies.
