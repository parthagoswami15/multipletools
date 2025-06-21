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
        categories.forEach((cat, index) => {
            const catTools = tools.filter(t => t.category === cat && t.name.toLowerCase().includes(filter.toLowerCase()));
            if (catTools.length) {
                let toolLinks = '';
                catTools.forEach(tool => {
                    toolLinks += `<a href="${tool.file}" class="list-group-item list-group-item-action">${tool.name}</a>`;
                });

                // Unique IDs for collapse functionality
                const collapseId = `collapse-${index}`;
                const headerId = `header-${index}`;

                container.innerHTML += `
                    <div class="col-md-6 col-lg-4">
                        <div class="category-card">
                            <div class="category-header" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                                <h5 class="category-title d-flex justify-content-between align-items-center">
                                    ${cat}
                                    <i class="fas fa-chevron-down"></i>
                                </h5>
                            </div>
                            <div id="${collapseId}" class="collapse show" aria-labelledby="${headerId}">
                                <div class="list-group list-group-flush tool-list">
                                    ${toolLinks}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        // Add event listeners for rotating the chevron icons
        const headers = document.querySelectorAll('.category-header');
        headers.forEach(header => {
            const collapseElement = document.getElementById(header.getAttribute('data-bs-target').substring(1));
            const icon = header.querySelector('i');

            collapseElement.addEventListener('show.bs.collapse', function () {
                icon.style.transform = 'rotate(-180deg)';
            });

            collapseElement.addEventListener('hide.bs.collapse', function () {
                icon.style.transform = 'rotate(0deg)';
            });
        });
    }
}

function searchTools(e) {
    renderTools(e.target.value);
}