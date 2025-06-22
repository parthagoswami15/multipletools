// Social Sharing and Feedback System for Multi-Tools

// Social Sharing Functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out Multi-Tools - 80+ free online tools for developers and designers!');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Multi-Tools - 80+ free online tools for developers and designers! 🛠️');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Multi-Tools - Free Online Tools');
    const summary = encodeURIComponent('80+ free online tools for developers, designers, and everyday users.');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out Multi-Tools - 80+ free online tools! 🛠️');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy link', 'error');
    });
}

// User Feedback System
function showFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        createFeedbackModal();
    }
}

function createFeedbackModal() {
    const modalHTML = `
        <div id="feedbackModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeFeedbackModal()">&times;</span>
                <h2>Share Your Feedback</h2>
                <div class="feedback-form">
                    <div class="form-group">
                        <label for="feedbackName">Name (Optional):</label>
                        <input type="text" id="feedbackName" placeholder="Your name">
                    </div>
                    <div class="form-group">
                        <label for="feedbackEmail">Email (Optional):</label>
                        <input type="email" id="feedbackEmail" placeholder="Your email">
                    </div>
                    <div class="form-group">
                        <label for="feedbackRating">Rating:</label>
                        <div class="rating-input">
                            <i class="fas fa-star" data-rating="1" onclick="setRating(1)"></i>
                            <i class="fas fa-star" data-rating="2" onclick="setRating(2)"></i>
                            <i class="fas fa-star" data-rating="3" onclick="setRating(3)"></i>
                            <i class="fas fa-star" data-rating="4" onclick="setRating(4)"></i>
                            <i class="fas fa-star" data-rating="5" onclick="setRating(5)"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="feedbackMessage">Your Feedback:</label>
                        <textarea id="feedbackMessage" rows="4" placeholder="Tell us about your experience..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="feedbackTool">Tool Used (Optional):</label>
                        <select id="feedbackTool">
                            <option value="">Select a tool</option>
                            <option value="remove-background">Remove Background</option>
                            <option value="image-compressor">Image Compressor</option>
                            <option value="pdf-converter">PDF Converter</option>
                            <option value="qr-generator">QR Code Generator</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button type="button" class="submit-feedback-btn" onclick="submitFeedback()">Submit Feedback</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('feedbackModal').style.display = 'block';
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function setRating(rating) {
    const stars = document.querySelectorAll('.rating-input i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function submitFeedback() {
    const name = document.getElementById('feedbackName').value;
    const email = document.getElementById('feedbackEmail').value;
    const rating = document.querySelectorAll('.rating-input i.active').length;
    const message = document.getElementById('feedbackMessage').value;
    const tool = document.getElementById('feedbackTool').value;
    
    if (!message.trim()) {
        showNotification('Please enter your feedback message', 'error');
        return;
    }
    
    if (rating === 0) {
        showNotification('Please select a rating', 'error');
        return;
    }
    
    // Store feedback in localStorage (in a real app, you'd send this to a server)
    const feedback = {
        name,
        email,
        rating,
        message,
        tool,
        timestamp: new Date().toISOString(),
        page: window.location.href
    };
    
    const existingFeedback = JSON.parse(localStorage.getItem('multiToolsFeedback') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('multiToolsFeedback', JSON.stringify(existingFeedback));
    
    // Send to Google Analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'feedback_submitted', {
            'event_category': 'user_feedback',
            'event_label': tool || 'general',
            'value': rating
        });
    }
    
    showNotification('Thank you for your feedback!', 'success');
    closeFeedbackModal();
    
    // Reset form
    document.getElementById('feedbackName').value = '';
    document.getElementById('feedbackEmail').value = '';
    document.getElementById('feedbackMessage').value = '';
    document.getElementById('feedbackTool').value = '';
    setRating(0);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('feedbackModal');
    if (event.target === modal) {
        closeFeedbackModal();
    }
}

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeFeedbackModal();
    }
});

// Initialize rating stars
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to footer rating stars
    const footerStars = document.querySelectorAll('.rating-stars i');
    footerStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            footerStars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            showFeedbackModal();
        });
    });
}); 