/**
 * Smooth Scroll Libraries Demo - Main JavaScript
 * 
 * This file handles:
 * - Dynamic CDN asset loading
 * - Library configuration management
 * - Cross-page communication
 * - Configuration persistence
 * - Real-time updates
 * 
 * How to add a new smooth scroll library:
 * 1. Add library config to libraryConfigs object
 * 2. Create initialization function in libraryInitializers
 * 3. Add configuration options to HTML
 * 4. Create demo and debug pages
 * 5. Update dropdown options
 */

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

// Global state management
class ScrollLibraryManager {
    constructor() {
        this.currentLibrary = 'native';
        this.loadedAssets = new Set();
        this.libraryInstances = new Map();
        this.config = this.getDefaultConfig();
        this.isEnabled = true;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadStoredConfig();
        this.updateUI();
        this.setupCrossPageCommunication();
    }
    
    bindEvents() {
        // Master toggle
        const masterToggle = document.getElementById('masterToggle');
        if (masterToggle) {
            masterToggle.addEventListener('change', (e) => {
                this.isEnabled = e.target.checked;
                this.saveConfig();
                this.broadcastConfigChange();
            });
        }
        
        // Library selector
        const librarySelect = document.getElementById('librarySelect');
        if (librarySelect) {
            librarySelect.addEventListener('change', (e) => {
                this.switchLibrary(e.target.value);
            });
        }
        
        // Configuration inputs
        this.bindConfigInputs();
        
        // Export/Import buttons
        this.bindExportImportButtons();
        
        // Reset button
        const resetButton = document.getElementById('resetConfig');
        if (resetButton) {
            resetButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetToDefaults();
            });
        }
        
        // Range input updates
        this.bindRangeInputs();
        
        // Conditional input visibility
        this.bindConditionalInputs();
    }
    
    bindConfigInputs() {
        // Get all config inputs and bind change events
        const configInputs = document.querySelectorAll('#configContainer input, #configContainer select');
        configInputs.forEach(input => {
            const eventType = input.type === 'range' ? 'input' : 'change';
            input.addEventListener(eventType, () => {
                this.updateConfigFromInputs();
                this.saveConfig();
                this.broadcastConfigChange();
            });
        });
    }
    
    bindRangeInputs() {
        const rangeInputs = document.querySelectorAll('input[type="range"]');
        rangeInputs.forEach(input => {
            const updateValue = () => {
                const valueSpan = input.nextElementSibling;
                if (valueSpan && valueSpan.classList.contains('range-value')) {
                    valueSpan.textContent = input.value;
                }
            };
            
            input.addEventListener('input', updateValue);
            updateValue(); // Initial update
        });
    }
    
    bindConditionalInputs() {
        // Native CSS target selector
        const nativeTarget = document.getElementById('native-target');
        const nativeCustomSelector = document.getElementById('native-custom-selector');
        if (nativeTarget && nativeCustomSelector) {
            nativeTarget.addEventListener('change', () => {
                nativeCustomSelector.style.display = nativeTarget.value === 'custom' ? 'block' : 'none';
            });
        }
        
        // jQuery target links
        const jqueryTargetLinks = document.getElementById('jquery-target-links');
        const jqueryCustomSelector = document.getElementById('jquery-custom-selector');
        if (jqueryTargetLinks && jqueryCustomSelector) {
            jqueryTargetLinks.addEventListener('change', () => {
                jqueryCustomSelector.style.display = jqueryTargetLinks.value === 'custom' ? 'block' : 'none';
            });
        }
    }
    
    bindExportImportButtons() {
        const exportButton = document.getElementById('exportConfig');
        const importButton = document.getElementById('importConfig');
        const importFile = document.getElementById('importFile');
        const configOutput = document.getElementById('configOutput');
        
        if (exportButton && configOutput) {
            exportButton.addEventListener('click', () => {
                const configJson = JSON.stringify(this.config, null, 2);
                configOutput.value = configJson;
                
                // Create downloadable file
                const blob = new Blob([configJson], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `smooth-scroll-config-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }
        
        if (importButton && importFile) {
            importButton.addEventListener('click', () => {
                importFile.click();
            });
            
            importFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const importedConfig = JSON.parse(e.target.result);
                            this.config = { ...this.getDefaultConfig(), ...importedConfig };
                            this.saveConfig();
                            this.updateUI();
                            this.broadcastConfigChange();
                            alert('Configuration imported successfully!');
                        } catch (error) {
                            alert('Error importing configuration: ' + error.message);
                        }
                    };
                    reader.readAsText(file);
                }
            });
        }
    }
    
    async switchLibrary(libraryKey) {
        if (this.currentLibrary === libraryKey) return;
        
        this.currentLibrary = libraryKey;
        this.config.currentLibrary = libraryKey;
        
        // Show loading indicator
        this.showLoadingIndicator(true);
        
        try {
            // Load library assets
            await this.loadLibraryAssets(libraryKey);
            
            // Update UI
            this.updateConfigPanel();
            this.updateCDNInfo();
            
            // Save configuration
            this.saveConfig();
            this.broadcastConfigChange();
            
        } catch (error) {
            console.error('Error switching library:', error);
            this.showError('Failed to load library assets: ' + error.message);
        } finally {
            this.showLoadingIndicator(false);
        }
    }
    
    async loadLibraryAssets(libraryKey) {
        const config = libraryConfigs[libraryKey];
        if (!config) throw new Error(`Unknown library: ${libraryKey}`);
        
        const promises = [];
        
        // Load CSS files
        config.css.forEach(url => {
            if (!this.loadedAssets.has(url)) {
                promises.push(this.loadCSS(url));
                this.loadedAssets.add(url);
            }
        });
        
        // Load JS files
        config.js.forEach(url => {
            if (!this.loadedAssets.has(url)) {
                promises.push(this.loadJS(url));
                this.loadedAssets.add(url);
            }
        });
        
        await Promise.all(promises);
    }
    
    loadCSS(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = resolve;
            link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
            document.head.appendChild(link);
        });
    }
    
    loadJS(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load JS: ${url}`));
            document.head.appendChild(script);
        });
    }
    
    updateConfigPanel() {
        // Hide all config sections
        document.querySelectorAll('.config-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show current library config section
        const currentSection = document.getElementById(`config-${this.currentLibrary}`);
        if (currentSection) {
            currentSection.classList.add('active');
        }
    }
    
    updateCDNInfo() {
        const cdnInfo = document.getElementById('cdnAssetsInfo');
        if (!cdnInfo) return;
        
        const config = libraryConfigs[this.currentLibrary];
        const allAssets = [...config.css, ...config.js];
        
        if (allAssets.length === 0) {
            cdnInfo.innerHTML = '<p class="no-assets">No external assets required for ' + config.name + '</p>';
        } else {
            const assetsHTML = allAssets.map(url => {
                const type = url.endsWith('.css') ? 'CSS' : 'JS';
                return `
                    <div class="asset-item">
                        <span class="asset-type">${type}</span>
                        <span class="asset-url">${url}</span>
                    </div>
                `;
            }).join('');
            
            cdnInfo.innerHTML = assetsHTML;
        }
    }
    
    showLoadingIndicator(show) {
        const indicator = document.getElementById('loadingIndicator');
        if (indicator) {
            indicator.style.display = show ? 'flex' : 'none';
        }
    }
    
    showError(message) {
        // Create a temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--error-color);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 400px;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
    
    updateConfigFromInputs() {
        // Update configuration from all form inputs
        const inputs = document.querySelectorAll('#configContainer input, #configContainer select');
        inputs.forEach(input => {
            const [library, setting] = input.id.split('-').slice(0, 2);
            if (!this.config[library]) this.config[library] = {};
            
            if (input.type === 'checkbox') {
                this.config[library][setting] = input.checked;
            } else if (input.type === 'number' || input.type === 'range') {
                this.config[library][setting] = parseFloat(input.value);
            } else {
                this.config[library][setting] = input.value;
            }
        });
    }
    
    updateUI() {
        // Update master toggle
        const masterToggle = document.getElementById('masterToggle');
        if (masterToggle) {
            masterToggle.checked = this.isEnabled;
        }
        
        // Update library selector
        const librarySelect = document.getElementById('librarySelect');
        if (librarySelect) {
            librarySelect.value = this.currentLibrary;
        }
        
        // Update all form inputs from configuration
        Object.keys(this.config).forEach(library => {
            if (typeof this.config[library] === 'object') {
                Object.keys(this.config[library]).forEach(setting => {
                    const input = document.getElementById(`${library}-${setting}`);
                    if (input) {
                        const value = this.config[library][setting];
                        if (input.type === 'checkbox') {
                            input.checked = value;
                        } else {
                            input.value = value;
                        }
                        
                        // Update range value displays
                        if (input.type === 'range') {
                            const valueSpan = input.nextElementSibling;
                            if (valueSpan && valueSpan.classList.contains('range-value')) {
                                valueSpan.textContent = value;
                            }
                        }
                    }
                });
            }
        });
        
        // Update config panels
        this.updateConfigPanel();
        this.updateCDNInfo();
        
        // Handle conditional inputs
        this.updateConditionalInputs();
    }
    
    updateConditionalInputs() {
        // Native CSS custom selector
        const nativeTarget = document.getElementById('native-target');
        const nativeCustomSelector = document.getElementById('native-custom-selector');
        if (nativeTarget && nativeCustomSelector) {
            nativeCustomSelector.style.display = nativeTarget.value === 'custom' ? 'block' : 'none';
        }
        
        // jQuery custom selector
        const jqueryTargetLinks = document.getElementById('jquery-target-links');
        const jqueryCustomSelector = document.getElementById('jquery-custom-selector');
        if (jqueryTargetLinks && jqueryCustomSelector) {
            jqueryCustomSelector.style.display = jqueryTargetLinks.value === 'custom' ? 'block' : 'none';
        }
    }
    
    getDefaultConfig() {
        return {
            currentLibrary: 'native',
            isEnabled: true,
            native: {
                enable: true,
                target: 'all',
                'custom-selector': '',
                behavior: 'smooth',
                fallback: true
            },
            lenis: {
                enable: true,
                duration: 1.2,
                easing: 'easeInOut',
                lerp: 0.1,
                direction: 'vertical',
                'wheel-multiplier': 1,
                'touch-multiplier': 2,
                'sync-touch': false,
                infinite: false,
                wrapper: '',
                'disable-mobile': false
            },
            gsap: {
                enable: true,
                duration: 1,
                lag: 0.3,
                effects: 'none',
                'trigger-elements': '',
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: false,
                pin: false,
                markers: false,
                refresh: true,
                'disable-mobile': false
            },
            locomotive: {
                enable: true,
                smooth: true,
                direction: 'vertical',
                lerp: 0.1,
                class: '.is-inview',
                repeat: false,
                tablet: false,
                smartphone: false,
                reload: false,
                'touch-multiplier': 1.5,
                'firefox-multiplier': 1,
                container: 'data-scroll-container'
            },
            smoothscrollbar: {
                enable: true,
                damping: 0.1,
                'thumb-size': 20,
                'render-pixels': false,
                'always-show': false,
                continue: false,
                'wheel-target': 'container',
                overscroll: false,
                'text-selection': true,
                'custom-colors': false,
                'disable-touch': false
            },
            jquery: {
                enable: true,
                speed: 800,
                easing: 'swing',
                offset: 0,
                'auto-focus': false,
                'prevent-default': true,
                'target-links': 'all',
                'custom-selector': '',
                exclude: '',
                'before-callback': '',
                'after-callback': '',
                'update-hash': false
            }
        };
    }
    
    saveConfig() {
        try {
            localStorage.setItem('smoothScrollConfig', JSON.stringify({
                currentLibrary: this.currentLibrary,
                isEnabled: this.isEnabled,
                config: this.config
            }));
        } catch (error) {
            console.warn('Failed to save configuration to localStorage:', error);
        }
    }
    
    loadStoredConfig() {
        try {
            const stored = localStorage.getItem('smoothScrollConfig');
            if (stored) {
                const parsed = JSON.parse(stored);
                this.currentLibrary = parsed.currentLibrary || 'native';
                this.isEnabled = parsed.isEnabled !== false;
                this.config = { ...this.getDefaultConfig(), ...parsed.config };
            }
        } catch (error) {
            console.warn('Failed to load configuration from localStorage:', error);
            this.config = this.getDefaultConfig();
        }
    }
    
    resetToDefaults() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            this.config = this.getDefaultConfig();
            this.currentLibrary = 'native';
            this.isEnabled = true;
            this.saveConfig();
            this.updateUI();
            this.broadcastConfigChange();
        }
    }
    
    setupCrossPageCommunication() {
        // Listen for configuration changes from other pages
        window.addEventListener('storage', (e) => {
            if (e.key === 'smoothScrollConfig') {
                this.loadStoredConfig();
                this.updateUI();
            }
        });
        
        // Listen for messages from demo/debug pages
        window.addEventListener('message', (e) => {
            if (e.data.type === 'requestConfig') {
                e.source.postMessage({
                    type: 'configUpdate',
                    config: this.config,
                    currentLibrary: this.currentLibrary,
                    isEnabled: this.isEnabled
                }, e.origin);
            }
        });
    }
    
    broadcastConfigChange() {
        // Broadcast to all open demo/debug pages
        const message = {
            type: 'configUpdate',
            config: this.config,
            currentLibrary: this.currentLibrary,
            isEnabled: this.isEnabled
        };
        
        // Use BroadcastChannel if available
        if (window.BroadcastChannel) {
            const channel = new BroadcastChannel('smoothScrollConfig');
            channel.postMessage(message);
        }
        
        // Also trigger storage event for cross-tab communication
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'smoothScrollConfig',
            newValue: JSON.stringify(message)
        }));
    }
    
    // Get current configuration for a specific library
    getLibraryConfig(libraryKey = this.currentLibrary) {
        return {
            ...this.config[libraryKey],
            isEnabled: this.isEnabled,
            currentLibrary: this.currentLibrary
        };
    }
}

// Library-specific initializers for demo pages
const libraryInitializers = {
    native: (config) => {
        // Native CSS smooth scroll implementation
        if (!config.enable || !config.isEnabled) return;
        
        const targetSelector = config.target === 'custom' && config['custom-selector'] 
            ? config['custom-selector'] 
            : 'a[href^="#"]';
        
        // Apply scroll behavior to html element
        document.documentElement.style.scrollBehavior = config.behavior;
        
        // Add click handlers for smooth scrolling
        document.querySelectorAll(targetSelector).forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ 
                            behavior: config.behavior,
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        return {
            destroy: () => {
                document.documentElement.style.scrollBehavior = '';
            }
        };
    },
    
    lenis: (config) => {
        if (!config.enable || !config.isEnabled || !window.Lenis) return;
        
        // Check if should disable on mobile
        if (config['disable-mobile'] && window.innerWidth <= 768) return;
        
        const lenisConfig = {
            duration: config.duration,
            easing: (t) => {
                switch (config.easing) {
                    case 'linear': return t;
                    case 'easeOut': return 1 - Math.pow(1 - t, 3);
                    case 'easeIn': return t * t * t;
                    case 'easeInOut':
                    default: return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
            },
            lerp: config.lerp,
            direction: config.direction,
            gestureDirection: config.direction,
            smooth: true,
            mouseMultiplier: config['wheel-multiplier'],
            touchMultiplier: config['touch-multiplier'],
            syncTouch: config['sync-touch'],
            infinite: config.infinite
        };
        
        if (config.wrapper) {
            lenisConfig.wrapper = document.querySelector(config.wrapper);
        }
        
        const lenis = new Lenis(lenisConfig);
        
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        
        return {
            instance: lenis,
            destroy: () => {
                lenis.destroy();
            }
        };
    },
    
    gsap: (config) => {
        if (!config.enable || !config.isEnabled || !window.gsap || !window.ScrollTrigger) return;
        
        // Check if should disable on mobile
        if (config['disable-mobile'] && window.innerWidth <= 768) return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Configure ScrollSmoother if available
        if (window.ScrollSmoother) {
            const smoother = ScrollSmoother.create({
                smooth: config.duration,
                effects: config.effects !== 'none'
            });
        }
        
        // Add scroll triggers for elements
        if (config['trigger-elements']) {
            const elements = document.querySelectorAll(config['trigger-elements']);
            elements.forEach(element => {
                gsap.fromTo(element, 
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: config.duration,
                        scrollTrigger: {
                            trigger: element,
                            start: config.start,
                            end: config.end,
                            scrub: config.scrub,
                            pin: config.pin,
                            markers: config.markers,
                            refreshPriority: config.refresh ? 1 : 0
                        }
                    }
                );
            });
        }
        
        if (config.refresh) {
            window.addEventListener('resize', () => ScrollTrigger.refresh());
        }
        
        return {
            destroy: () => {
                ScrollTrigger.killAll();
            }
        };
    },
    
    locomotive: (config) => {
        if (!config.enable || !config.isEnabled || !window.LocomotiveScroll) return;
        
        const container = document.querySelector(`[${config.container}]`) || document.body;
        
        const locomotiveConfig = {
            el: container,
            smooth: config.smooth,
            direction: config.direction,
            lerp: config.lerp,
            class: config.class,
            repeat: config.repeat,
            tablet: { smooth: config.tablet },
            smartphone: { smooth: config.smartphone },
            reloadOnContextChange: config.reload,
            multiplier: config['touch-multiplier'],
            firefoxMultiplier: config['firefox-multiplier']
        };
        
        const scroll = new LocomotiveScroll(locomotiveConfig);
        
        // Update ScrollTrigger if available
        if (window.ScrollTrigger) {
            scroll.on('scroll', ScrollTrigger.update);
            ScrollTrigger.scrollerProxy(container, {
                scrollTop(value) {
                    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
                },
                pinType: container.style.transform ? "transform" : "fixed"
            });
        }
        
        return {
            instance: scroll,
            destroy: () => {
                scroll.destroy();
            }
        };
    },
    
    smoothscrollbar: (config) => {
        if (!config.enable || !config.isEnabled || !window.Scrollbar) return;
        
        // Check if should disable on touch devices
        if (config['disable-touch'] && 'ontouchstart' in window) return;
        
        const scrollbarConfig = {
            damping: config.damping,
            thumbMinSize: config['thumb-size'],
            renderByPixels: config['render-pixels'],
            alwaysShowTracks: config['always-show'],
            continuousScrolling: config.continue,
            wheelEventTarget: config['wheel-target'] === 'document' ? document : null,
            plugins: {}
        };
        
        if (config.overscroll && window.OverscrollPlugin) {
            scrollbarConfig.plugins.overscroll = {
                effect: 'bounce'
            };
        }
        
        const scrollbar = window.Scrollbar.init(document.body, scrollbarConfig);
        
        // Disable text selection if configured
        if (!config['text-selection']) {
            document.body.style.userSelect = 'none';
        }
        
        return {
            instance: scrollbar,
            destroy: () => {
                scrollbar.destroy();
                document.body.style.userSelect = '';
            }
        };
    },
    
    jquery: (config) => {
        if (!config.enable || !config.isEnabled || !window.jQuery) return;
        
        const $ = window.jQuery;
        
        const targetSelector = config['target-links'] === 'custom' && config['custom-selector']
            ? config['custom-selector']
            : 'a[href^="#"]';
        
        const smoothScrollConfig = {
            speed: config.speed,
            easing: config.easing,
            offset: config.offset,
            autoFocus: config['auto-focus'],
            preventDefault: config['prevent-default'],
            exclude: config.exclude ? config.exclude.split(',').map(s => s.trim()) : [],
            beforeScroll: config['before-callback'] ? window[config['before-callback']] : null,
            afterScroll: config['after-callback'] ? window[config['after-callback']] : null,
            updateHash: config['update-hash']
        };
        
        $(targetSelector).smoothScroll(smoothScrollConfig);
        
        return {
            destroy: () => {
                $(targetSelector).off('click.smoothScroll');
            }
        };
    }
};

// Initialize the manager when DOM is ready
let scrollManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        scrollManager = new ScrollLibraryManager();
    });
} else {
    scrollManager = new ScrollLibraryManager();
}

// Export for use in demo pages
window.ScrollLibraryManager = ScrollLibraryManager;
window.libraryInitializers = libraryInitializers;
window.libraryConfigs = libraryConfigs;

