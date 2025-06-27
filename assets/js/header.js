document.addEventListener("DOMContentLoaded", function() {
  const headerElement = document.getElementById('header');
  if (headerElement) {
    fetch('header.html')
      .then(res => res.text())
      .then(data => {
        headerElement.innerHTML = data;
      })
      .catch(error => {
        console.log('Header could not be loaded:', error);
        // Fallback header
        headerElement.innerHTML = `
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="index.html">
              <i class="fas fa-tools"></i> Multi-Tools
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item"><a class="nav-link" href="index.html#image-tools">Image Tools</a></li>
                <li class="nav-item"><a class="nav-link" href="index.html#text-tools">Text Tools</a></li>
                <li class="nav-item"><a class="nav-link" href="index.html#developer-tools">Developer Tools</a></li>
                <li class="nav-item"><a class="nav-link" href="index.html#calculator-tools">Calculators</a></li>
                <li class="nav-item"><a class="nav-link" href="index.html#seo-tools">SEO Tools</a></li>
              </ul>
            </div>
          </nav>
        `;
      });
  }
}); 