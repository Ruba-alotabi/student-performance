/**
 * Enhanced Presentation Mode Feature
 * Improved for better mobile support and reliability
 */
function initializePresentationMode() {
    const presentationModeBtn = document.querySelector('.presentation-mode-btn');
    if (!presentationModeBtn) return;
    
    let presentationMode = false;
    let currentSlide = 0;
    let slideInterval;
    let validSlides = [];
    
    /**
     * Function to gather all important sections that are currently in the DOM
     * Dynamically collects available sections for presentation
     */
    function gatherSlides() {
        // Define potential slide elements with fallbacks for different page layouts
        const potentialSlides = [
            { 
                title: "Student Performance Dashboard", 
                selectors: ['.overview-header', '.performance-header', '.analysis-header'] 
            },
            { 
                title: "Key Performance Metrics", 
                selectors: ['.stats-grid', '.metrics-grid', '.key-metrics'] 
            },
            { 
                title: "Grade Distribution", 
                selectors: ['.chart-grid', '.grade-distribution', '.grade-charts'] 
            },
            { 
                title: "Performance Factors", 
                selectors: ['.performance-factors', '.factors-grid'] 
            },
            { 
                title: "Academic Progress", 
                selectors: ['.academic-progress', '.progress-tracker'] 
            },
            { 
                title: "Student Engagement", 
                selectors: ['.student-engagement', '.engagement-metrics'] 
            },
            { 
                title: "Recent Activity", 
                selectors: ['.recent-activity', '.activity-log'] 
            },
            { 
                title: "Dataset Information", 
                selectors: ['.data-source-section', '.data-info'] 
            },
            { 
                title: "Project Team", 
                selectors: ['.team-section', '.contributors'] 
            },
            { 
                title: "Key Findings", 
                selectors: ['.key-findings', '.insights'] 
            }
        ];
        
        // Array to hold valid slides
        const slides = [];
        
        // Find the first available element for each potential slide
        potentialSlides.forEach(slide => {
            for (let i = 0; i < slide.selectors.length; i++) {
                const element = document.querySelector(slide.selectors[i]);
                if (element) {
                    slides.push({
                        title: slide.title,
                        element: element
                    });
                    break;
                }
            }
        });
        
        // If no slides were found, try to get any major sections as fallback
        if (slides.length === 0) {
            const sections = document.querySelectorAll('section, .card, .dashboard-card');
            sections.forEach((section, index) => {
                slides.push({
                    title: `Slide ${index + 1}`,
                    element: section
                });
            });
        }
        
        return slides;
    }
    
    // Setup the presentation mode toggle
    presentationModeBtn.addEventListener('click', function() {
        // Gather slides each time to ensure we have the current DOM elements
        validSlides = gatherSlides();
        
        // Toggle presentation mode
        presentationMode = !presentationMode;
        
        if (presentationMode) {
            enterPresentationMode();
        } else {
            exitPresentationMode();
        }
    });
    
    /**
     * Enter presentation mode
     * Sets up the UI for presentation mode
     */
    function enterPresentationMode() {
        // Update UI state
        document.body.classList.add('presentation-active');
        
        // Update button
        presentationModeBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span>Exit</span>
        `;
        
        // Prevent scrolling during presentation
        document.body.style.overflow = 'hidden';
        
        // Create presentation overlay
        createOverlay();
        
        // Add keyboard navigation
        window.addEventListener('keydown', handlePresentationKeydown);
        
        // Show first slide
        showSlide(0);
        
        // Auto advance slides every 15 seconds (adjusted from 10s for better reading time)
        slideInterval = setInterval(nextSlide, 15000);
        
        // Handle touch events for mobile
        setupTouchNavigation();
    }
    
    /**
     * Create the presentation overlay and controls
     */
    function createOverlay() {
        // Create main overlay
        const overlay = document.createElement('div');
        overlay.id = 'presentation-overlay';
        overlay.className = 'presentation-overlay';
        document.body.appendChild(overlay);

        // Create slide content container
        const slideContent = document.createElement('div');
        slideContent.id = 'slide-content';
        overlay.appendChild(slideContent);
        
        // Create presentation controls
        const controls = document.createElement('div');
        controls.className = 'presentation-controls';
        
        // Build controls with prev/next buttons and slide counter
        controls.innerHTML = `
            <button class="prev-slide" aria-label="Previous slide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div class="slide-indicator">
                <span class="current-slide">1</span>/<span class="total-slides">${validSlides.length}</span>
            </div>
            <button class="next-slide" aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <button class="exit-presentation" aria-label="Exit presentation">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `;
        overlay.appendChild(controls);
        
        // Create slide title element
        const slideTitle = document.createElement('div');
        slideTitle.className = 'slide-title';
        overlay.appendChild(slideTitle);
        
        // Setup control button event listeners
        document.querySelector('.prev-slide').addEventListener('click', prevSlide);
        document.querySelector('.next-slide').addEventListener('click', nextSlide);
        document.querySelector('.exit-presentation').addEventListener('click', exitPresentationMode);
    }
    
    /**
     * Setup touch events for mobile navigation
     */
    function setupTouchNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const overlay = document.getElementById('presentation-overlay');
        
        if (overlay) {
            overlay.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            overlay.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleTouchGesture();
            }, false);
        }
        
        function handleTouchGesture() {
            // Swipe threshold - adjust if needed
            const threshold = 50;
            
            if (touchStartX - touchEndX > threshold) {
                // Swipe left - next slide
                nextSlide();
            } else if (touchEndX - touchStartX > threshold) {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    /**
     * Display a specific slide
     * @param {number} index - The slide index to display
     */
    function showSlide(index) {
        if (!validSlides.length) return;
        
        // Handle circular navigation
        currentSlide = index;
        if (currentSlide < 0) currentSlide = validSlides.length - 1;
        if (currentSlide >= validSlides.length) currentSlide = 0;
        
        // Update slide counter
        const indicator = document.querySelector('.current-slide');
        if (indicator) indicator.textContent = currentSlide + 1;
        
        // Update slide title
        const titleEl = document.querySelector('.slide-title');
        if (titleEl) titleEl.textContent = validSlides[currentSlide].title;
        
        // Get the current slide element
        const element = validSlides[currentSlide].element;
        
        if (element) {
            // Remove highlighting from all slides
            document.querySelectorAll('.highlight-slide').forEach(el => {
                el.classList.remove('highlight-slide');
            });
            
            // Highlight current slide
            element.classList.add('highlight-slide');
            
            // Clone the element for overlay
            const overlayContent = element.cloneNode(true);
              // Fix images and canvases for presentation mode
            overlayContent.querySelectorAll('img, canvas').forEach(function(media) {
                media.style.maxWidth = '100%'; // Changed from 50%
                media.style.width = 'auto';
                media.style.height = 'auto';
                media.style.maxHeight = '70vh'; // Added to prevent very tall images/charts
                media.style.display = 'block';
                media.style.margin = '1rem auto'; // Adjusted margin
                media.style.borderRadius = 'var(--radius-md)'; // Use CSS variable
                media.style.boxShadow = 'var(--shadow-lg)'; // Use CSS variable
                media.style.backgroundColor = '#fff';
                media.style.objectFit = 'contain';
                // Add zoom effect on hover
                media.style.transition = 'transform 0.3s ease';
                media.addEventListener('mouseenter', () => {
                    media.style.transform = 'scale(1.05)';
                });
                media.addEventListener('mouseleave', () => {
                    media.style.transform = 'scale(1)';
                });
            });
            
            // Insert into overlay
            const slideContent = document.querySelector('#slide-content');
            if (slideContent) {
                slideContent.innerHTML = '';
                slideContent.appendChild(overlayContent);
            }
            
            // Scroll to current slide with smooth animation
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'center'
            });
            
            // Ensure charts are properly displayed (if any)
            refreshCharts(element);
        }
    }
    
    /**
     * Helper function to refresh any charts in the current slide
     * Helps with chart rendering issues during presentation
     */
    function refreshCharts(element) {
        // Find any Chart.js instances in the current slide and update them
        const chartCanvases = element.querySelectorAll('canvas');
        chartCanvases.forEach(canvas => {
            const chartInstance = canvas.chart || window.Chart?.instances?.[canvas.id];
            if (chartInstance && typeof chartInstance.update === 'function') {
                chartInstance.update();
            }
        });
    }
    
    /**
     * Go to next slide
     */
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    /**
     * Go to previous slide
     */
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    /**
     * Handle keyboard navigation in presentation mode
     */
    function handlePresentationKeydown(e) {
        if (!presentationMode) return;
        
        switch (e.key) {
            case "ArrowRight":
            case "ArrowDown":
            case " ":
            case "PageDown":
                nextSlide();
                e.preventDefault();
                break;
            case "ArrowLeft":
            case "ArrowUp":
            case "PageUp":
                prevSlide();
                e.preventDefault();
                break;
            case "Escape":
                exitPresentationMode();
                e.preventDefault();
                break;
        }
    }
    
    /**
     * Exit presentation mode
     * Cleans up and returns to normal view
     */
    function exitPresentationMode() {
        // Update state
        presentationMode = false;
        
        // Update UI
        document.body.classList.remove('presentation-active');
        presentationModeBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span>Presentation Mode</span>
        `;
        
        // Re-enable scrolling
        document.body.style.overflow = '';
        
        // Remove presentation overlay
        const overlay = document.getElementById('presentation-overlay');
        if (overlay) overlay.remove();
        
        // Remove slide highlights
        document.querySelectorAll('.highlight-slide').forEach(el => {
            el.classList.remove('highlight-slide');
        });
        
        // Clean up event listeners
        window.removeEventListener('keydown', handlePresentationKeydown);
        
        // Clear the auto-advance interval
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }
}
