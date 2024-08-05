document.addEventListener("DOMContentLoaded", function() {
    fetch("header-footer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-container').innerHTML = new DOMParser().parseFromString(data, 'text/html').getElementById('menu').outerHTML;
        document.getElementById('footer-container').innerHTML = new DOMParser().parseFromString(data, 'text/html').querySelector('footer').outerHTML;
  
        const navbar = document.getElementById("menu");
        window.addEventListener("scroll", () => {
          if (window.scrollY > 0) {
            navbar.classList.add("sticky");
          } else {
            navbar.classList.remove("sticky");
          }
        });
  
        const isIndexPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
  
        const updateLinks = () => {
          const menuLinks = document.querySelectorAll('#menu a');
          menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
              if (isIndexPage) {
                link.setAttribute('href', href);
              } else {
                link.setAttribute('href', `./index.html${href}`);
              }
            }
          });
  
          const footerLinks = document.querySelectorAll('.footer-links a');
          footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
              if (isIndexPage) {
                link.setAttribute('href', href);
              } else {
                link.setAttribute('href', `./index.html${href}`);
              }
            }
          });
        };
  
        updateLinks();
  
        const sections = document.querySelectorAll('main section');
        const menuLinks = document.querySelectorAll('#menu a');
  
        const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.5
        };
  
        const findClosestSection = () => {
          let closestSection = sections[0];
          let closestDistance = Math.abs(sections[0].getBoundingClientRect().top);
  
          sections.forEach(section => {
            const distance = Math.abs(section.getBoundingClientRect().top);
            if (distance < closestDistance) {
              closestSection = section;
              closestDistance = distance;
            }
          });
  
          return closestSection;
        };
  
        const observerCallback = (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const closestSection = findClosestSection();
              setActiveLink(closestSection.id);
            }
          });
        };
  
        const observer = new IntersectionObserver(observerCallback, observerOptions);
  
        sections.forEach(section => {
          observer.observe(section);
        });
  
        const removeActiveClasses = () => {
          menuLinks.forEach(link => link.classList.remove('active'));
        };
  
        const setActiveLink = (id) => {
          removeActiveClasses();
          const activeLink = document.querySelector(`#menu a[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        };
      });
  });
  