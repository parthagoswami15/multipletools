document.addEventListener("DOMContentLoaded", function() {
  // Search functionality
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const filter = searchInput.value.toLowerCase();
      const toolCards = document.querySelectorAll('.tool-card');
      
      toolCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        const text = title + ' ' + description;
        
        if (text.includes(filter)) {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
      
      // Show/hide category sections based on visible tools
      const categorySections = document.querySelectorAll('.category-section');
      categorySections.forEach(section => {
        const visibleTools = section.querySelectorAll('.tool-card[style*="display: none"]');
        const totalTools = section.querySelectorAll('.tool-card');
        
        if (visibleTools.length === totalTools.length && filter !== '') {
          section.style.display = 'none';
        } else {
          section.style.display = 'block';
        }
      });
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading animation to tool cards
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        const link = e.target;
        const originalText = link.textContent;
        link.innerHTML = '<span class="loading"></span> Loading...';
        link.style.pointerEvents = 'none';
        
        // Reset after a short delay (simulating page load)
        setTimeout(() => {
          link.textContent = originalText;
          link.style.pointerEvents = 'auto';
        }, 1000);
      }
    });
  });

  // Add tool count to category titles
  const categorySections = document.querySelectorAll('.category-section');
  categorySections.forEach(section => {
    const title = section.querySelector('.category-title');
    const toolCount = section.querySelectorAll('.tool-card').length;
    if (title && toolCount > 0) {
      title.innerHTML += ` <span class="badge badge-primary">${toolCount}</span>`;
    }
  });

  // Add "Back to Top" button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = 'btn btn-primary position-fixed';
  backToTopBtn.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px; display: none;';
  
  document.body.appendChild(backToTopBtn);

  // Show/hide back to top button
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  // Back to top functionality
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add tool usage analytics (local storage)
  toolCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        const toolName = e.target.closest('.tool-card').querySelector('.card-title').textContent;
        const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
        usage[toolName] = (usage[toolName] || 0) + 1;
        localStorage.setItem('toolUsage', JSON.stringify(usage));
      }
    });
  });

  // Show popular tools (if data exists)
  const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
  if (Object.keys(usage).length > 0) {
    const popularTools = Object.entries(usage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
    
    if (popularTools.length > 0) {
      const popularSection = document.createElement('section');
      popularSection.className = 'category-section';
      popularSection.innerHTML = `
        <h2 class="category-title"><i class="fas fa-star mr-2"></i>Popular Tools</h2>
        <div class="row">
          ${popularTools.map(([toolName]) => {
            const toolCard = Array.from(toolCards).find(card => 
              card.querySelector('.card-title').textContent === toolName
            );
            return toolCard ? toolCard.outerHTML : '';
          }).join('')}
        </div>
      `;
      
      const container = document.querySelector('.container');
      if (container) {
        container.insertBefore(popularSection, container.firstChild);
      }
    }
  }
}); 