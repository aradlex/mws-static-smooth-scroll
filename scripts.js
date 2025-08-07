// Smooth Scroll Libraries Demo - Main JavaScript
console.log('Smooth Scroll Libraries Demo loaded');

// Library configurations with CDN assets
const libraryConfigs = {
    native: {
        name: 'Native CSS Smooth Scroll',
        css: [],
        js: [],
        description: 'Pure CSS implementation using scroll-behavior property'
    },
    lenis: {
        name: 'Lenis',
        css: ['https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.css'],
        js: ['https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js'],
        description: 'Lightweight, robust, performant smooth scroll library'
    },
    gsap: {
        name: 'GSAP ScrollTrigger',
        css: [],
        js: [
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
        ],
        description: 'Professional-grade animation library with scroll triggers'
    },
    locomotive: {
        name: 'Locomotive Scroll',
        css: ['https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.css'],
        js: ['https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js'],
        description: 'Detection of elements in viewport & smooth scrolling with parallax'
    },
    smoothscrollbar: {
        name: 'Smooth Scrollbar',
        css: [],
        js: ['https://cdn.jsdelivr.net/npm/smooth-scrollbar@8.8.4/dist/smooth-scrollbar.js'],
        description: 'Customizable scrollbars for modern web applications'
    },
    jquery: {
        name: 'jQuery Smooth Scroll',
        css: [],
        js: [
            'https://code.jquery.com/jquery-3.7.1.min.js',
            'https://cdn.jsdelivr.net/npm/jquery-smooth-scroll@2.2.0/jquery.smooth-scroll.min.js'
        ],
        description: 'jQuery plugin for smooth scrolling to anchor links'
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing smooth scroll demo');
    
    // Set up library selector
    const librarySelect = document.getElementById('librarySelect');
    if (librarySelect) {
        librarySelect.addEventListener('change', function(e) {
            console.log('Library changed to:', e.target.value);
            // Here you would implement library switching logic
        });
    }
    
    // Set up master toggle
    const masterToggle = document.getElementById('masterToggle');
    if (masterToggle) {
        masterToggle.addEventListener('change', function(e) {
            console.log('Master toggle:', e.target.checked);
            // Here you would implement global enable/disable logic
        });
    }
});
