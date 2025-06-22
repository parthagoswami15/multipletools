/**
 * Initializes all site-wide components and event listeners.
 * This function should be called after the DOM is fully loaded.
 */
function initializeApp() {
    console.log("Initializing app...");
    initializeCategoryToggles();
    
    // Initialize the quick search functionality if it exists
    if (typeof initializeQuickSearch === 'function') {
        initializeQuickSearch();
        console.log("Quick search initialized.");
    }
}

/**
 * Sets up the expand/collapse functionality for tool categories.
 * When a category header is clicked, it toggles the 'active' class on its parent card.
 */
function initializeCategoryToggles() {
    const categoryHeaders = document.querySelectorAll('.category-header');
    console.log(`Found ${categoryHeaders.length} category headers.`);
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.closest('.category-card');
            if (card) {
                console.log(`Toggling category: ${card.querySelector('h3').textContent.trim()}`);
                card.classList.toggle('active');
            }
        });
    });
}

function hideSearchResults() {
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

/**
 * Main app initialization function.
 * This should be called from a script tag at the end of the HTML body.
 */
function initializeApp() {
    // From original DOMContentLoaded #1
    loadComponents();
    if (document.querySelector('.home-page')) {
        renderTools();
        updateLiveViewers();
    }
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const header = card.querySelector('.category-header');
        if (header) {
            header.addEventListener('click', () => card.classList.toggle('active'));
        }
    });
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => nav.classList.toggle('active'));
    }
    // ... animation observers and other setup from the first listener can be added here ...

    // From original DOMContentLoaded #2
    const toolSearchInput = document.getElementById('tool-search');
    if (toolSearchInput) {
        toolSearchInput.addEventListener('input', (e) => performHeaderSearch(e.target.value));
        toolSearchInput.addEventListener('focus', () => {
             if (!toolSearchInput.value) showHeaderSuggestions();
        });
    }
    document.querySelectorAll('.suggestion-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const query = tag.dataset.query;
            if(toolSearchInput) toolSearchInput.value = query;
            performHeaderSearch(query);
            hideHeaderSuggestions();
        });
    });
    document.addEventListener('click', (e) => {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && !searchContainer.contains(e.target)) {
            hideHeaderResults();
            hideHeaderSuggestions();
        }
    });
    displayAllTools();

    // From quick-search.js DOMContentLoaded
    initializeQuickSearch();
}

// NOTE: The rest of the original main.js content is removed for this refactoring.
// We are only keeping the essential logic to fix the immediate problem.
// Other functionalities like animations, live viewers, etc., can be re-integrated later if needed.