// Enhanced Review and Feedback System for Multi-Tools

// Review and Feedback System
function showFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.style.display = 'none';
        resetFeedbackForm();
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
    
    // Store feedback in localStorage
    const feedback = {
        id: Date.now(),
        name: name || 'Anonymous',
        email: email || '',
        rating: rating,
        message: message,
        tool: tool || 'General',
        date: new Date().toISOString(),
        timestamp: Date.now()
    };
    
    const existingFeedback = JSON.parse(localStorage.getItem('multiToolsFeedback') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('multiToolsFeedback', JSON.stringify(existingFeedback));
    
    showNotification('Thank you for your feedback!', 'success');
    closeFeedbackModal();
    resetFeedbackForm();
    
    // Update reviews display
    updateReviewsDisplay();
}

function resetFeedbackForm() {
    const nameInput = document.getElementById('feedbackName');
    const emailInput = document.getElementById('feedbackEmail');
    const messageInput = document.getElementById('feedbackMessage');
    const toolSelect = document.getElementById('feedbackTool');
    
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (messageInput) messageInput.value = '';
    if (toolSelect) toolSelect.value = '';
    setRating(0);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Reviews Display System
function updateReviewsDisplay() {
    const feedback = JSON.parse(localStorage.getItem('multiToolsFeedback') || '[]');
    
    // Update statistics
    updateReviewStats(feedback);
    
    // Update reviews grid
    updateReviewsGrid(feedback);
}

function updateReviewStats(feedback) {
    if (feedback.length === 0) return;
    
    const totalReviews = feedback.length;
    const averageRating = feedback.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    
    // Update total reviews count
    const totalReviewsElement = document.getElementById('totalReviews');
    if (totalReviewsElement) {
        totalReviewsElement.textContent = totalReviews;
    }
    
    // Update average rating
    const ratingNumberElement = document.querySelector('.rating-number');
    if (ratingNumberElement) {
        ratingNumberElement.textContent = averageRating.toFixed(1);
    }
    
    // Calculate rating breakdown
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    feedback.forEach(review => {
        ratingCounts[review.rating]++;
    });
    
    // Update rating counts
    ['oneStarCount', 'twoStarCount', 'threeStarCount', 'fourStarCount', 'fiveStarCount'].forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = ratingCounts[index + 1];
        }
    });
    
    // Update rating bars
    const ratingBars = document.querySelectorAll('.rating-bar .fill');
    ratingBars.forEach((bar, index) => {
        const percentage = totalReviews > 0 ? (ratingCounts[5 - index] / totalReviews) * 100 : 0;
        bar.style.width = `${percentage}%`;
    });
}

function updateReviewsGrid(feedback) {
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (!reviewsGrid) return;
    
    // Sort feedback by date (newest first)
    const sortedFeedback = feedback.sort((a, b) => b.timestamp - a.timestamp);
    
    // Show only the latest 6 reviews
    const recentFeedback = sortedFeedback.slice(0, 6);
    
    if (recentFeedback.length === 0) {
        reviewsGrid.innerHTML = `
            <div class="no-reviews">
                <i class="fas fa-star"></i>
                <h3>Be the first to review!</h3>
                <p>Share your experience with Multi-Tools and help others discover our platform.</p>
                <button class="btn btn-primary" onclick="showFeedbackModal()">Write First Review</button>
            </div>
        `;
        return;
    }
    
    reviewsGrid.innerHTML = recentFeedback.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-name">${review.name}</div>
                    <div class="review-date">${formatDate(review.date)}</div>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <div class="review-content">
                <div class="review-text">${review.message}</div>
                ${review.tool && review.tool !== 'General' ? `<div class="review-tool">${review.tool}</div>` : ''}
            </div>
        </div>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    
    return date.toLocaleDateString();
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fas fa-star${i <= rating ? '' : ''}" style="color: ${i <= rating ? '#ffc107' : '#e9ecef'}"></i>`;
    }
    return stars;
}

function loadAllReviews() {
    const feedback = JSON.parse(localStorage.getItem('multiToolsFeedback') || '[]');
    const reviewsGrid = document.getElementById('reviewsGrid');
    
    if (!reviewsGrid) return;
    
    if (feedback.length === 0) {
        showNotification('No reviews found', 'error');
        return;
    }
    
    // Show all reviews
    const sortedFeedback = feedback.sort((a, b) => b.timestamp - a.timestamp);
    
    reviewsGrid.innerHTML = sortedFeedback.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-name">${review.name}</div>
                    <div class="review-date">${formatDate(review.date)}</div>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <div class="review-content">
                <div class="review-text">${review.message}</div>
                ${review.tool && review.tool !== 'General' ? `<div class="review-tool">${review.tool}</div>` : ''}
            </div>
        </div>
    `).join('');
    
    showNotification(`Showing all ${feedback.length} reviews`, 'success');
}

// Social Sharing Functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out Multi-Tools - 80+ free online tools for developers and designers!');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Multi-Tools: 80+ free online tools for developers and designers! 🛠️✨');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Multi-Tools - Free Online Tools');
    const summary = encodeURIComponent('80+ powerful tools for developers, designers, and everyday users.');
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
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link copied to clipboard!', 'success');
    });
}

// Add sample reviews for demonstration
function addSampleReviews() {
    const sampleReviews = [
        {
            id: Date.now() - 1000000,
            name: 'Sarah Johnson',
            email: '',
            rating: 5,
            message: 'Amazing collection of tools! The image compressor saved me so much time. Everything works perfectly and the interface is so clean.',
            tool: 'Image Compressor',
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            timestamp: Date.now() - 86400000 * 2
        },
        {
            id: Date.now() - 2000000,
            name: 'Mike Chen',
            email: '',
            rating: 5,
            message: 'The QR code generator is fantastic! I use it daily for my business. Fast, reliable, and completely free. Highly recommended!',
            tool: 'QR Code Generator',
            date: new Date(Date.now() - 86400000 * 5).toISOString(),
            timestamp: Date.now() - 86400000 * 5
        },
        {
            id: Date.now() - 3000000,
            name: 'Emily Rodriguez',
            email: '',
            rating: 4,
            message: 'Great tools for web development. The JSON formatter and CSS minifier are my go-to tools. Would love to see more developer tools!',
            tool: 'JSON Formatter',
            date: new Date(Date.now() - 86400000 * 7).toISOString(),
            timestamp: Date.now() - 86400000 * 7
        }
    ];
    
    const existingFeedback = JSON.parse(localStorage.getItem('multiToolsFeedback') || '[]');
    const hasSampleReviews = existingFeedback.some(review => review.name === 'Sarah Johnson');
    
    if (!hasSampleReviews) {
        const allFeedback = [...sampleReviews, ...existingFeedback];
        localStorage.setItem('multiToolsFeedback', JSON.stringify(allFeedback));
        updateReviewsDisplay();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize feedback modal
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeFeedbackModal);
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeFeedbackModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeFeedbackModal();
            }
        });
    }
    
    // Initialize rating stars
    const ratingStars = document.querySelectorAll('.rating-stars i');
    ratingStars.forEach((star, index) => {
        star.addEventListener('click', function() {
            showFeedbackModal();
            setTimeout(() => {
                setRating(index + 1);
            }, 100);
        });
    });
    
    // Initialize reviews display
    updateReviewsDisplay();
    
    // Add sample reviews if none exist
    if (localStorage.getItem('multiToolsFeedback') === null) {
        addSampleReviews();
    }
}); 