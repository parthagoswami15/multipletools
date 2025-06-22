function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    const searchClear = document.getElementById('searchClear');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');
    const closeResults = document.getElementById('closeResults');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    if (!searchInput) return;

    searchInput.addEventListener('focus', showHeaderSuggestions);
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query) {
            hideHeaderSuggestions();
            performHeaderSearch(query);
            searchClear.style.display = 'block';
        } else {
            showHeaderSuggestions();
            hideHeaderResults();
            searchClear.style.display = 'none';
        }
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        hideHeaderResults();
        showHeaderSuggestions();
        searchClear.style.display = 'none';
    });

    closeResults.addEventListener('click', () => {
        hideHeaderResults();
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            hideHeaderResults();
            hideHeaderSuggestions();
        }
    });

    suggestionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const query = tag.dataset.query;
            searchInput.value = query;
            searchInput.focus();
            performHeaderSearch(query);
            hideHeaderSuggestions();
        });
    });
}

function loadComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const adPlaceholder = document.getElementById('ad-placeholder');

    const loadHTML = (placeholder, url) => {
        if (!placeholder) return;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                
                // Append all child nodes from tempDiv to placeholder
                while (tempDiv.firstChild) {
                    placeholder.appendChild(tempDiv.firstChild);
                }

                // After header is loaded, initialize components that are inside it
                if (placeholder.id === 'header-placeholder') {
                    // Initialize Bootstrap Dropdowns
                    const dropdownElementList = [].slice.call(placeholder.querySelectorAll('[data-bs-toggle="dropdown"]'));
                    dropdownElementList.map(function (dropdownToggleEl) {
                        return new bootstrap.Dropdown(dropdownToggleEl);
                    });
                    
                    // Initialize search functionality
                    initializeSearch();
                }
            })
            .catch(error => console.error(`Error loading component from ${url}:`, error));
    };

    loadHTML(headerPlaceholder, 'header.html');
    loadHTML(footerPlaceholder, 'footer.html');
    loadHTML(adPlaceholder, 'ad-section.html');
}

function updateLiveViewers() {
    const viewerElement = document.getElementById('live-viewers');
    if (!viewerElement) return;

    const countSpan = viewerElement.querySelector('span');
    if (!countSpan) return;

    let viewerCount = Math.floor(Math.random() * (500 - 150 + 1)) + 150; // Base count

    const updateCount = () => {
        const fluctuation = Math.floor(Math.random() * 7) - 3; // Fluctuate between -3 and +3
        viewerCount += fluctuation;

        if (viewerCount < 120) { // Set a minimum threshold
            viewerCount = 120 + Math.floor(Math.random() * 10);
        }

        countSpan.textContent = `${viewerCount} users online`;
    };

    setInterval(updateCount, 3000); // Update every 3 seconds
    updateCount(); // Initial call
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    
    // Check if we are on the homepage
    if (document.querySelector('.home-page')) {
        renderTools();
        updateLiveViewers(); // Initialize live viewers count only on homepage
    }

    // Accordion functionality for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        const header = card.querySelector('.category-header');
        const content = card.querySelector('.category-content');
        
        if(header && content) {
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
        }
    });

    // Mobile navigation toggle
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
        number.textContent = '0';
    });
});

function countUp(element, target) {
    let current = 0;
    const increment = target / 100;
    
    const counter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(counter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    counter();
}

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
    { name: 'QR Code Generator', category: 'Image Tools', file: 'qr-code-generator.html' },
    { name: 'Screenshot to PDF Converter', category: 'Image Tools', file: 'screenshot-to-pdf.html' },
    { name: 'Image to JPEG', category: 'Image Tools', file: 'image-to-jpeg.html' },
    { name: 'Remove Background', category: 'Image Tools', file: 'remove-background.html' },
    
    // Audio Tools
    { name: 'Video Editor', category: 'Audio Tools', file: 'video-editor.html' },
    { name: 'Audio Converter', category: 'Audio Tools', file: 'audio-converter.html' },
    { name: 'Text-to-Speech', category: 'Audio Tools', file: 'text-to-speech.html' },
    { name: 'Speech-to-Text', category: 'Audio Tools', file: 'speech-to-text.html' },
    { name: 'Video Creator', category: 'Audio Tools', file: 'video-creator.html', description: 'Combine video clips and add audio to create a new video.', keywords: ['video', 'creator', 'merge', 'join', 'combine', 'audio'] },
    
    // Text Tools
    { name: 'Word Counter', category: 'Text Tools', file: 'word-counter.html' },
    { name: 'Character Counter', category: 'Text Tools', file: 'character-counter.html' },
    { name: 'Case Converter', category: 'Text Tools', file: 'case-converter.html' },
    { name: 'Plagiarism Checker', category: 'Text Tools', file: 'plagiarism-checker.html' },
    { name: 'Grammar Checker', category: 'Text Tools', file: 'grammar-checker.html' },
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
    { name: 'GIF Maker', category: 'Miscellaneous Tools', file: 'gif-maker.html' },
    { name: 'Barcode Generator', category: 'Miscellaneous Tools', file: 'barcode-generator.html' },
    { name: 'Meme Generator', category: 'Miscellaneous Tools', file: 'meme-generator.html' },
    { name: 'Resume Builder', category: 'Miscellaneous Tools', file: 'resume-builder.html' },
    { name: 'Invoice Generator', category: 'Miscellaneous Tools', file: 'invoice-generator.html' },
    { name: 'Business Name Generator', category: 'Miscellaneous Tools', file: 'business-name-generator.html' },
    { name: 'Lottery Number Generator', category: 'Miscellaneous Tools', file: 'lottery-number-generator.html' },
    { name: 'Flip a Coin Simulator', category: 'Miscellaneous Tools', file: 'flip-a-coin-simulator.html' },
    { name: 'Random Number Generator', category: 'Miscellaneous Tools', file: 'random-number-generator.html' },
    { name: 'Dice Roller Simulator', category: 'Miscellaneous Tools', file: 'dice-roller-simulator.html' },
    { name: 'Password Strength Checker', category: 'Miscellaneous Tools', file: 'password-strength-checker.html' },
    { name: 'Color Palette Generator', category: 'Miscellaneous Tools', file: 'color-palette-generator.html' },
    { name: 'Daily Planner Creator', category: 'Miscellaneous Tools', file: 'daily-planner-creator.html' },
    { name: 'Wedding Invitation Generator', category: 'Miscellaneous Tools', file: 'wedding-invitation-generator.html' },
    { name: 'Story Plot Generator', category: 'Miscellaneous Tools', file: 'story-plot-generator.html' },
    
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
    'Image Tools', 'Audio Tools', 'Text Tools', 'Convert Tools', 'SEO Tools', 'Developer Tools', 'Math & Calculators',
    'Unit Converters', 'Social Media Tools', 'Miscellaneous Tools'
];

// Create toolsDatabase for search functionality
const toolsDatabase = tools.map(tool => ({
    name: tool.name,
    url: tool.file,
    category: tool.category,
    icon: getToolIcon(tool.name, tool.category),
    keywords: getToolKeywords(tool.name, tool.category)
}));

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

// Enhanced Search Functionality for Header
let searchInput, searchClear, searchSuggestions, searchResults, resultsList, resultsCount, closeResults, suggestionTags;

// Function to get appropriate icon for each tool
function getToolIcon(name, category) {
    const lowerCaseName = name.toLowerCase();
    
    // Icon mapping based on tool name keywords
    const iconMap = {
        'png': 'fas fa-file-image',
        'jpg': 'fas fa-file-image',
        'jpeg': 'fas fa-file-image',
        'resizer': 'fas fa-expand-arrows-alt',
        'compressor': 'fas fa-compress-arrows-alt',
        'cropper': 'fas fa-crop-alt',
        'base64': 'fas fa-file-code',
        'webp': 'fas fa-image',
        'gif': 'fas fa-film',
        'qr code': 'fas fa-qrcode',
        'screenshot to pdf': 'fas fa-camera-retro',
        'remove background': 'fas fa-magic',
        'video editor': 'fas fa-video',
        'word counter': 'fas fa-file-word',
        'character counter': 'fas fa-font',
        'case converter': 'fas fa-exchange-alt',
        'plagiarism': 'fas fa-search',
        'grammar': 'fas fa-spell-check',
        'text-to-speech': 'fas fa-volume-up',
        'speech-to-text': 'fas fa-microphone-alt',
        'url encoder': 'fas fa-link',
        'fancy text': 'fas fa-magic',
        'random text': 'fas fa-random',
        'word to pdf': 'fas fa-file-pdf',
        'pdf to word': 'fas fa-file-word',
        'image to pdf': 'fas fa-file-pdf',
        'pdf to ppt': 'fas fa-file-powerpoint',
        'ppt to pdf': 'fas fa-file-pdf',
        'word to ppt': 'fas fa-file-powerpoint',
        'ppt to word': 'fas fa-file-word',
        'percentage': 'fas fa-percentage',
        'age': 'fas fa-calendar-alt',
        'bmi': 'fas fa-heartbeat',
        'loan': 'fas fa-university',
        'scientific': 'fas fa-calculator',
        'discount': 'fas fa-tags',
        'currency': 'fas fa-dollar-sign',
        'time zone': 'fas fa-globe',
        'binary': 'fas fa-microchip',
        'tip': 'fas fa-concierge-bell',
        'mobile-friendly': 'fas fa-mobile-alt',
        'page speed': 'fas fa-tachometer-alt',
        'keyword density': 'fas fa-search-dollar',
        'backlink': 'fas fa-link',
        'domain authority': 'fas fa-chart-line',
        'google index': 'fab fa-google',
        'meta tag': 'fas fa-code',
        'robots.txt': 'fas fa-robot',
        'sitemap': 'fas fa-sitemap',
        'xml sitemap': 'fas fa-file-code',
        'barcode': 'fas fa-barcode',
        'meme': 'fas fa-smile',
        'resume': 'fas fa-file-alt',
        'invoice': 'fas fa-file-invoice-dollar',
        'business name': 'fas fa-briefcase',
        'lottery': 'fas fa-ticket-alt',
        'flip a coin': 'fas fa-coins',
        'random number': 'fas fa-random',
        'dice roller': 'fas fa-dice',
        'password strength': 'fas fa-key',
        'color palette': 'fas fa-palette',
        'daily planner': 'fas fa-calendar-check',
        'wedding invitation': 'fas fa-envelope-open-text',
        'story plot': 'fas fa-book-open',
        'json formatter': 'fas fa-code',
        'html to markdown': 'fab fa-markdown',
        'css minifier': 'fab fa-css3-alt',
        'javascript minifier': 'fab fa-js-square',
        'sql formatter': 'fas fa-database',
        'htaccess': 'fas fa-cogs',
        'markdown to html': 'fab fa-html5',
        'color code': 'fas fa-eye-dropper',
        'ip address': 'fas fa-map-marker-alt',
        'length': 'fas fa-ruler-horizontal',
        'weight': 'fas fa-weight-hanging',
        'speed': 'fas fa-tachometer-alt',
        'temperature': 'fas fa-thermometer-half',
        'volume': 'fas fa-flask',
        'data storage': 'fas fa-hdd',
        'energy': 'fas fa-bolt',
        'pressure': 'fas fa-compress-alt',
        'fuel efficiency': 'fas fa-gas-pump',
        'angle': 'fas fa-ruler-combined',
        'youtube thumbnail': 'fab fa-youtube',
        'instagram photo': 'fab fa-instagram',
        'twitter video': 'fab fa-twitter',
        'facebook video': 'fab fa-facebook',
        'tiktok video': 'fab fa-tiktok',
        'youtube tags': 'fas fa-tags',
        'hashtag': 'fas fa-hashtag',
        'social media post': 'fas fa-share-square',
        'emoji keyboard': 'fas fa-smile',
        'twitter character': 'fab fa-twitter'
    };
    
    for (const keyword in iconMap) {
        if (lowerCaseName.includes(keyword)) {
            return iconMap[keyword];
        }
    }

    // Default icons based on category
    switch (category) {
        case 'Image Tools': return 'fas fa-image';
        case 'Text Tools': return 'fas fa-font';
        case 'Convert Tools': return 'fas fa-exchange-alt';
        case 'SEO Tools': return 'fas fa-chart-line';
        case 'Developer Tools': return 'fas fa-code';
        case 'Math & Calculators': return 'fas fa-calculator';
        case 'Unit Converters': return 'fas fa-ruler-combined';
        case 'Social Media Tools': return 'fas fa-share-alt';
        case 'Miscellaneous Tools': return 'fas fa-star';
        default: return 'fas fa-toolbox';
    }
}

// Function to generate keywords for each tool
function getToolKeywords(name, category) {
    const lowerCaseName = name.toLowerCase();
    let keywords = [name, category];

    // Synonyms and variations dictionary
    const synonyms = {
        // Image Tools
        'image to png converter': ['image to png', 'convert to png', 'png converter'],
        'image to jpg converter': ['image to jpg', 'convert to jpg', 'jpg converter', 'image to jpeg'],
        'image resizer': ['resize image', 'photo resizer', 'image scaler'],
        'image compressor': ['compress image', 'reduce image size', 'photo compressor'],
        'image cropper': ['crop image', 'photo cropper', 'image cutter'],
        'convert image to base64': ['image to base64', 'base64 encoder'],
        'convert webp to png': ['webp to png', 'convert webp'],
        'gif maker': ['create gif', 'animated gif maker', 'gif generator'],
        'qr code generator': ['create qr code', 'qr code maker'],
        'screenshot to pdf converter': ['screenshot to pdf', 'convert screenshot to pdf'],
        'remove background': ['background remover', 'transparent background', 'png background'],
        'video editor': ['edit video', 'video trimmer', 'video cutter'],

        // Text Tools
        'word counter': ['count words', 'word count', 'text counter'],
        'character counter': ['count characters', 'character count'],
        'case converter': ['change case', 'uppercase', 'lowercase', 'toggle case'],
        'plagiarism checker': ['check for plagiarism', 'similarity checker'],
        'grammar checker': ['check grammar', 'proofread', 'spell check'],
        'text-to-speech': ['tts', 'read aloud', 'voice generator'],
        'speech-to-text': ['stt', 'transcribe', 'voice to text'],
        'url encoder & decoder': ['url encode', 'url decode', 'percent encoding'],
        'fancy text generator': ['cool text', 'stylish text', 'font generator'],
        'random text generator': ['lorem ipsum', 'placeholder text'],

        // Convert Tools
        'word to pdf': ['convert word to pdf', 'doc to pdf'],
        'pdf to word': ['convert pdf to word', 'pdf to doc'],
        'image to pdf': ['convert image to pdf', 'jpg to pdf', 'png to pdf'],
        'pdf to ppt': ['convert pdf to powerpoint'],
        'ppt to pdf': ['convert powerpoint to pdf'],
        'word to ppt': ['convert word to powerpoint'],
        'ppt to word': ['convert powerpoint to word'],
        
        // Math & Calculators
        'percentage calculator': ['calculate percentage', 'percent calculator'],
        'age calculator': ['calculate age', 'how old am i'],
        'bmi calculator': ['body mass index', 'bmi chart'],
        'loan emi calculator': ['emi calculator', 'loan calculator'],
        'scientific calculator': ['online scientific calculator'],
        'discount calculator': ['calculate discount', 'sale price calculator'],
        'currency converter': ['exchange rate', 'money converter'],
        'time zone converter': ['world clock', 'time difference'],
        'binary to decimal converter': ['binary to decimal', 'bin to dec'],
        'tip calculator': ['calculate tip', 'gratuity calculator'],

        // SEO Tools
        'mobile-friendly test': ['responsive test', 'mobile test'],
        'page speed checker': ['website speed test', 'gtmetrix', 'pingdom'],
        'keyword density checker': ['check keyword density'],
        'backlink checker': ['check backlinks', 'link analysis'],
        'domain authority checker': ['da checker', 'website authority'],
        'google index checker': ['check if site is indexed'],
        'meta tag generator': ['create meta tags', 'seo meta tags'],
        'robots.txt generator': ['create robots.txt'],
        'sitemap generator': ['create sitemap', 'xml sitemap'],
        'xml sitemap validator': ['validate sitemap'],
        
        // Developer Tools
        'json formatter': ['format json', 'json viewer', 'json beautifier'],
        'html to markdown': ['convert html to markdown'],
        'css minifier': ['minify css', 'compress css'],
        'javascript minifier': ['minify js', 'compress js'],
        'sql formatter': ['format sql', 'sql beautifier'],
        'htaccess redirect generator': ['generate htaccess redirects'],
        'markdown to html': ['convert markdown to html'],
        'color code picker': ['color picker', 'hex code picker'],
        'base64 encoder & decoder': ['base64 encode', 'base64 decode'],
        'ip address lookup': ['my ip address', 'geoip'],

        // Unit Converters
        'length converter': ['convert length', 'cm to inches', 'meters to feet'],
        'weight converter': ['convert weight', 'kg to lbs', 'grams to ounces'],
        'speed converter': ['convert speed', 'kph to mph'],
        'temperature converter': ['convert temperature', 'celsius to fahrenheit'],
        'volume converter': ['convert volume', 'liters to gallons'],
        'data storage converter': ['convert data storage', 'mb to gb'],
        'energy converter': ['convert energy', 'joules to calories'],
        'pressure converter': ['convert pressure', 'psi to bar'],
        'fuel efficiency converter': ['convert fuel efficiency', 'mpg to l/100km'],
        'angle converter': ['convert angle', 'degrees to radians'],

        // Social Media Tools
        'youtube thumbnail downloader': ['download youtube thumbnail'],
        'instagram photo downloader': ['download instagram photo'],
        'twitter video downloader': ['download twitter video'],
        'facebook video downloader': ['download facebook video'],
        'tiktok video downloader': ['download tiktok video'],
        'youtube tags extractor': ['extract youtube tags'],
        'hashtag generator': ['generate hashtags', 'instagram hashtags'],
        'social media post generator': ['create social media post'],
        'emoji keyboard': ['online emoji keyboard'],
        'twitter character counter': ['tweet character count']
    };

    if (synonyms[lowerCaseName]) {
        keywords = keywords.concat(synonyms[lowerCaseName]);
    }

    return [...new Set(keywords)]; // Remove duplicates
}

// Enhanced search functionality
function performHeaderSearch(query) {
    query = query.toLowerCase().trim();
    if (!query) {
        hideHeaderResults();
        return;
    }
    
    const results = toolsDatabase.filter(tool => {
        const queryWords = query.split(' ').filter(w => w.length > 0);
        
        // Check if all query words are found in the tool's keywords
        return queryWords.every(word => 
            tool.keywords.some(kw => kw.toLowerCase().includes(word))
        );
    });

    displayHeaderResults(results, query);
}

function displayHeaderResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');

    resultsList.innerHTML = '';
    
    if (results.length > 0) {
        resultsCount.textContent = `${results.length} results found`;
        results.forEach(tool => {
            const li = document.createElement('li');
            li.className = 'result-item';
            
            // Highlight matching words
            let highlightedName = tool.name;
            const queryWords = query.split(' ').filter(w => w.length > 0);
            queryWords.forEach(word => {
                const regex = new RegExp(word, 'gi');
                highlightedName = highlightedName.replace(regex, `<span class="highlight">$&</span>`);
            });
            
            li.innerHTML = `
                <a href="${tool.url}">
                    <div class="result-icon">
                        <i class="${tool.icon}"></i>
                    </div>
                    <div class="result-details">
                        <div class="result-name">${highlightedName}</div>
                        <div class="result-category">${tool.category}</div>
                    </div>
                </a>
            `;
            resultsList.appendChild(li);
        });
    } else {
        resultsCount.textContent = 'No results found';
        resultsList.innerHTML = `<li class="no-results">Try a different search term.</li>`;
    }

    searchResults.style.display = 'block';
}

function showHeaderSuggestions() {
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (searchSuggestions) {
        searchSuggestions.style.display = 'block';
    }
}

function hideHeaderSuggestions() {
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
}

function hideHeaderResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toolSearchInput = document.getElementById('tool-search');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    if (toolSearchInput) {
        toolSearchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            performHeaderSearch(query);
        });
        
        toolSearchInput.addEventListener('focus', () => {
             if (!toolSearchInput.value) {
                showHeaderSuggestions();
             }
        });
    }

    suggestionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const query = tag.dataset.query;
            toolSearchInput.value = query;
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
});

function displayAllTools() {
    const container = document.getElementById('all-tools-container');
    if (!container) return;

    container.innerHTML = '';
    categories.forEach(category => {
        const categoryTools = toolsDatabase.filter(tool => tool.category === category);
        if (categoryTools.length > 0) {
            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';

            let toolsHTML = '';
            categoryTools.forEach(tool => {
                toolsHTML += `
                    <a href="${tool.url}" class="tool-card">
                        <div class="tool-icon">
                            <i class="${tool.icon}"></i>
                        </div>
                        <div class="tool-name">${tool.name}</div>
                    </a>
                `;
            });
            
            categorySection.innerHTML = `
                <h3 class="category-title">${category}</h3>
                <div class="tool-grid">
                    ${toolsHTML}
                </div>
            `;
            container.appendChild(categorySection);
        }
    });
}

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