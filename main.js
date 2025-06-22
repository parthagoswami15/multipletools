window.onload = function() {
    // Initialize header search elements
    const searchInput = document.getElementById('toolSearch');
    const searchClear = document.getElementById('searchClear');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');
    const closeResults = document.getElementById('closeResults');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    // Check if the tool-search element exists before adding an event listener
    const toolSearch = document.getElementById('tool-search');
    if (toolSearch) {
        renderTools();
        toolSearch.addEventListener('input', searchTools);
    }
};

// Complete tool data with all Image Tools, Text Tools, Convert Tools, Math & Calculators, SEO Tools, Developer Tools, Unit Converters, and Social Media Tools
const tools = [
    // Image Tools
    { name: 'Image to PNG Converter', category: 'Image Tools', file: 'image-to-png.html' },
    { name: 'Image to JPG Converter', category: 'Image Tools', file: 'image-to-jpg.html' },
    { name: 'Image Resizer', category: 'Image Tools', file: 'image-resizer.html' },
    { name: 'Image Compressor', category: 'Image Tools', file: 'image-compressor.html' },
    { name: 'Image Cropper', category: 'Image Tools', file: 'image-cropper.html' },
    { name: 'Convert Image to Base64', category: 'Image Tools', file: 'image-to-base64.html' },
    { name: 'Convert WebP to PNG', category: 'Image Tools', file: 'webp-to-png.html' },
    { name: 'GIF Maker', category: 'Image Tools', file: 'gif-maker.html' },
    { name: 'QR Code Generator', category: 'Image Tools', file: 'qr-code-generator.html' },
    { name: 'Screenshot to PDF Converter', category: 'Image Tools', file: 'screenshot-to-pdf.html' },
    { name: 'Image to JPEG', category: 'Image Tools', file: 'image-to-jpeg.html' },
    
    // Text Tools
    { name: 'Word Counter', category: 'Text Tools', file: 'word-counter.html' },
    { name: 'Character Counter', category: 'Text Tools', file: 'character-counter.html' },
    { name: 'Case Converter', category: 'Text Tools', file: 'case-converter.html' },
    { name: 'Plagiarism Checker', category: 'Text Tools', file: 'plagiarism-checker.html' },
    { name: 'Grammar Checker', category: 'Text Tools', file: 'grammar-checker.html' },
    { name: 'Text-to-Speech', category: 'Text Tools', file: 'text-to-speech.html' },
    { name: 'Speech-to-Text', category: 'Text Tools', file: 'speech-to-text.html' },
    { name: 'URL Encoder & Decoder', category: 'Text Tools', file: 'url-encoder-decoder.html' },
    { name: 'Fancy Text Generator', category: 'Text Tools', file: 'fancy-text-generator.html' },
    { name: 'Random Text Generator', category: 'Text Tools', file: 'random-text-generator.html' },
    
    // Convert Tools
    { name: 'Word to PDF', category: 'Convert Tools', file: 'word-to-pdf.html' },
    { name: 'PDF to Word', category: 'Convert Tools', file: 'pdf-to-word.html' },
    { name: 'Image to PDF', category: 'Convert Tools', file: 'image-to-pdf.html' },
    { name: 'PDF to PPT', category: 'Convert Tools', file: 'pdf-to-ppt.html' },
    { name: 'PPT to PDF', category: 'Convert Tools', file: 'ppt-to-pdf.html' },
    { name: 'Word to PPT', category: 'Convert Tools', file: 'word-to-ppt.html' },
    { name: 'PPT to Word', category: 'Convert Tools', file: 'ppt-to-word.html' },
    
    // Math & Calculators
    { name: 'Percentage Calculator', category: 'Math & Calculators', file: 'percentage-calculator.html' },
    { name: 'Age Calculator', category: 'Math & Calculators', file: 'age-calculator.html' },
    { name: 'BMI Calculator', category: 'Math & Calculators', file: 'bmi-calculator.html' },
    { name: 'Loan EMI Calculator', category: 'Math & Calculators', file: 'loan-emi-calculator.html' },
    { name: 'Scientific Calculator', category: 'Math & Calculators', file: 'scientific-calculator.html' },
    { name: 'Discount Calculator', category: 'Math & Calculators', file: 'discount-calculator.html' },
    { name: 'Currency Converter', category: 'Math & Calculators', file: 'currency-converter.html' },
    { name: 'Time Zone Converter', category: 'Math & Calculators', file: 'time-zone-converter.html' },
    { name: 'Binary to Decimal Converter', category: 'Math & Calculators', file: 'binary-to-decimal-converter.html' },
    { name: 'Tip Calculator', category: 'Math & Calculators', file: 'tip-calculator.html' },
    
    // SEO Tools
    { name: 'Mobile-Friendly Test', category: 'SEO Tools', file: 'mobile-friendly-test.html' },
    { name: 'Page Speed Checker', category: 'SEO Tools', file: 'page-speed-checker.html' },
    { name: 'Keyword Density Checker', category: 'SEO Tools', file: 'keyword-density-checker.html' },
    { name: 'Backlink Checker', category: 'SEO Tools', file: 'backlink-checker.html' },
    { name: 'Domain Authority Checker', category: 'SEO Tools', file: 'domain-authority-checker.html' },
    { name: 'Google Index Checker', category: 'SEO Tools', file: 'google-index-checker.html' },
    { name: 'Meta Tag Generator', category: 'SEO Tools', file: 'meta-tag-generator.html' },
    { name: 'Robots.txt Generator', category: 'SEO Tools', file: 'robots-txt-generator.html' },
    { name: 'Sitemap Generator', category: 'SEO Tools', file: 'sitemap-generator.html' },
    { name: 'XML Sitemap Validator', category: 'SEO Tools', file: 'xml-sitemap-validator.html' },
    
    // Miscellaneous Tools
    { name: "Barcode Generator", category: "Miscellaneous Tools", file: "barcode-generator.html" },
    { name: "Meme Generator", category: "Miscellaneous Tools", file: "meme-generator.html" },
    { name: "Resume Builder", category: "Miscellaneous Tools", file: "resume-builder.html" },
    { name: "Invoice Generator", category: "Miscellaneous Tools", file: "invoice-generator.html" },
    { name: "Business Name Generator", category: "Miscellaneous Tools", file: "business-name-generator.html" },
    { name: "Lottery Number Generator", category: "Miscellaneous Tools", file: "lottery-number-generator.html" },
    { name: "Flip a Coin Simulator", category: "Miscellaneous Tools", file: "flip-a-coin-simulator.html" },
    { name: "Random Number Generator", category: "Miscellaneous Tools", file: "random-number-generator.html" },
    { name: "Dice Roller Simulator", category: "Miscellaneous Tools", file: "dice-roller-simulator.html" },
    { name: "Password Strength Checker", category: "Miscellaneous Tools", file: "password-strength-checker.html" },
    { name: "Color Palette Generator", category: "Miscellaneous Tools", file: "color-palette-generator.html" },
    { name: "Daily Planner Creator", category: "Miscellaneous Tools", file: "daily-planner-creator.html" },
    { name: "Wedding Invitation Generator", category: "Miscellaneous Tools", file: "wedding-invitation-generator.html" },
    { name: "Story Plot Generator", category: "Miscellaneous Tools", file: "story-plot-generator.html" },
    
    // Developer Tools
    { name: 'JSON Formatter', category: 'Developer Tools', file: 'json-formatter.html' },
    { name: 'HTML to Markdown Converter', category: 'Developer Tools', file: 'html-to-markdown.html' },
    { name: 'CSS Minifier', category: 'Developer Tools', file: 'css-minifier.html' },
    { name: 'JavaScript Minifier', category: 'Developer Tools', file: 'javascript-minifier.html' },
    { name: 'SQL Formatter', category: 'Developer Tools', file: 'sql-formatter.html' },
    { name: 'HTACCESS Redirect Generator', category: 'Developer Tools', file: 'htaccess-redirect-generator.html' },
    { name: 'Markdown to HTML Converter', category: 'Developer Tools', file: 'markdown-to-html.html' },
    { name: 'Color Code Picker', category: 'Developer Tools', file: 'color-code-picker.html' },
    { name: 'Base64 Encoder & Decoder', category: 'Developer Tools', file: 'base64-encoder-decoder.html' },
    { name: 'IP Address Lookup', category: 'Developer Tools', file: 'ip-address-lookup.html' },
    
    // Unit Converters
    { name: 'Length Converter', category: 'Unit Converters', file: 'length-converter.html' },
    { name: 'Weight Converter', category: 'Unit Converters', file: 'weight-converter.html' },
    { name: 'Speed Converter', category: 'Unit Converters', file: 'speed-converter.html' },
    { name: 'Temperature Converter', category: 'Unit Converters', file: 'temperature-converter.html' },
    { name: 'Volume Converter', category: 'Unit Converters', file: 'volume-converter.html' },
    { name: 'Data Storage Converter', category: 'Unit Converters', file: 'data-storage-converter.html' },
    { name: 'Energy Converter', category: 'Unit Converters', file: 'energy-converter.html' },
    { name: 'Pressure Converter', category: 'Unit Converters', file: 'pressure-converter.html' },
    { name: 'Fuel Efficiency Converter', category: 'Unit Converters', file: 'fuel-efficiency-converter.html' },
    { name: 'Angle Converter', category: 'Unit Converters', file: 'angle-converter.html' },
    
    // Social Media Tools
    { name: 'YouTube Thumbnail Downloader', category: 'Social Media Tools', file: 'youtube-thumbnail-downloader.html' },
    { name: 'Instagram Photo Downloader', category: 'Social Media Tools', file: 'instagram-photo-downloader.html' },
    { name: 'Twitter Video Downloader', category: 'Social Media Tools', file: 'twitter-video-downloader.html' },
    { name: 'Facebook Video Downloader', category: 'Social Media Tools', file: 'facebook-video-downloader.html' },
    { name: 'TikTok Video Downloader', category: 'Social Media Tools', file: 'tiktok-video-downloader.html' },
    { name: 'YouTube Tags Extractor', category: 'Social Media Tools', file: 'youtube-tags-extractor.html' },
    { name: 'Hashtag Generator', category: 'Social Media Tools', file: 'hashtag-generator.html' },
    { name: 'Social Media Post Generator', category: 'Social Media Tools', file: 'social-media-post-generator.html' },
    { name: 'Emoji Keyboard', category: 'Social Media Tools', file: 'emoji-keyboard.html' },
    { name: 'Twitter Character Counter', category: 'Social Media Tools', file: 'twitter-character-counter.html' },
];

const categories = [
    'Image Tools', 'Text Tools', 'Convert Tools', 'SEO Tools', 'Developer Tools', 'Math & Calculators',
    'Unit Converters', 'Social Media Tools', 'Miscellaneous Tools'
];

function renderTools(filter = '') {
    const container = document.getElementById('tool-categories');
    if (container) {
        container.innerHTML = '';
        categories.forEach(cat => {
            const catTools = tools.filter(t => t.category === cat && t.name.toLowerCase().includes(filter.toLowerCase()));
            if (catTools.length) {
                let toolLinks = '';
                catTools.forEach(tool => {
                    toolLinks += `<a href="${tool.file}" class="list-group-item list-group-item-action">${tool.name}</a>`;
                });

                container.innerHTML += `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card h-100 category-card">
                            <div class="card-body">
                                <h5 class="card-title category-title">${cat}</h5>
                                <div class="list-group list-group-flush tool-list">
                                    ${toolLinks}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }
}

function searchTools(e) {
    renderTools(e.target.value);
}

// Accordion functionality for category cards
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        const header = card.querySelector('.category-header');
        const content = card.querySelector('.category-content');
        
        header.addEventListener('click', function() {
            const isActive = card.classList.contains('active');
            
            // Close all other cards
            categoryCards.forEach(otherCard => {
                otherCard.classList.remove('active');
            });
            
            // Toggle current card
            if (!isActive) {
                card.classList.add('active');
            }
        });
    });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // --- ANIMATION ON SCROLL ---
    const animatedSections = document.querySelectorAll('.stats-section, .features-section, .author-section, .reviews-section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Animate numbers if it's the stats section
                if (entry.target.classList.contains('stats-section')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(number => {
                        const target = parseInt(number.dataset.target, 10);
                        if (!isNaN(target)) {
                            countUp(number, target);
                        }
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Prepare stat numbers for animation
    const statNumbers = document.querySelectorAll('.stats-section .stat-number');
    statNumbers.forEach(number => {
        const value = number.textContent.trim();
        number.dataset.target = value.replace('+', '');
        number.textContent = '0' + (value.includes('+') ? '+' : '');
    });
});

function countUp(element, target) {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 16ms for ~60fps

    const counter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start) + (element.dataset.target.includes('+') ? '+' : '');
            requestAnimationFrame(counter);
        } else {
            element.textContent = element.dataset.target + (element.dataset.target.includes('+') ? '' : '');
        }
    };
    counter();
}

// Enhanced Search Functionality for Header
const searchInput = document.getElementById('toolSearch');
const searchClear = document.getElementById('searchClear');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchResults = document.getElementById('searchResults');
const resultsList = document.getElementById('resultsList');
const resultsCount = document.getElementById('resultsCount');
const closeResults = document.getElementById('closeResults');
const suggestionTags = document.querySelectorAll('.suggestion-tag');

// Enhanced tools database for search with icons and keywords
const toolsDatabase = [
    // Calculators
    { name: 'Age Calculator', url: 'age-calculator.html', category: 'Calculators', icon: 'fas fa-birthday-cake', keywords: 'age, birthday, date, calculator' },
    { name: 'BMI Calculator', url: 'bmi-calculator.html', category: 'Calculators', icon: 'fas fa-weight', keywords: 'bmi, body mass index, health, calculator' },
    { name: 'Discount Calculator', url: 'discount-calculator.html', category: 'Calculators', icon: 'fas fa-tags', keywords: 'discount, sale, price, calculator' },
    { name: 'Loan EMI Calculator', url: 'loan-emi-calculator.html', category: 'Calculators', icon: 'fas fa-money-bill-wave', keywords: 'loan, emi, finance, calculator' },
    { name: 'Percentage Calculator', url: 'percentage-calculator.html', category: 'Calculators', icon: 'fas fa-percentage', keywords: 'percentage, math, calculator' },
    { name: 'Scientific Calculator', url: 'scientific-calculator.html', category: 'Calculators', icon: 'fas fa-square-root-alt', keywords: 'scientific, math, calculator' },
    { name: 'Tip Calculator', url: 'tip-calculator.html', category: 'Calculators', icon: 'fas fa-hand-holding-usd', keywords: 'tip, restaurant, calculator' },
    
    // Converters
    { name: 'Angle Converter', url: 'angle-converter.html', category: 'Converters', icon: 'fas fa-compass', keywords: 'angle, degree, radian, converter' },
    { name: 'Binary to Decimal Converter', url: 'binary-to-decimal-converter.html', category: 'Converters', icon: 'fas fa-1', keywords: 'binary, decimal, number, converter' },
    { name: 'Case Converter', url: 'case-converter.html', category: 'Converters', icon: 'fas fa-exchange-alt', keywords: 'case, text, uppercase, lowercase, converter' },
    { name: 'Data Storage Converter', url: 'data-storage-converter.html', category: 'Converters', icon: 'fas fa-hdd', keywords: 'data, storage, byte, converter' },
    { name: 'Energy Converter', url: 'energy-converter.html', category: 'Converters', icon: 'fas fa-bolt', keywords: 'energy, joule, calorie, converter' },
    { name: 'Fuel Efficiency Converter', url: 'fuel-efficiency-converter.html', category: 'Converters', icon: 'fas fa-gas-pump', keywords: 'fuel, efficiency, mpg, converter' },
    { name: 'Length Converter', url: 'length-converter.html', category: 'Converters', icon: 'fas fa-ruler-horizontal', keywords: 'length, meter, feet, converter' },
    { name: 'Pressure Converter', url: 'pressure-converter.html', category: 'Converters', icon: 'fas fa-compress-arrows-alt', keywords: 'pressure, pascal, bar, converter' },
    { name: 'Speed Converter', url: 'speed-converter.html', category: 'Converters', icon: 'fas fa-tachometer-alt', keywords: 'speed, kmh, mph, converter' },
    { name: 'Temperature Converter', url: 'temperature-converter.html', category: 'Converters', icon: 'fas fa-thermometer-half', keywords: 'temperature, celsius, fahrenheit, converter' },
    { name: 'Volume Converter', url: 'volume-converter.html', category: 'Converters', icon: 'fas fa-cube', keywords: 'volume, liter, gallon, converter' },
    { name: 'Weight Converter', url: 'weight-converter.html', category: 'Converters', icon: 'fas fa-weight-hanging', keywords: 'weight, kg, pound, converter' },
    
    // Image Tools
    { name: 'Image Compressor', url: 'image-compressor.html', category: 'Image Tools', icon: 'fas fa-compress-alt', keywords: 'image, compress, reduce, size' },
    { name: 'Image Cropper', url: 'image-cropper.html', category: 'Image Tools', icon: 'fas fa-crop-alt', keywords: 'image, crop, resize, edit' },
    { name: 'Image Resizer', url: 'image-resizer.html', category: 'Image Tools', icon: 'fas fa-expand-arrows-alt', keywords: 'image, resize, dimensions, scale' },
    { name: 'Image to Base64', url: 'image-to-base64.html', category: 'Image Tools', icon: 'fas fa-code', keywords: 'image, base64, encode, convert' },
    { name: 'Image to JPEG', url: 'image-to-jpeg.html', category: 'Image Tools', icon: 'fas fa-file-image', keywords: 'image, jpeg, convert, format' },
    { name: 'Image to JPG', url: 'image-to-jpg.html', category: 'Image Tools', icon: 'fas fa-file-image', keywords: 'image, jpg, convert, format' },
    { name: 'Image to PDF', url: 'image-to-pdf.html', category: 'Image Tools', icon: 'fas fa-file-pdf', keywords: 'image, pdf, convert, document' },
    { name: 'Image to PNG', url: 'image-to-png.html', category: 'Image Tools', icon: 'fas fa-file-image', keywords: 'image, png, convert, format' },
    { name: 'Remove Background', url: 'remove-background.html', category: 'Image Tools', icon: 'fas fa-cut', keywords: 'image, background, remove, transparent' },
    { name: 'WebP to PNG', url: 'webp-to-png.html', category: 'Image Tools', icon: 'fas fa-exchange-alt', keywords: 'webp, png, convert, format' },
    
    // PDF Tools
    { name: 'PDF to PPT', url: 'pdf-to-ppt.html', category: 'PDF Tools', icon: 'fas fa-file-powerpoint', keywords: 'pdf, ppt, powerpoint, convert' },
    { name: 'PDF to Word', url: 'pdf-to-word.html', category: 'PDF Tools', icon: 'fas fa-file-word', keywords: 'pdf, word, document, convert' },
    { name: 'PPT to PDF', url: 'ppt-to-pdf.html', category: 'PDF Tools', icon: 'fas fa-file-pdf', keywords: 'ppt, pdf, powerpoint, convert' },
    { name: 'Word to PDF', url: 'word-to-pdf.html', category: 'PDF Tools', icon: 'fas fa-file-pdf', keywords: 'word, pdf, document, convert' },
    
    // Generators
    { name: 'Barcode Generator', url: 'barcode-generator.html', category: 'Generators', icon: 'fas fa-barcode', keywords: 'barcode, generate, code, scanner' },
    { name: 'Business Name Generator', url: 'business-name-generator.html', category: 'Generators', icon: 'fas fa-building', keywords: 'business, name, company, generate' },
    { name: 'Color Palette Generator', url: 'color-palette-generator.html', category: 'Generators', icon: 'fas fa-palette', keywords: 'color, palette, generate, design' },
    { name: 'Fancy Text Generator', url: 'fancy-text-generator.html', category: 'Generators', icon: 'fas fa-magic', keywords: 'fancy, text, style, generate' },
    { name: 'Hashtag Generator', url: 'hashtag-generator.html', category: 'Generators', icon: 'fas fa-hashtag', keywords: 'hashtag, social media, generate' },
    { name: 'HTAccess Redirect Generator', url: 'htaccess-redirect-generator.html', category: 'Generators', icon: 'fas fa-arrow-right', keywords: 'htaccess, redirect, apache, generate' },
    { name: 'Invoice Generator', url: 'invoice-generator.html', category: 'Generators', icon: 'fas fa-receipt', keywords: 'invoice, bill, generate, business' },
    { name: 'Lottery Number Generator', url: 'lottery-number-generator.html', category: 'Generators', icon: 'fas fa-dice', keywords: 'lottery, number, random, generate' },
    { name: 'Meta Tag Generator', url: 'meta-tag-generator.html', category: 'Generators', icon: 'fas fa-tags', keywords: 'meta, tag, seo, generate' },
    { name: 'QR Code Generator', url: 'qr-code-generator.html', category: 'Generators', icon: 'fas fa-qrcode', keywords: 'qr, code, generate, scan' },
    { name: 'Random Number Generator', url: 'random-number-generator.html', category: 'Generators', icon: 'fas fa-dice', keywords: 'random, number, generate' },
    { name: 'Robots.txt Generator', url: 'robots-txt-generator.html', category: 'Generators', icon: 'fas fa-robot', keywords: 'robots, txt, seo, generate' },
    { name: 'Sitemap Generator', url: 'sitemap-generator.html', category: 'Generators', icon: 'fas fa-sitemap', keywords: 'sitemap, xml, seo, generate' },
    { name: 'Story Plot Generator', url: 'story-plot-generator.html', category: 'Generators', icon: 'fas fa-book', keywords: 'story, plot, creative, generate' },
    { name: 'Wedding Invitation Generator', url: 'wedding-invitation-generator.html', category: 'Generators', icon: 'fas fa-heart', keywords: 'wedding, invitation, generate' },
    
    // Web Tools
    { name: 'Backlink Checker', url: 'backlink-checker.html', category: 'Web Tools', icon: 'fas fa-link', keywords: 'backlink, seo, check, analyze' },
    { name: 'Color Code Picker', url: 'color-code-picker.html', category: 'Web Tools', icon: 'fas fa-palette', keywords: 'color, picker, hex, rgb' },
    { name: 'CSS Minifier', url: 'css-minifier.html', category: 'Web Tools', icon: 'fas fa-compress', keywords: 'css, minify, compress, optimize' },
    { name: 'Domain Authority Checker', url: 'domain-authority-checker.html', category: 'Web Tools', icon: 'fas fa-shield-alt', keywords: 'domain, authority, seo, check' },
    { name: 'Google Index Checker', url: 'google-index-checker.html', category: 'Web Tools', icon: 'fas fa-google', keywords: 'google, index, seo, check' },
    { name: 'HTML to Markdown', url: 'html-to-markdown.html', category: 'Web Tools', icon: 'fas fa-file-code', keywords: 'html, markdown, convert' },
    { name: 'IP Address Lookup', url: 'ip-address-lookup.html', category: 'Web Tools', icon: 'fas fa-globe', keywords: 'ip, address, lookup, location' },
    { name: 'JavaScript Minifier', url: 'javascript-minifier.html', category: 'Web Tools', icon: 'fab fa-js-square', keywords: 'javascript, minify, compress, optimize' },
    { name: 'JSON Formatter', url: 'json-formatter.html', category: 'Web Tools', icon: 'fas fa-brackets-curly', keywords: 'json, format, beautify, validate' },
    { name: 'Keyword Density Checker', url: 'keyword-density-checker.html', category: 'Web Tools', icon: 'fas fa-key', keywords: 'keyword, density, seo, analyze' },
    { name: 'Markdown to HTML', url: 'markdown-to-html.html', category: 'Web Tools', icon: 'fas fa-file-code', keywords: 'markdown, html, convert' },
    { name: 'Mobile Friendly Test', url: 'mobile-friendly-test.html', category: 'Web Tools', icon: 'fas fa-mobile-alt', keywords: 'mobile, friendly, test, responsive' },
    { name: 'Page Speed Checker', url: 'page-speed-checker.html', category: 'Web Tools', icon: 'fas fa-tachometer-alt', keywords: 'page, speed, performance, check' },
    { name: 'SQL Formatter', url: 'sql-formatter.html', category: 'Web Tools', icon: 'fas fa-database', keywords: 'sql, format, beautify, query' },
    { name: 'URL Encoder/Decoder', url: 'url-encoder-decoder.html', category: 'Web Tools', icon: 'fas fa-link', keywords: 'url, encode, decode, convert' },
    { name: 'XML Sitemap Validator', url: 'xml-sitemap-validator.html', category: 'Web Tools', icon: 'fas fa-check-circle', keywords: 'xml, sitemap, validate, seo' },
    { name: 'YouTube Tags Extractor', url: 'youtube-tags-extractor.html', category: 'Web Tools', icon: 'fas fa-tags', keywords: 'youtube, tags, extract, analyze' },
    
    // Miscellaneous Tools
    { name: 'Character Counter', url: 'character-counter.html', category: 'Miscellaneous', icon: 'fas fa-text-width', keywords: 'character, count, text, length' },
    { name: 'Currency Converter', url: 'currency-converter.html', category: 'Miscellaneous', icon: 'fas fa-dollar-sign', keywords: 'currency, convert, exchange, rate' },
    { name: 'Daily Planner Creator', url: 'daily-planner-creator.html', category: 'Miscellaneous', icon: 'fas fa-calendar', keywords: 'daily, planner, schedule, create' },
    { name: 'Dice Roller Simulator', url: 'dice-roller-simulator.html', category: 'Miscellaneous', icon: 'fas fa-dice-d6', keywords: 'dice, roll, random, game' },
    { name: 'Emoji Keyboard', url: 'emoji-keyboard.html', category: 'Miscellaneous', icon: 'fas fa-smile', keywords: 'emoji, keyboard, symbols, copy' },
    { name: 'Facebook Video Downloader', url: 'facebook-video-downloader.html', category: 'Miscellaneous', icon: 'fab fa-facebook', keywords: 'facebook, video, download' },
    { name: 'Flip a Coin Simulator', url: 'flip-a-coin-simulator.html', category: 'Miscellaneous', icon: 'fas fa-circle', keywords: 'coin, flip, random, heads tails' },
    { name: 'GIF Maker', url: 'gif-maker.html', category: 'Miscellaneous', icon: 'fas fa-film', keywords: 'gif, maker, animate, create' },
    { name: 'Grammar Checker', url: 'grammar-checker.html', category: 'Miscellaneous', icon: 'fas fa-spell-check', keywords: 'grammar, check, spell, correct' },
    { name: 'Instagram Photo Downloader', url: 'instagram-photo-downloader.html', category: 'Miscellaneous', icon: 'fab fa-instagram', keywords: 'instagram, photo, download' },
    { name: 'Internet Speed Test', url: 'internet-speed-test.html', category: 'Miscellaneous', icon: 'fas fa-tachometer-alt', keywords: 'internet, speed, test, bandwidth' },
    { name: 'Meme Generator', url: 'meme-generator.html', category: 'Miscellaneous', icon: 'fas fa-laugh', keywords: 'meme, generator, create, funny' },
    { name: 'Password Strength Checker', url: 'password-strength-checker.html', category: 'Miscellaneous', icon: 'fas fa-shield-alt', keywords: 'password, strength, check, secure' },
    { name: 'Plagiarism Checker', url: 'plagiarism-checker.html', category: 'Miscellaneous', icon: 'fas fa-search', keywords: 'plagiarism, check, duplicate, content' },
    { name: 'Random Text Generator', url: 'random-text-generator.html', category: 'Miscellaneous', icon: 'fas fa-random', keywords: 'random, text, generate, lorem' },
    { name: 'Resume Builder', url: 'resume-builder.html', category: 'Miscellaneous', icon: 'fas fa-file-alt', keywords: 'resume, builder, cv, create' },
    { name: 'Screenshot to PDF', url: 'screenshot-to-pdf.html', category: 'Miscellaneous', icon: 'fas fa-camera', keywords: 'screenshot, pdf, convert, capture' },
    { name: 'Social Media Post Generator', url: 'social-media-post-generator.html', category: 'Miscellaneous', icon: 'fas fa-edit', keywords: 'social, media, post, generate' },
    { name: 'Speech to Text', url: 'speech-to-text.html', category: 'Miscellaneous', icon: 'fas fa-microphone', keywords: 'speech, text, voice, convert' },
    { name: 'Text to Speech', url: 'text-to-speech.html', category: 'Miscellaneous', icon: 'fas fa-volume-up', keywords: 'text, speech, voice, convert' },
    { name: 'TikTok Video Downloader', url: 'tiktok-video-downloader.html', category: 'Miscellaneous', icon: 'fab fa-tiktok', keywords: 'tiktok, video, download' },
    { name: 'Time Zone Converter', url: 'time-zone-converter.html', category: 'Miscellaneous', icon: 'fas fa-clock', keywords: 'time, zone, convert, world' },
    { name: 'Twitter Character Counter', url: 'twitter-character-counter.html', category: 'Miscellaneous', icon: 'fas fa-text-width', keywords: 'twitter, character, count, limit' },
    { name: 'Twitter Video Downloader', url: 'twitter-video-downloader.html', category: 'Miscellaneous', icon: 'fab fa-twitter', keywords: 'twitter, video, download' },
    { name: 'Word Counter', url: 'word-counter.html', category: 'Miscellaneous', icon: 'fas fa-calculator', keywords: 'word, count, text, analyze' },
    { name: 'YouTube Thumbnail Downloader', url: 'youtube-thumbnail-downloader.html', category: 'Miscellaneous', icon: 'fab fa-youtube', keywords: 'youtube, thumbnail, download' }
];

// Enhanced search functionality
function performHeaderSearch(query) {
    if (!query.trim()) {
        hideHeaderResults();
        showHeaderSuggestions();
        return;
    }
    
    const searchTerm = query.toLowerCase();
    
    // Special case: Show all tools when user types "all tools" or similar
    if (searchTerm.includes('all') && searchTerm.includes('tool')) {
        displayAllTools();
        return;
    }
    
    // Enhanced search algorithm with better matching
    const results = toolsDatabase.filter(tool => {
        const toolName = tool.name.toLowerCase();
        const toolCategory = tool.category.toLowerCase();
        const toolKeywords = tool.keywords.toLowerCase();
        
        // Exact match for tool names
        if (toolName === searchTerm) {
            return true;
        }
        
        // Partial match for tool names (more flexible)
        if (toolName.includes(searchTerm)) {
            return true;
        }
        
        // Search in keywords
        if (toolKeywords.includes(searchTerm)) {
            return true;
        }
        
        // Search in category
        if (toolCategory.includes(searchTerm)) {
            return true;
        }
        
        // Split search term into words and check if all words are found
        const searchWords = searchTerm.split(' ').filter(word => word.length > 0);
        if (searchWords.length > 1) {
            const allWordsFound = searchWords.every(word => 
                toolName.includes(word) || 
                toolKeywords.includes(word) || 
                toolCategory.includes(word)
            );
            if (allWordsFound) {
                return true;
            }
        }
        
        // Check for common abbreviations and variations
        const variations = {
            'pdf': 'pdf',
            'word': 'word',
            'image': 'image',
            'png': 'png',
            'jpg': 'jpg',
            'jpeg': 'jpeg',
            'webp': 'webp',
            'calc': 'calculator',
            'conv': 'converter',
            'gen': 'generator',
            'comp': 'compressor',
            'resize': 'resizer',
            'crop': 'cropper',
            'qr': 'qr code',
            'barcode': 'barcode',
            'hash': 'hashtag',
            'url': 'url',
            'json': 'json',
            'sql': 'sql',
            'css': 'css',
            'js': 'javascript',
            'html': 'html',
            'markdown': 'markdown',
            'base64': 'base64',
            'ip': 'ip address',
            'seo': 'seo',
            'speed': 'speed',
            'mobile': 'mobile',
            'grammar': 'grammar',
            'spell': 'spell',
            'plagiarism': 'plagiarism',
            'text': 'text',
            'speech': 'speech',
            'voice': 'voice',
            'audio': 'audio',
            'video': 'video',
            'photo': 'photo',
            'thumbnail': 'thumbnail',
            'download': 'downloader',
            'upload': 'upload',
            'convert': 'convert',
            'transform': 'transform',
            'format': 'format',
            'compress': 'compress',
            'resize': 'resize',
            'crop': 'crop',
            'edit': 'edit',
            'create': 'create',
            'generate': 'generate',
            'build': 'build',
            'make': 'make',
            'check': 'check',
            'test': 'test',
            'validate': 'validate',
            'analyze': 'analyze',
            'count': 'count',
            'calculate': 'calculate',
            'measure': 'measure',
            'weigh': 'weight',
            'length': 'length',
            'temperature': 'temperature',
            'time': 'time',
            'date': 'date',
            'age': 'age',
            'bmi': 'bmi',
            'percentage': 'percentage',
            'discount': 'discount',
            'tip': 'tip',
            'currency': 'currency',
            'money': 'money',
            'loan': 'loan',
            'emi': 'emi',
            'random': 'random',
            'dice': 'dice',
            'coin': 'coin',
            'lottery': 'lottery',
            'password': 'password',
            'security': 'security',
            'encrypt': 'encrypt',
            'encode': 'encode',
            'decode': 'decode',
            'hash': 'hash',
            'color': 'color',
            'palette': 'palette',
            'hex': 'hex',
            'rgb': 'rgb',
            'background': 'background',
            'remove': 'remove',
            'screenshot': 'screenshot',
            'meme': 'meme',
            'gif': 'gif',
            'animation': 'animation',
            'social': 'social',
            'media': 'media',
            'facebook': 'facebook',
            'instagram': 'instagram',
            'twitter': 'twitter',
            'youtube': 'youtube',
            'tiktok': 'tiktok',
            'linkedin': 'linkedin',
            'whatsapp': 'whatsapp',
            'emoji': 'emoji',
            'smile': 'smile',
            'hashtag': 'hashtag',
            'tag': 'tag',
            'meta': 'meta',
            'robots': 'robots',
            'sitemap': 'sitemap',
            'xml': 'xml',
            'backlink': 'backlink',
            'domain': 'domain',
            'authority': 'authority',
            'google': 'google',
            'index': 'index',
            'keyword': 'keyword',
            'density': 'density',
            'mobile': 'mobile',
            'friendly': 'friendly',
            'responsive': 'responsive',
            'speed': 'speed',
            'performance': 'performance',
            'minify': 'minify',
            'compress': 'compress',
            'optimize': 'optimize',
            'format': 'format',
            'beautify': 'beautify',
            'validate': 'validate',
            'check': 'check',
            'test': 'test',
            'analyze': 'analyze',
            'lookup': 'lookup',
            'find': 'find',
            'search': 'search',
            'extract': 'extract',
            'parse': 'parse',
            'encode': 'encode',
            'decode': 'decode',
            'convert': 'convert',
            'transform': 'transform',
            'change': 'change',
            'modify': 'modify',
            'edit': 'edit',
            'create': 'create',
            'generate': 'generate',
            'build': 'build',
            'make': 'make',
            'produce': 'produce',
            'create': 'create',
            'design': 'design',
            'develop': 'develop',
            'program': 'program',
            'code': 'code',
            'script': 'script',
            'function': 'function',
            'utility': 'utility',
            'tool': 'tool',
            'app': 'app',
            'application': 'application',
            'service': 'service',
            'helper': 'helper',
            'assistant': 'assistant',
            'calculator': 'calculator',
            'converter': 'converter',
            'generator': 'generator',
            'formatter': 'formatter',
            'compressor': 'compressor',
            'resizer': 'resizer',
            'cropper': 'cropper',
            'downloader': 'downloader',
            'uploader': 'uploader',
            'checker': 'checker',
            'validator': 'validator',
            'analyzer': 'analyzer',
            'tester': 'tester',
            'builder': 'builder',
            'maker': 'maker',
            'creator': 'creator',
            'designer': 'designer',
            'developer': 'developer',
            'programmer': 'programmer',
            'coder': 'coder',
            'scripter': 'scripter',
            'functioner': 'functioner',
            'utility': 'utility',
            'tool': 'tool',
            'app': 'app',
            'application': 'application',
            'service': 'service',
            'helper': 'helper',
            'assistant': 'assistant'
        };
        
        // Check for variations
        for (const [abbreviation, fullWord] of Object.entries(variations)) {
            if (searchTerm.includes(abbreviation) && 
                (toolName.includes(fullWord) || toolKeywords.includes(fullWord))) {
                return true;
            }
        }
        
        return false;
    });
    
    // Sort results by relevance
    results.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        // Exact name match gets highest priority
        if (aName === searchTerm && bName !== searchTerm) return -1;
        if (bName === searchTerm && aName !== searchTerm) return 1;
        
        // Name starts with search term gets higher priority
        if (aName.startsWith(searchTerm) && !bName.startsWith(searchTerm)) return -1;
        if (bName.startsWith(searchTerm) && !aName.startsWith(searchTerm)) return 1;
        
        // Name contains search term gets higher priority
        if (aName.includes(searchTerm) && !bName.includes(searchTerm)) return -1;
        if (bName.includes(searchTerm) && !aName.includes(searchTerm)) return 1;
        
        // Alphabetical order for same relevance
        return aName.localeCompare(bName);
    });
    
    displayHeaderResults(results, query);
}

function displayHeaderResults(results, query) {
    hideHeaderSuggestions();
    
    if (results.length === 0) {
        resultsList.innerHTML = `
            <div class="search-result-item" style="text-align: center; color: #666;">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <div>No tools found for "${query}"</div>
                <div style="font-size: 0.8rem; margin-top: 0.5rem;">Try different keywords or browse all tools</div>
                <div style="margin-top: 1rem;">
                    <a href="#tools" class="btn btn-primary" style="font-size: 0.8rem; padding: 0.5rem 1rem;">
                        <i class="fas fa-list"></i> Browse All Tools
                    </a>
                </div>
            </div>
        `;
    } else {
        resultsList.innerHTML = results.map(tool => `
            <a href="${tool.url}" class="search-result-item">
                <div class="result-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="result-content">
                    <div class="result-title">${tool.name}</div>
                    <div class="result-category">${tool.category}</div>
                </div>
            </a>
        `).join('');
        
        // Add "View All Tools" link if there are many results
        if (results.length > 5) {
            resultsList.innerHTML += `
                <div class="search-result-item" style="text-align: center; border-top: 1px solid #eee; margin-top: 0.5rem; padding-top: 1rem;">
                    <a href="#tools" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.5rem 1rem;">
                        <i class="fas fa-list"></i> View All ${toolsDatabase.length} Tools
                    </a>
                </div>
            `;
        }
    }
    
    resultsCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found`;
    searchResults.style.display = 'block';
}

function showHeaderSuggestions() {
    if (searchSuggestions) {
        searchSuggestions.classList.add('show');
    }
}

function hideHeaderSuggestions() {
    if (searchSuggestions) {
        searchSuggestions.classList.remove('show');
    }
}

function hideHeaderResults() {
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Header search event listeners
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        
        if (query.length > 0) {
            if (searchClear) searchClear.style.display = 'block';
            performHeaderSearch(query);
        } else {
            if (searchClear) searchClear.style.display = 'none';
            hideHeaderResults();
            showHeaderSuggestions();
        }
    });
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length === 0) {
            showHeaderSuggestions();
        }
    });
    
    searchInput.addEventListener('blur', () => {
        // Delay hiding suggestions to allow for clicks
        setTimeout(() => {
            hideHeaderSuggestions();
        }, 200);
    });
}

if (searchClear) {
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        hideHeaderResults();
        showHeaderSuggestions();
        searchInput.focus();
    });
}

if (closeResults) {
    closeResults.addEventListener('click', () => {
        hideHeaderResults();
        searchInput.focus();
    });
}

// Suggestion tag clicks
if (suggestionTags) {
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const searchTerm = tag.getAttribute('data-search');
            searchInput.value = searchTerm;
            if (searchClear) searchClear.style.display = 'block';
            performHeaderSearch(searchTerm);
            hideHeaderSuggestions();
        });
    });
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (searchInput && searchResults && searchSuggestions) {
        if (!searchInput.contains(e.target) && 
            !searchResults.contains(e.target) && 
            !searchSuggestions.contains(e.target)) {
            hideHeaderSuggestions();
            hideHeaderResults();
        }
    }
});

// Keyboard navigation for header search
if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideHeaderResults();
            hideHeaderSuggestions();
            searchInput.blur();
        }
    });
}

// Initialize search elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('toolSearch');
    const searchClear = document.getElementById('searchClear');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');
    const closeResults = document.getElementById('closeResults');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    // Initialize header search if elements exist
    if (searchInput && searchResults && resultsList && resultsCount) {
        console.log('Header search initialized successfully');
    }
});

// Function to display all tools
function displayAllTools() {
    hideHeaderSuggestions();
    
    // Group tools by category
    const categories = {};
    toolsDatabase.forEach(tool => {
        if (!categories[tool.category]) {
            categories[tool.category] = [];
        }
        categories[tool.category].push(tool);
    });
    
    let allToolsHTML = '';
    
    // Create sections for each category
    Object.keys(categories).forEach(category => {
        allToolsHTML += `
            <div class="search-category-section">
                <h4 class="category-title">${category}</h4>
                <div class="category-tools">
        `;
        
        categories[category].forEach(tool => {
            allToolsHTML += `
                <a href="${tool.url}" class="search-result-item">
                    <div class="result-icon">
                        <i class="${tool.icon}"></i>
                    </div>
                    <div class="result-content">
                        <div class="result-title">${tool.name}</div>
                        <div class="result-category">${tool.category}</div>
                    </div>
                </a>
            `;
        });
        
        allToolsHTML += `
                </div>
            </div>
        `;
    });
    
    resultsList.innerHTML = allToolsHTML;
    resultsCount.textContent = `All ${toolsDatabase.length} Tools`;
    searchResults.style.display = 'block';
}