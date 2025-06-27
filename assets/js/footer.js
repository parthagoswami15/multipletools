document.addEventListener("DOMContentLoaded", function() {
  const footerElement = document.getElementById('footer');
  if (footerElement) {
    fetch('footer.html')
      .then(res => res.text())
      .then(data => {
        footerElement.innerHTML = data;
      })
      .catch(error => {
        console.log('Footer could not be loaded:', error);
        // Fallback footer
        footerElement.innerHTML = `
          <footer class="bg-dark text-white mt-5 p-4 text-center">
            <div>
              <a href="#" class="text-white mx-2">Contact</a> |
              <a href="#" class="text-white mx-2">Privacy Policy</a> |
              <a href="#" class="text-white mx-2">About</a>
            </div>
            <div class="mt-2">
              <a href="#" class="text-white mx-1"><i class="fab fa-facebook"></i></a>
              <a href="#" class="text-white mx-1"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-white mx-1"><i class="fab fa-instagram"></i></a>
            </div>
            <div class="mt-2">&copy; 2024 Multi-Tools. All rights reserved.</div>
          </footer>
        `;
      });
  }
}); 