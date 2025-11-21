// Scroll animations - Can be deferred
document.addEventListener('DOMContentLoaded', function() {
    // Scroll indicator fade out
    window.addEventListener('scroll', function() {
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) indicator.style.opacity = '0';
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.menu, .footer');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Trigger animation immediately for above-fold content
    const menuElements = document.querySelector('.menu');
    if (menuElements) {
        menuElements.classList.add('animate-in');
    }
});
