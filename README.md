# Smooth Scroll Libraries Demo Site

A comprehensive static website for testing, comparing, and configuring 6 popular smooth scroll libraries. This is a 100% static site with all assets hosted locally - no external CDN dependencies.

## 🚀 Quick Start

1. **Setup**: Open `index.html` in a modern web browser
2. **Configure**: Select a library and adjust settings in real-time
3. **Test**: Visit demo pages to see smooth scrolling in action
4. **Debug**: Use debug pages for performance monitoring and troubleshooting

## 📚 Supported Libraries

### 1. Native CSS Smooth Scroll
- **Files**: No external dependencies (pure CSS)
- **Version**: Native browser implementation
- **Features**: Zero dependencies, lightweight, accessibility-friendly

### 2. Lenis
- **Files**: `libs/lenis.css`, `libs/lenis.min.js`
- **Version**: 1.0.42
- **Features**: Lightweight, performant, lerp-based interpolation

### 3. GSAP ScrollTrigger
- **Files**: `libs/gsap.min.js`, `libs/ScrollTrigger.min.js`
- **Version**: 3.12.2
- **Features**: Professional animations, scroll-triggered effects

### 4. Locomotive Scroll
- **Files**: `libs/locomotive-scroll.min.css`, `libs/locomotive-scroll.min.js`
- **Version**: 4.1.4
- **Features**: Parallax effects, in-view detection

### 5. Smooth Scrollbar
- **Files**: `libs/smooth-scrollbar.min.js`
- **Version**: 8.8.4
- **Features**: Custom scrollbars, touch support

### 6. jQuery Smooth Scroll
- **Files**: `libs/jquery.min.js`, `libs/jquery.smooth-scroll.min.js`
- **Version**: jQuery 3.7.1, Plugin 2.2.0
- **Features**: Classic jQuery implementation, callback support

## 🏗️ File Structure

```
mws-static-smooth-scroll-v2/
├── libs/                           # Local library files
│   ├── lenis.min.js
│   ├── lenis.css
│   ├── gsap.min.js
│   ├── ScrollTrigger.min.js
│   ├── locomotive-scroll.min.js
│   ├── locomotive-scroll.min.css
│   ├── smooth-scrollbar.min.js
│   ├── jquery.min.js
│   └── jquery.smooth-scroll.min.js
├── index.html                      # Main configuration interface
├── styles.css                      # Global responsive styles
├── scripts.js                      # Core JavaScript with library configs
├── native-css.html                 # Native CSS demo page
├── native-css-debug.html           # Native CSS debug page
├── lenis.html                      # Lenis demo page
├── lenis-debug.html                # Lenis debug page
├── gsap-scrolltrigger.html         # GSAP ScrollTrigger demo page
├── gsap-scrolltrigger-debug.html   # GSAP ScrollTrigger debug page
├── locomotive.html                 # Locomotive Scroll demo page
├── locomotive-debug.html           # Locomotive Scroll debug page
├── smooth-scrollbar.html           # Smooth Scrollbar demo page
├── smooth-scrollbar-debug.html     # Smooth Scrollbar debug page
├── jquery-smooth-scroll.html       # jQuery Smooth Scroll demo page
├── jquery-smooth-scroll-debug.html # jQuery Smooth Scroll debug page
└── README.md                       # This file
```

## 🎯 Features

### Main Configuration Interface (`index.html`)
- **Master Toggle**: Globally enable/disable smooth scrolling
- **Library Selector**: Choose from 6 different libraries
- **Dynamic Config Panel**: Library-specific options generated from `scripts.js`
- **Assets Info**: Shows which local files are loaded
- **Demo Links**: Quick access to all demo and debug pages
- **Settings Persistence**: Configuration saved in `sessionStorage`

### Demo Pages
Each library has a dedicated demo page with:
- **Long Content**: Multiple sections with anchor navigation
- **Realistic Examples**: Text, image placeholders, video placeholders
- **Navigation Menu**: Smooth scroll links between sections
- **Back to Config**: Easy return to main interface
- **Real-time Config**: Applies settings from main interface

### Debug Pages
Each library includes a debug page featuring:
- **Real-time Metrics**: Scroll position, velocity, progress
- **Performance Monitoring**: FPS, frame times, event tracking
- **Browser Support**: Compatibility detection
- **Interactive Controls**: Test buttons and quick actions
- **Visual Overlays**: Live debug information display

## 🔧 Configuration Options

### Native CSS Smooth Scroll
- Enable/disable toggle
- Target element selector (all links or custom)
- Scroll behavior (smooth/auto)
- Browser fallback support

### Lenis
- Duration, easing, lerp values
- Direction control (vertical/horizontal/both)
- Wheel & touch multipliers
- Sync touch, infinite scroll options
- Custom wrapper element
- Mobile/tablet disable option

### GSAP ScrollTrigger
- Animation duration and lag
- Effects (fade, scale, slide)
- Trigger elements and positions
- Scrub and pin functionality
- Debug markers
- Mobile disable option

### Locomotive Scroll
- Smooth scrolling toggle
- Direction and lerp settings
- In-view class configuration
- Tablet/smartphone support
- Touch and Firefox multipliers
- Custom container attributes

### Smooth Scrollbar
- Damping and thumb size
- Render options and track visibility
- Wheel event targeting
- Overscroll effects
- Text selection and custom colors
- Touch device disable option

### jQuery Smooth Scroll
- Animation speed and easing
- Offset and focus options
- Target link selectors
- Exclude patterns
- Before/after callbacks
- URL hash updates

## 📱 Responsive Design

The site is fully responsive with three breakpoints:
- **Mobile**: ≤640px - Optimized for touch devices
- **Tablet**: 641-1024px - Balanced layout
- **Desktop**: ≥1025px - Full feature set

## 🌐 Browser Compatibility

**Tested Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Requirements:**
- Modern browser with ES6 support
- JavaScript enabled
- Local file access (for file:// protocol)

## 🚀 How to Add a New Library

1. **Download Library Files**: Add CSS/JS files to `libs/` directory
2. **Update `scripts.js`**: Add library configuration to `libraryConfigs` object
3. **Create Initialization Function**: Add `initYourLibrary(opts)` function
4. **Add to HTML**: Update library selector in `index.html`
5. **Create Demo Page**: Follow existing demo page structure
6. **Create Debug Page**: Implement library-specific debug metrics
7. **Test**: Verify all responsive breakpoints and configurations

### Example Library Configuration

```javascript
'your-library': {
  name: 'Your Library Name',
  css: ['libs/your-library.css'],
  js: ['libs/your-library.min.js'],
  options: {
    enable: { type: 'checkbox', default: true },
    speed: { type: 'number', default: 1000, min: 100, max: 5000, step: 100 },
    easing: { type: 'select', choices: ['ease', 'linear', 'ease-in-out'], default: 'ease' },
    intensity: { type: 'range', min: 0, max: 1, step: 0.1, default: 0.5 }
  }
}
```

## 🔍 Debugging

### Common Issues
1. **Library not loading**: Check file paths in `libs/` directory
2. **Configuration not applying**: Verify `sessionStorage` is working
3. **Smooth scroll not working**: Check browser support and library initialization
4. **Mobile issues**: Test responsive breakpoints and mobile-specific settings

### Debug Tools
- Browser Developer Tools console for error messages
- Debug pages for real-time performance monitoring
- Network tab to verify local file loading
- Responsive design mode for mobile testing

## 📄 License

This demo site is for educational and testing purposes. Individual libraries maintain their own licenses:
- Lenis: MIT License
- GSAP: Commercial license required for commercial use
- Locomotive Scroll: MIT License
- Smooth Scrollbar: MIT License
- jQuery: MIT License

## 🤝 Contributing

To contribute improvements:
1. Test changes across all supported browsers
2. Maintain responsive design compatibility
3. Update documentation for new features
4. Follow existing code style and structure
5. Verify all libraries work independently

## 📞 Support

For issues with specific libraries, refer to their official documentation:
- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll)
- [Smooth Scrollbar](https://github.com/idiotWu/smooth-scrollbar)
- [jQuery Smooth Scroll](https://github.com/kswedberg/jquery-smooth-scroll)

---

**Built with ❤️ for the web development community**

