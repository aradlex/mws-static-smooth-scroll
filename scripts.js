/**
 * Smooth Scroll Libraries Demo - Core JavaScript
 * 
 * This file contains:
 * - Library configurations with local asset paths
 * - Initialization functions for each library
 * - Configuration management and persistence
 * - Dynamic asset loading and form generation
 * - Cross-page communication utilities
 * 
 * How to add a new smooth scroll library:
 * 1. Add library config to libraryConfigs object with local paths
 * 2. Create initialization function (e.g., initMyLibrary)
 * 3. Add library-specific options with proper types
 * 4. Create demo and debug pages
 * 5. Test across all responsive breakpoints
 */

// Template utility function
function tmpl(str, data) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => data[k] || '');
}

// Library configurations with local assets and options
const libraryConfigs = {
  'native-css': {
    name: 'Native CSS Smooth Scroll',
    css: [],
    js: [],
    options: {
      enable: { type: 'checkbox', default: true },
      target: { type: 'select', choices: ['all', 'custom'], default: 'all' },
      customSelector: { type: 'text', default: '', placeholder: 'e.g., .smooth-link' },
      behavior: { type: 'select', choices: ['smooth', 'auto'], default: 'smooth' },
      fallback: { type: 'checkbox', default: true }
    }
  },
  
  lenis: {
    name: 'Lenis',
    css: ['libs/lenis.css'],
    js: ['libs/lenis.min.js'],
    options: {
      enable: { type: 'checkbox', default: true },
      duration: { type: 'number', default: 1.2, min: 0.1, max: 5, step: 0.1 },
      easing: { type: 'select', choices: ['easeInOut', 'linear', 'easeOut', 'easeIn'], default: 'easeInOut' },
      lerp: { type: 'range', min: 0, max: 1, step: 0.01, default: 0.1 },
      direction: { type: 'select', choices: ['vertical', 'horizontal', 'both'], default: 'vertical' },
      wheelMult: { type: 'number', default: 1, min: 0.1, max: 5, step: 0.1 },
      touchMult: { type: 'number', default: 2, min: 0.1, max: 5, step: 0.1 },
      syncTouch: { type: 'checkbox', default: false },
      infinite: { type: 'checkbox', default: false },
      wrapper: { type: 'text', default: '', placeholder: 'e.g., #smooth-wrapper' },
      disableMobile: { type: 'checkbox', default: false }
    }
  },
  
  'gsap-scrolltrigger': {
    name: 'GSAP ScrollTrigger',
    css: [],
    js: ['libs/gsap.min.js', 'libs/ScrollTrigger.min.js'],
    options: {
      enable: { type: 'checkbox', default: true },
      duration: { type: 'number', default: 1, min: 0.1, max: 5, step: 0.1 },
      lag: { type: 'number', default: 0.3, min: 0, max: 2, step: 0.1 },
      effects: { type: 'select', choices: ['none', 'fade', 'scale', 'slide'], default: 'fade' },
      triggerElements: { type: 'text', default: '.trigger-element', placeholder: 'CSS selector' },
      start: { type: 'text', default: 'top 80%', placeholder: 'e.g., top 80%' },
      end: { type: 'text', default: 'bottom 20%', placeholder: 'e.g., bottom 20%' },
      scrub: { type: 'checkbox', default: false },
      pin: { type: 'checkbox', default: false },
      markers: { type: 'checkbox', default: false },
      refresh: { type: 'checkbox', default: true },
      disableMobile: { type: 'checkbox', default: false }
    }
  },
  
  locomotive: {
    name: 'Locomotive Scroll',
    css: ['libs/locomotive-scroll.min.css'],
    js: ['libs/locomotive-scroll.min.js'],
    options: {
      enable: { type: 'checkbox', default: true },
      smooth: { type: 'checkbox', default: true },
      direction: { type: 'select', choices: ['vertical', 'horizontal'], default: 'vertical' },
      lerp: { type: 'number', default: 0.1, min: 0.01, max: 1, step: 0.01 },
      class: { type: 'text', default: '.is-inview', placeholder: 'CSS class' },
      repeat: { type: 'checkbox', default: false },
      tablet: { type: 'checkbox', default: false },
      smartphone: { type: 'checkbox', default: false },
      reload: { type: 'checkbox', default: false },
      touchMult: { type: 'number', default: 1.5, min: 0.1, max: 5, step: 0.1 },
      firefoxMult: { type: 'number', default: 1, min: 0.1, max: 5, step: 0.1 },
      container: { type: 'text', default: 'data-scroll-container', placeholder: 'Container attribute' }
    }
  },
  
  'smooth-scrollbar': {
    name: 'Smooth Scrollbar',
    css: [],
    js: ['libs/smooth-scrollbar.min.js'],
    options: {
      enable: { type: 'checkbox', default: true },
      damping: { type: 'range', min: 0, max: 1, step: 0.01, default: 0.1 },
      thumbMinSize: { type: 'number', default: 20, min: 10, max: 100 },
      renderByPixels: { type: 'checkbox', default: false },
      alwaysShowTracks: { type: 'checkbox', default: false },
      continuousScrolling: { type: 'checkbox', default: false },
      wheelEventTarget: { type: 'select', choices: ['container', 'document'], default: 'container' },
      overscrollEffect: { type: 'checkbox', default: false },
      textSelection: { type: 'checkbox', default: true },
      customColors: { type: 'checkbox', default: false },
      disableTouch: { type: 'checkbox', default: false }
    }
  },
  
  'jquery-smooth-scroll': {
    name: 'jQuery Smooth Scroll',
    css: [],
    js: ['libs/jquery.min.js', 'libs/jquery.smooth-scroll.min.js'],
    options: {
      enable: { type: 'checkbox', default: true },
      speed: { type: 'number', default: 800, min: 100, max: 5000, step: 100 },
      easing: { type: 'select', choices: ['swing', 'linear', 'easeInOutQuad'], default: 'swing' },
      offset: { type: 'number', default: 0, min: -500, max: 500 },
      autoFocus: { type: 'checkbox', default: false },
      preventDefault: { type: 'checkbox', default: true },
      targetLinks: { type: 'select', choices: ['all', 'custom'], default: 'all' },
      customSelector: { type: 'text', default: '', placeholder: 'CSS selector' },
      exclude: { type: 'text', default: '', placeholder: 'e.g., .no-smooth' },
      beforeCallback: { type: 'text', default: '', placeholder: 'Function name' },
      afterCallback: { type: 'text', default: '', placeholder: 'Function name' },
      updateHash: { type: 'checkbox', default: false }
    }
  }
};

// Global state management
class SmoothScrollManager {
  constructor() {
    this.currentLibrary = 'native-css';
    this.isEnabled = true;
    this.config = this.getDefaultConfig();
    this.loadedAssets = new Set();
    this.libraryInstances = new Map();
    
    this.init();
  }
  
  init() {
    this.loadStoredConfig();
    this.bindEvents();
    this.updateUI();
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
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }
  
  async switchLibrary(libraryKey) {
    if (this.currentLibrary === libraryKey) return;
    
    this.currentLibrary = libraryKey;
    this.config.currentLibrary = libraryKey;
    
    try {
      await this.loadLibraryAssets(libraryKey);
      this.updateConfigPanel();
      this.updateAssetsInfo();
      this.saveConfig();
      this.broadcastConfigChange();
    } catch (error) {
      console.error('Error switching library:', error);
      this.showError('Failed to load library assets: ' + error.message);
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
    const container = document.getElementById('configContainer');
    if (!container) return;
    
    const config = libraryConfigs[this.currentLibrary];
    if (!config) return;
    
    container.innerHTML = this.generateConfigForm(config.options);
    this.bindConfigInputs();
    this.populateConfigValues();
  }
  
  generateConfigForm(options) {
    let html = '';
    
    Object.entries(options).forEach(([key, option]) => {
      const id = `${this.currentLibrary}-${key}`;
      const value = this.config[this.currentLibrary]?.[key] ?? option.default;
      
      html += '<div class="config-group">';
      
      switch (option.type) {
        case 'checkbox':
          html += `
            <label class="checkbox-label">
              <input type="checkbox" id="${id}" ${value ? 'checked' : ''}>
              <span class="checkmark"></span>
              ${this.formatLabel(key)}
            </label>
          `;
          break;
          
        case 'select':
          html += `
            <label for="${id}">${this.formatLabel(key)}:</label>
            <select id="${id}">
              ${option.choices.map(choice => 
                `<option value="${choice}" ${value === choice ? 'selected' : ''}>${choice}</option>`
              ).join('')}
            </select>
          `;
          break;
          
        case 'range':
          html += `
            <label for="${id}">${this.formatLabel(key)}:</label>
            <input type="range" id="${id}" min="${option.min}" max="${option.max}" 
                   step="${option.step}" value="${value}">
            <span class="range-value">${value}</span>
          `;
          break;
          
        case 'number':
          html += `
            <label for="${id}">${this.formatLabel(key)}:</label>
            <input type="number" id="${id}" value="${value}" 
                   ${option.min !== undefined ? `min="${option.min}"` : ''}
                   ${option.max !== undefined ? `max="${option.max}"` : ''}
                   ${option.step !== undefined ? `step="${option.step}"` : ''}>
          `;
          break;
          
        case 'text':
          html += `
            <label for="${id}">${this.formatLabel(key)}:</label>
            <input type="text" id="${id}" value="${value}" 
                   ${option.placeholder ? `placeholder="${option.placeholder}"` : ''}>
          `;
          break;
      }
      
      html += '</div>';
    });
    
    return html;
  }
  
  formatLabel(key) {
    return key.replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .replace(/mult/i, 'Multiplier');
  }
  
  bindConfigInputs() {
    const inputs = document.querySelectorAll('#configContainer input, #configContainer select');
    inputs.forEach(input => {
      const eventType = input.type === 'range' ? 'input' : 'change';
      input.addEventListener(eventType, () => {
        this.updateConfigFromInputs();
        this.saveConfig();
        this.broadcastConfigChange();
        
        // Update range value display
        if (input.type === 'range') {
          const valueSpan = input.nextElementSibling;
          if (valueSpan && valueSpan.classList.contains('range-value')) {
            valueSpan.textContent = input.value;
          }
        }
      });
    });
  }
  
  updateConfigFromInputs() {
    const inputs = document.querySelectorAll('#configContainer input, #configContainer select');
    if (!this.config[this.currentLibrary]) {
      this.config[this.currentLibrary] = {};
    }
    
    inputs.forEach(input => {
      const key = input.id.replace(`${this.currentLibrary}-`, '');
      
      if (input.type === 'checkbox') {
        this.config[this.currentLibrary][key] = input.checked;
      } else if (input.type === 'number' || input.type === 'range') {
        this.config[this.currentLibrary][key] = parseFloat(input.value);
      } else {
        this.config[this.currentLibrary][key] = input.value;
      }
    });
  }
  
  populateConfigValues() {
    const currentConfig = this.config[this.currentLibrary] || {};
    
    Object.entries(currentConfig).forEach(([key, value]) => {
      const input = document.getElementById(`${this.currentLibrary}-${key}`);
      if (input) {
        if (input.type === 'checkbox') {
          input.checked = value;
        } else {
          input.value = value;
        }
        
        // Update range value display
        if (input.type === 'range') {
          const valueSpan = input.nextElementSibling;
          if (valueSpan && valueSpan.classList.contains('range-value')) {
            valueSpan.textContent = value;
          }
        }
      }
    });
  }
  
  updateAssetsInfo() {
    const assetsInfo = document.getElementById('assets');
    if (!assetsInfo) return;
    
    const config = libraryConfigs[this.currentLibrary];
    const allAssets = [...config.css, ...config.js];
    
    if (allAssets.length === 0) {
      assetsInfo.textContent = `No external assets required for ${config.name}`;
    } else {
      assetsInfo.textContent = `Loaded assets for ${config.name}:\n${allAssets.join('\n')}`;
    }
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
    
    // Update config panel and assets info
    this.updateConfigPanel();
    this.updateAssetsInfo();
  }
  
  getDefaultConfig() {
    const config = { currentLibrary: 'native-css', isEnabled: true };
    
    Object.entries(libraryConfigs).forEach(([key, libConfig]) => {
      config[key] = {};
      Object.entries(libConfig.options).forEach(([optKey, option]) => {
        config[key][optKey] = option.default;
      });
    });
    
    return config;
  }
  
  saveConfig() {
    try {
      sessionStorage.setItem('smoothScrollConfig', JSON.stringify({
        currentLibrary: this.currentLibrary,
        isEnabled: this.isEnabled,
        config: this.config
      }));
    } catch (error) {
      console.warn('Failed to save configuration:', error);
    }
  }
  
  loadStoredConfig() {
    try {
      const stored = sessionStorage.getItem('smoothScrollConfig');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.currentLibrary = parsed.currentLibrary || 'native-css';
        this.isEnabled = parsed.isEnabled !== false;
        this.config = { ...this.getDefaultConfig(), ...parsed.config };
      }
    } catch (error) {
      console.warn('Failed to load stored configuration:', error);
      this.config = this.getDefaultConfig();
    }
  }
  
  broadcastConfigChange() {
    // Broadcast to other pages via storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'smoothScrollConfig',
      newValue: JSON.stringify({
        currentLibrary: this.currentLibrary,
        isEnabled: this.isEnabled,
        config: this.config
      })
    }));
  }
  
  handleResize() {
    // Handle responsive breakpoints
    const width = window.innerWidth;
    const breakpoint = width <= 640 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop';
    document.body.setAttribute('data-breakpoint', breakpoint);
  }
  
  showError(message) {
    console.error(message);
    // Could add visual error display here
  }
  
  getLibraryConfig(libraryKey = this.currentLibrary) {
    return {
      ...this.config[libraryKey],
      isEnabled: this.isEnabled,
      currentLibrary: this.currentLibrary
    };
  }
}

// Library initialization functions
function initNativeCSS(opts) {
  if (!opts.enable || !opts.isEnabled) return null;
  
  const targetSelector = opts.target === 'custom' && opts.customSelector 
    ? opts.customSelector 
    : 'a[href^="#"]';
  
  document.documentElement.style.scrollBehavior = opts.behavior;
  
  document.querySelectorAll(targetSelector).forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ 
            behavior: opts.behavior,
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
}

function initLenis(opts) {
  if (!opts.enable || !opts.isEnabled || typeof Lenis === 'undefined') return null;
  
  if (opts.disableMobile && window.innerWidth <= 640) return null;
  
  const easingFunctions = {
    linear: (t) => t,
    easeOut: (t) => 1 - Math.pow(1 - t, 3),
    easeIn: (t) => t * t * t,
    easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  };
  
  const lenisConfig = {
    duration: opts.duration,
    easing: easingFunctions[opts.easing] || easingFunctions.easeInOut,
    lerp: opts.lerp,
    direction: opts.direction,
    smooth: true,
    mouseMultiplier: opts.wheelMult,
    touchMultiplier: opts.touchMult,
    syncTouch: opts.syncTouch,
    infinite: opts.infinite
  };
  
  if (opts.wrapper) {
    const wrapper = document.querySelector(opts.wrapper);
    if (wrapper) lenisConfig.wrapper = wrapper;
  }
  
  const lenis = new Lenis(lenisConfig);
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  return {
    instance: lenis,
    destroy: () => lenis.destroy()
  };
}

function initGSAP(opts) {
  if (!opts.enable || !opts.isEnabled || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return null;
  
  if (opts.disableMobile && window.innerWidth <= 640) return null;
  
  gsap.registerPlugin(ScrollTrigger);
  
  if (opts.effects !== 'none' && opts.triggerElements) {
    const elements = document.querySelectorAll(opts.triggerElements);
    
    elements.forEach(element => {
      let fromVars = {};
      let toVars = {
        duration: opts.duration,
        scrollTrigger: {
          trigger: element,
          start: opts.start,
          end: opts.end,
          scrub: opts.scrub,
          markers: opts.markers
        }
      };
      
      switch (opts.effects) {
        case 'fade':
          fromVars = { opacity: 0, y: 30 };
          toVars.opacity = 1;
          toVars.y = 0;
          break;
        case 'scale':
          fromVars = { opacity: 0, scale: 0.8 };
          toVars.opacity = 1;
          toVars.scale = 1;
          break;
        case 'slide':
          fromVars = { opacity: 0, x: -50 };
          toVars.opacity = 1;
          toVars.x = 0;
          break;
      }
      
      gsap.fromTo(element, fromVars, toVars);
    });
  }
  
  if (opts.refresh) {
    window.addEventListener('resize', () => ScrollTrigger.refresh());
  }
  
  return {
    destroy: () => ScrollTrigger.killAll()
  };
}

function initLocomotive(opts) {
  if (!opts.enable || !opts.isEnabled || typeof LocomotiveScroll === 'undefined') return null;
  
  const container = document.querySelector(`[${opts.container}]`) || document.body;
  
  const locomotiveConfig = {
    el: container,
    smooth: opts.smooth,
    direction: opts.direction,
    lerp: opts.lerp,
    class: opts.class,
    repeat: opts.repeat,
    tablet: { smooth: opts.tablet },
    smartphone: { smooth: opts.smartphone },
    reloadOnContextChange: opts.reload,
    multiplier: opts.touchMult,
    firefoxMultiplier: opts.firefoxMult
  };
  
  const scroll = new LocomotiveScroll(locomotiveConfig);
  
  return {
    instance: scroll,
    destroy: () => scroll.destroy()
  };
}

function initScrollbar(opts) {
  if (!opts.enable || !opts.isEnabled || typeof Scrollbar === 'undefined') return null;
  
  if (opts.disableTouch && 'ontouchstart' in window) return null;
  
  const scrollbarConfig = {
    damping: opts.damping,
    thumbMinSize: opts.thumbMinSize,
    renderByPixels: opts.renderByPixels,
    alwaysShowTracks: opts.alwaysShowTracks,
    continuousScrolling: opts.continuousScrolling,
    wheelEventTarget: opts.wheelEventTarget === 'document' ? document : null
  };
  
  const scrollbar = Scrollbar.init(document.body, scrollbarConfig);
  
  if (!opts.textSelection) {
    document.body.style.userSelect = 'none';
  }
  
  return {
    instance: scrollbar,
    destroy: () => {
      scrollbar.destroy();
      document.body.style.userSelect = '';
    }
  };
}

function initjQuery(opts) {
  if (!opts.enable || !opts.isEnabled || typeof jQuery === 'undefined') return null;
  
  const $ = jQuery;
  
  const targetSelector = opts.targetLinks === 'custom' && opts.customSelector
    ? opts.customSelector
    : 'a[href^="#"]';
  
  const smoothScrollConfig = {
    speed: opts.speed,
    easing: opts.easing,
    offset: opts.offset,
    autoFocus: opts.autoFocus,
    preventDefault: opts.preventDefault,
    exclude: opts.exclude ? opts.exclude.split(',').map(s => s.trim()) : [],
    beforeScroll: opts.beforeCallback ? window[opts.beforeCallback] : null,
    afterScroll: opts.afterCallback ? window[opts.afterCallback] : null,
    updateHash: opts.updateHash
  };
  
  $(targetSelector).smoothScroll(smoothScrollConfig);
  
  return {
    destroy: () => $(targetSelector).off('click.smoothScroll')
  };
}

// Initialize manager when DOM is ready
let smoothScrollManager;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    smoothScrollManager = new SmoothScrollManager();
  });
} else {
  smoothScrollManager = new SmoothScrollManager();
}

// Export for use in demo pages
window.SmoothScrollManager = SmoothScrollManager;
window.libraryConfigs = libraryConfigs;
window.initNativeCSS = initNativeCSS;
window.initLenis = initLenis;
window.initGSAP = initGSAP;
window.initLocomotive = initLocomotive;
window.initScrollbar = initScrollbar;
window.initjQuery = initjQuery;

// Basic tests
console.assert(typeof initLenis === 'function', 'Lenis init missing');
console.assert(typeof initGSAP === 'function', 'GSAP init missing');
console.assert(typeof initLocomotive === 'function', 'Locomotive init missing');
console.assert(typeof initScrollbar === 'function', 'Scrollbar init missing');
console.assert(typeof initjQuery === 'function', 'jQuery init missing');

