document.addEventListener("DOMContentLoaded", function() {
    fetch("header-footer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-container').innerHTML = new DOMParser().parseFromString(data, 'text/html').getElementById('menu').outerHTML;
        document.getElementById('footer-container').innerHTML = new DOMParser().parseFromString(data, 'text/html').querySelector('footer').outerHTML;
        
        // Add any additional header/footer specific functionality here
        const navbar = document.getElementById("menu");
        window.addEventListener("scroll", () => {
          if (window.scrollY > 0) {
            navbar.classList.add("sticky");
          } else {
            navbar.classList.remove("sticky");
          }
        });
      });
  });
  