// Quick Search Functionality
const allTools = [
    // Calculators
    { name: 'Age Calculator', category: 'Calculators', file: 'age-calculator.html', icon: 'fas fa-calendar-alt' },
    { name: 'BMI Calculator', category: 'Calculators', file: 'bmi-calculator.html', icon: 'fas fa-heartbeat' },
    { name: 'Discount Calculator', category: 'Calculators', file: 'discount-calculator.html', icon: 'fas fa-tags' },
    { name: 'Loan EMI Calculator', category: 'Calculators', file: 'loan-emi-calculator.html', icon: 'fas fa-university' },
    { name: 'Percentage Calculator', category: 'Calculators', file: 'percentage-calculator.html', icon: 'fas fa-percentage' },
    { name: 'Scientific Calculator', category: 'Calculators', file: 'scientific-calculator.html', icon: 'fas fa-calculator' },
    { name: 'Tip Calculator', category: 'Calculators', file: 'tip-calculator.html', icon: 'fas fa-concierge-bell' },
    
    // Converters
    { name: 'Angle Converter', category: 'Converters', file: 'angle-converter.html', icon: 'fas fa-ruler-combined' },
    { name: 'Binary to Decimal Converter', category: 'Converters', file: 'binary-to-decimal-converter.html', icon: 'fas fa-microchip' },
    { name: 'Case Converter', category: 'Converters', file: 'case-converter.html', icon: 'fas fa-exchange-alt' },
    { name: 'Data Storage Converter', category: 'Converters', file: 'data-storage-converter.html', icon: 'fas fa-hdd' },
    { name: 'Energy Converter', category: 'Converters', file: 'energy-converter.html', icon: 'fas fa-bolt' },
    { name: 'Fuel Efficiency Converter', category: 'Converters', file: 'fuel-efficiency-converter.html', icon: 'fas fa-gas-pump' },
    { name: 'Length Converter', category: 'Converters', file: 'length-converter.html', icon: 'fas fa-ruler-horizontal' },
    { name: 'Pressure Converter', category: 'Converters', file: 'pressure-converter.html', icon: 'fas fa-compress-alt' },
    { name: 'Speed Converter', category: 'Converters', file: 'speed-converter.html', icon: 'fas fa-tachometer-alt' },
    { name: 'Temperature Converter', category: 'Converters', file: 'temperature-converter.html', icon: 'fas fa-thermometer-half' },
    { name: 'Volume Converter', category: 'Converters', file: 'volume-converter.html', icon: 'fas fa-flask' },
    { name: 'Weight Converter', category: 'Converters', file: 'weight-converter.html', icon: 'fas fa-weight-hanging' },
    
    // Audio Tools
    { name: 'Audio Converter', category: 'Audio Tools', file: 'audio-converter.html', icon: 'fas fa-music' },
    { name: 'Text to Speech', category: 'Audio Tools', file: 'text-to-speech.html', icon: 'fas fa-volume-up' },
    { name: 'Speech to Text', category: 'Audio Tools', file: 'speech-to-text.html', icon: 'fas fa-microphone-alt' },
    
    // Image Tools
    { name: 'Image Compressor', category: 'Image Tools', file: 'image-compressor.html', icon: 'fas fa-compress-arrows-alt' },
    { name: 'Image Cropper', category: 'Image Tools', file: 'image-cropper.html', icon: 'fas fa-crop-alt' },
    { name: 'Image Resizer', category: 'Image Tools', file: 'image-resizer.html', icon: 'fas fa-expand-arrows-alt' },
    { name: 'Image to Base64', category: 'Image Tools', file: 'image-to-base64.html', icon: 'fas fa-file-code' },
    { name: 'Image to JPEG', category: 'Image Tools', file: 'image-to-jpeg.html', icon: 'fas fa-file-image' },
    { name: 'Image to JPG', category: 'Image Tools', file: 'image-to-jpg.html', icon: 'fas fa-file-image' },
    { name: 'Image to PDF', category: 'Image Tools', file: 'image-to-pdf.html', icon: 'fas fa-file-pdf' },
    { name: 'Image to PNG', category: 'Image Tools', file: 'image-to-png.html', icon: 'fas fa-file-image' },
    { name: 'Remove Background', category: 'Image Tools', file: 'remove-background.html', icon: 'fas fa-magic' },
    { name: 'WebP to PNG', category: 'Image Tools', file: 'webp-to-png.html', icon: 'fas fa-image' },
    
    // PDF Tools
    { name: 'PDF to PPT', category: 'PDF Tools', file: 'pdf-to-ppt.html', icon: 'fas fa-file-powerpoint' },
    { name: 'PDF to Word', category: 'PDF Tools', file: 'pdf-to-word.html', icon: 'fas fa-file-word' },
    { name: 'PPT to PDF', category: 'PDF Tools', file: 'ppt-to-pdf.html', icon: 'fas fa-file-pdf' },
    { name: 'Word to PDF', category: 'PDF Tools', file: 'word-to-pdf.html', icon: 'fas fa-file-pdf' },
    
    // Generators
    { name: 'Barcode Generator', category: 'Generators', file: 'barcode-generator.html', icon: 'fas fa-barcode' },
    { name: 'Business Name Generator', category: 'Generators', file: 'business-name-generator.html', icon: 'fas fa-briefcase' },
    { name: 'Color Palette Generator', category: 'Generators', file: 'color-palette-generator.html', icon: 'fas fa-palette' },
    { name: 'Fancy Text Generator', category: 'Generators', file: 'fancy-text-generator.html', icon: 'fas fa-magic' },
    { name: 'Hashtag Generator', category: 'Generators', file: 'hashtag-generator.html', icon: 'fas fa-hashtag' },
    { name: 'HTAccess Redirect Generator', category: 'Generators', file: 'htaccess-redirect-generator.html', icon: 'fas fa-cogs' },
    { name: 'Invoice Generator', category: 'Generators', file: 'invoice-generator.html', icon: 'fas fa-file-invoice-dollar' },
    { name: 'Lottery Number Generator', category: 'Generators', file: 'lottery-number-generator.html', icon: 'fas fa-ticket-alt' },
    { name: 'Meta Tag Generator', category: 'Generators', file: 'meta-tag-generator.html', icon: 'fas fa-code' },
    { name: 'QR Code Generator', category: 'Generators', file: 'qr-code-generator.html', icon: 'fas fa-qrcode' },
    { name: 'Random Number Generator', category: 'Generators', file: 'random-number-generator.html', icon: 'fas fa-random' },
    { name: 'Robots.txt Generator', category: 'Generators', file: 'robots-txt-generator.html', icon: 'fas fa-robot' },
    { name: 'Sitemap Generator', category: 'Generators', file: 'sitemap-generator.html', icon: 'fas fa-sitemap' },
    { name: 'Story Plot Generator', category: 'Generators', file: 'story-plot-generator.html', icon: 'fas fa-book-open' },
    { name: 'Wedding Invitation Generator', category: 'Generators', file: 'wedding-invitation-generator.html', icon: 'fas fa-envelope-open-text' },
    
    // Web Tools
    { name: 'Backlink Checker', category: 'Web Tools', file: 'backlink-checker.html', icon: 'fas fa-link' },
    { name: 'Color Code Picker', category: 'Web Tools', file: 'color-code-picker.html', icon: 'fas fa-eye-dropper' },
    { name: 'CSS Minifier', category: 'Web Tools', file: 'css-minifier.html', icon: 'fab fa-css3-alt' },
    { name: 'Domain Authority Checker', category: 'Web Tools', file: 'domain-authority-checker.html', icon: 'fas fa-chart-line' },
    { name: 'Google Index Checker', category: 'Web Tools', file: 'google-index-checker.html', icon: 'fab fa-google' },
    { name: 'HTML to Markdown', category: 'Web Tools', file: 'html-to-markdown.html', icon: 'fab fa-markdown' },
    { name: 'IP Address Lookup', category: 'Web Tools', file: 'ip-address-lookup.html', icon: 'fas fa-map-marker-alt' },
    { name: 'JavaScript Minifier', category: 'Web Tools', file: 'javascript-minifier.html', icon: 'fab fa-js-square' },
    { name: 'JSON Formatter', category: 'Web Tools', file: 'json-formatter.html', icon: 'fas fa-code' },
    { name: 'Keyword Density Checker', category: 'Web Tools', file: 'keyword-density-checker.html', icon: 'fas fa-search-dollar' },
    { name: 'Markdown to HTML', category: 'Web Tools', file: 'markdown-to-html.html', icon: 'fab fa-html5' },
    { name: 'Mobile Friendly Test', category: 'Web Tools', file: 'mobile-friendly-test.html', icon: 'fas fa-mobile-alt' },
    { name: 'Page Speed Checker', category: 'Web Tools', file: 'page-speed-checker.html', icon: 'fas fa-tachometer-alt' },
    { name: 'SQL Formatter', category: 'Web Tools', file: 'sql-formatter.html', icon: 'fas fa-database' },
    { name: 'URL Encoder/Decoder', category: 'Web Tools', file: 'url-encoder-decoder.html', icon: 'fas fa-link' },
    { name: 'XML Sitemap Validator', category: 'Web Tools', file: 'xml-sitemap-validator.html', icon: 'fas fa-file-code' },
    { name: 'YouTube Tags Extractor', category: 'Web Tools', file: 'youtube-tags-extractor.html', icon: 'fas fa-tags' },
    
    // Miscellaneous Tools
    { name: 'Character Counter', category: 'Miscellaneous Tools', file: 'character-counter.html', icon: 'fas fa-font' },
    { name: 'Currency Converter', category: 'Miscellaneous Tools', file: 'currency-converter.html', icon: 'fas fa-dollar-sign' },
    { name: 'Daily Planner Creator', category: 'Miscellaneous Tools', file: 'daily-planner-creator.html', icon: 'fas fa-calendar-check' },
    { name: 'Dice Roller Simulator', category: 'Miscellaneous Tools', file: 'dice-roller-simulator.html', icon: 'fas fa-dice' },
    { name: 'Emoji Keyboard', category: 'Miscellaneous Tools', file: 'emoji-keyboard.html', icon: 'fas fa-smile' },
    { name: 'Facebook Video Downloader', category: 'Miscellaneous Tools', file: 'facebook-video-downloader.html', icon: 'fab fa-facebook' },
    { name: 'Flip a Coin Simulator', category: 'Miscellaneous Tools', file: 'flip-a-coin-simulator.html', icon: 'fas fa-coins' },
    { name: 'GIF Maker', category: 'Miscellaneous Tools', file: 'gif-maker.html', icon: 'fas fa-film' },
    { name: 'Grammar Checker', category: 'Miscellaneous Tools', file: 'grammar-checker.html', icon: 'fas fa-spell-check' },
    { name: 'Instagram Photo Downloader', category: 'Miscellaneous Tools', file: 'instagram-photo-downloader.html', icon: 'fab fa-instagram' },
    { name: 'Internet Speed Test', category: 'Miscellaneous Tools', file: 'internet-speed-test.html', icon: 'fas fa-tachometer-alt' },
    { name: 'Meme Generator', category: 'Miscellaneous Tools', file: 'meme-generator.html', icon: 'fas fa-smile' },
    { name: 'Password Strength Checker', category: 'Miscellaneous Tools', file: 'password-strength-checker.html', icon: 'fas fa-key' },
    { name: 'Plagiarism Checker', category: 'Miscellaneous Tools', file: 'plagiarism-checker.html', icon: 'fas fa-search' },
    { name: 'Random Text Generator', category: 'Miscellaneous Tools', file: 'random-text-generator.html', icon: 'fas fa-random' },
    { name: 'Resume Builder', category: 'Miscellaneous Tools', file: 'resume-builder.html', icon: 'fas fa-file-alt' },
    { name: 'Screenshot to PDF', category: 'Miscellaneous Tools', file: 'screenshot-to-pdf.html', icon: 'fas fa-camera-retro' },
    { name: 'Social Media Post Generator', category: 'Miscellaneous Tools', file: 'social-media-post-generator.html', icon: 'fas fa-share-square' },
    { name: 'TikTok Video Downloader', category: 'Miscellaneous Tools', file: 'tiktok-video-downloader.html', icon: 'fab fa-tiktok' },
    { name: 'Time Zone Converter', category: 'Miscellaneous Tools', file: 'time-zone-converter.html', icon: 'fas fa-globe' },
    { name: 'Twitter Character Counter', category: 'Miscellaneous Tools', file: 'twitter-character-counter.html', icon: 'fab fa-twitter' },
    { name: 'Twitter Video Downloader', category: 'Miscellaneous Tools', file: 'twitter-video-downloader.html', icon: 'fab fa-twitter' },
    { name: 'Word Counter', category: 'Miscellaneous Tools', file: 'word-counter.html', icon: 'fas fa-file-word' },
    { name: 'YouTube Thumbnail Downloader', category: 'Miscellaneous Tools', file: 'youtube-thumbnail-downloader.html', icon: 'fab fa-youtube' }
];

// Initialize Quick Search
function initializeQuickSearch() {
    const searchInput = document.getElementById('quickSearchInput');
    const clearBtn = document.getElementById('clearSearch');
    const resultsContainer = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');
    const closeBtn = document.getElementById('closeResults');

    if (!searchInput) return;

    // Search input event listener
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 0) {
            performQuickSearch(query);
            clearBtn.style.display = 'block';
        } else {
            hideSearchResults();
            clearBtn.style.display = 'none';
        }
    });

    // Clear button event listener
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        hideSearchResults();
        clearBtn.style.display = 'none';
        searchInput.focus();
    });

    // Close results button event listener
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideSearchResults();
        });
    }

    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            hideSearchResults();
        }
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideSearchResults();
        }
    });
}

// Perform quick search
function performQuickSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');

    if (!resultsContainer || !resultsList || !resultsCount) return;

    const searchTerm = query.toLowerCase();
    const results = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.category.toLowerCase().includes(searchTerm)
    );

    displaySearchResults(results, query);
}

// Display search results
function displaySearchResults(results, query) {
    const resultsContainer = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');

    if (!resultsContainer || !resultsList || !resultsCount) return;

    resultsList.innerHTML = '';
    
    if (results.length > 0) {
        resultsCount.textContent = `${results.length} result${results.length > 1 ? 's' : ''} found for "${query}"`;
        
        results.forEach(tool => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            // Highlight matching text
            let highlightedName = tool.name;
            if (query) {
                const regex = new RegExp(`(${query})`, 'gi');
                highlightedName = tool.name.replace(regex, '<mark>$1</mark>');
            }
            
            resultItem.innerHTML = `
                <div class="result-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="result-content">
                    <div class="result-title">${highlightedName}</div>
                    <div class="result-category">${tool.category}</div>
                </div>
            `;
            
            resultItem.addEventListener('click', function() {
                window.location.href = tool.file;
            });
            
            resultsList.appendChild(resultItem);
        });
    } else {
        resultsCount.textContent = `No results found for "${query}"`;
        resultsList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No tools found matching "${query}"</p>
                <p>Try different keywords or browse categories below</p>
            </div>
        `;
    }

    resultsContainer.style.display = 'block';
}

// Hide search results
function hideSearchResults() {
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuickSearch();
    
    // Initialize category toggles
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.closest('.category-card');
            card.classList.toggle('active');
        });
    });
}); 