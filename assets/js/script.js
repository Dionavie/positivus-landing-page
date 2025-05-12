function handleClick() {
    alert("Button clicked!");
  }

//   ///////////////// the carousel 1///////////////////////
  document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const caseStudies = document.querySelectorAll('.case-study');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    let isCarouselMode = false;
    let slideInterval;
    
    // Check if we're in carousel mode based on screen width
    function checkCarouselMode() {
        const wasCarouselMode = isCarouselMode;
        isCarouselMode = window.innerWidth <= 992;
        
        if (isCarouselMode) {
            showSlide(currentIndex);
            // Start auto-slide if we're entering carousel mode
            if (!wasCarouselMode) {
                startAutoSlide();
            }
        } else {
            // In desktop mode, show all slides
            caseStudies.forEach(study => {
                study.style.display = 'block';
                study.classList.remove('active');
            });
            // Stop auto-slide if we're exiting carousel mode
            if (wasCarouselMode) {
                stopAutoSlide();
            }
        }
        
        // Update carousel indicators visibility
        document.querySelector('.carousel-indicators').style.display = isCarouselMode ? 'block' : 'none';
    }
    
    // Handle showing the current slide in carousel mode
    function showSlide(index) {
        if (!isCarouselMode) return;
        
        caseStudies.forEach((study, i) => {
            if (i === index) {
                study.style.display = 'block';
                study.classList.add('active');
            } else {
                study.style.display = 'none';
                study.classList.remove('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % caseStudies.length;
        showSlide(currentIndex);
    }
    
    // Go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length;
        showSlide(currentIndex);
    }
    
    // Handle window resize
    window.addEventListener('resize', checkCarouselMode);
    
    // Initial check
    checkCarouselMode();
    
    // Start auto-slide when in carousel mode
    function startAutoSlide() {
        if (isCarouselMode) {
            // Clear any existing intervals first
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            // Set new interval
            slideInterval = setInterval(nextSlide, 4000);
        }
    }
    
    // Stop auto-slide
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }
    
    // Update auto-slide status when carousel mode changes
    window.addEventListener('resize', function() {
        if (isCarouselMode) {
            startAutoSlide();
        } else {
            stopAutoSlide();
        }
    });
    
    // Start auto-slide if initially in carousel mode
    startAutoSlide();
});
///////////////////////////////////////////////////
// /////// expandable ///////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.expandable-section');
    
    sections.forEach(section => {
        const button = section.querySelector('.section-button');
        const header = section.querySelector('.section-header');
        
        // Function to toggle section
        function toggleSection() {
            const isExpanded = section.classList.toggle('expanded');
            
            // No need to change anything for the button
            // The CSS rotation will handle the visual change
            
            // Optional: Scroll into view when expanding
            if (isExpanded) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        }
        
        // Add click event to both button and entire header
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent double triggering
            toggleSection();
        });
        
        header.addEventListener('click', function(e) {
            // Don't trigger if clicking the button directly
            if (e.target !== button && !button.contains(e.target)) {
                toggleSection();
            }
        });
    });
});