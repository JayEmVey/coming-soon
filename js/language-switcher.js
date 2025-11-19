// Language switcher - Can be deferred
document.addEventListener('DOMContentLoaded', function() {
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'vn'; // Default to Vietnamese

    function switchLanguage(lang) {
        // Update button states
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update translatable elements
        const elements = document.querySelectorAll('[data-' + lang + ']');
        elements.forEach(el => {
            el.textContent = el.getAttribute('data-' + lang);
        });

        currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
    }

    // Load saved language
    const savedLang = localStorage.getItem('selectedLanguage') || 'vn';
    switchLanguage(savedLang);

    // Event listeners
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
});
