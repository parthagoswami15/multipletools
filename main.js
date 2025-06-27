window.onload = function() {
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
    {
        name: "Barcode Generator",
        category: "Miscellaneous Tools",
        url: "barcode-generator.html",
        icon: "fas fa-barcode",
        description: "Generate various types of barcodes."
    },
    {
        name: "Meme Generator",
        category: "Miscellaneous Tools",
        url: "meme-generator.html",
        icon: "fas fa-laugh-beam",
        description: "Create your own memes by adding text to images."
    },
    {
        name: "Resume Builder",
        category: "Miscellaneous Tools",
        url: "resume-builder.html",
        icon: "fas fa-file-alt",
        description: "Create a professional resume and download it as a PDF."
    },
    {
        name: "Invoice Generator",
        category: "Miscellaneous Tools",
        url: "invoice-generator.html",
        icon: "fas fa-file-invoice-dollar",
        description: "Create and download professional invoices."
    },
    {
        name: "Business Name Generator",
        category: "Miscellaneous Tools",
        url: "business-name-generator.html",
        icon: "fas fa-lightbulb",
        description: "Generate creative names for your business."
    },
    {
        name: "Lottery Number Generator",
        category: "Miscellaneous Tools",
        url: "lottery-number-generator.html",
        icon: "fas fa-ticket-alt",
        description: "Generate random numbers for the lottery."
    },
    {
        name: "Flip a Coin Simulator",
        category: "Miscellaneous Tools",
        url: "flip-a-coin-simulator.html",
        icon: "fas fa-coins",
        description: "Flip a virtual coin to make a decision."
    },
    {
        name: "Random Number Generator",
        category: "Miscellaneous Tools",
        url: "random-number-generator.html",
        icon: "fas fa-random",
        description: "Generate a random number within a range."
    },
    {
        name: "Dice Roller Simulator",
        category: "Miscellaneous Tools",
        url: "dice-roller-simulator.html",
        icon: "fas fa-dice-d6",
        description: "Roll one or more virtual dice."
    },
    {
        name: "Password Strength Checker",
        category: "Miscellaneous Tools",
        url: "password-strength-checker.html",
        icon: "fas fa-shield-alt",
        description: "Check the strength of your password."
    },
    {
        name: "Color Palette Generator",
        category: "Miscellaneous Tools",
        url: "color-palette-generator.html",
        icon: "fas fa-palette",
        description: "Generate beautiful color palettes for your projects."
    },
    {
        name: "Unit Price Calculator",
        category: "Miscellaneous Tools",
        url: "unit-price-calculator.html",
        icon: "fas fa-tags",
        description: "Calculate the unit price from total price and quantity."
    },
    {
        name: "Age Difference Calculator",
        category: "Miscellaneous Tools",
        url: "age-difference-calculator.html",
        icon: "fas fa-birthday-cake",
        description: "Calculate the age difference between two dates of birth."
    },
    {
        name: "Random Team Generator",
        category: "Miscellaneous Tools",
        url: "random-team-generator.html",
        icon: "fas fa-users",
        description: "Randomly assign people to teams."
    },
    {
        name: "Roman Numeral Converter",
        category: "Miscellaneous Tools",
        url: "roman-numeral-converter.html",
        icon: "fas fa-sort-numeric-up",
        description: "Convert between numbers and Roman numerals."
    },
    {
        name: "Text Case Converter",
        category: "Miscellaneous Tools",
        url: "text-case-converter.html",
        icon: "fas fa-font",
        description: "Convert text between different case formats (camelCase, snake_case, etc.)."
    },
    {
        name: "Password Generator",
        category: "Miscellaneous Tools",
        url: "password-generator.html",
        icon: "fas fa-key",
        description: "Generate strong, random passwords with custom options."
    },
    {
        name: "Text Reverser",
        category: "Miscellaneous Tools",
        url: "text-reverser.html",
        icon: "fas fa-exchange-alt",
        description: "Reverse text by characters or words."
    },
    
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
    
    // ... add all other tools here ...
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
                let section = `<h3 class='mt-4 mb-3'>${cat}</h3><div class='row'>`;
                catTools.forEach(tool => {
                    section += `<div class='col-md-3 col-sm-6 mb-4'><div class='card h-100'><div class='card-body d-flex flex-column'><h5 class='card-title'>${tool.name}</h5><a href='${tool.file}' class='btn btn-primary mt-auto'>Open</a></div></div></div>`;
                });
                section += '</div>';
                container.innerHTML += section;
            }
        });
    }
}

function searchTools(e) {
    renderTools(e.target.value);
}

// ... add all other tools here ...