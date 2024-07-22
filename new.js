document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    myFunction();
  };

  var navbar = document.getElementById("menu");
  var sticky = navbar.offsetTop;

  function myFunction() {
    if (window.scrollY >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }

  const rows = document.querySelectorAll(".row");

  const active = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("inview");
        observer.unobserve(entry.target);
      }
    });
  };

  const io2 = new IntersectionObserver(active, {
    threshold: 0.7, // Trigger when 70% of the row is visible
  });

  rows.forEach((row) => {
    io2.observe(row);
  });

  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const quotes = document.querySelectorAll(".quote");
  const quoteIcons = document.querySelectorAll(".quote-slider-icon");
  const numberOfSlides = quotes.length;
  var slideNumber = 0;

  const quoteSection = document.querySelector(".quote-slider");

  function showSlide(index) {
    quotes.forEach((quote, i) => {
      quote.classList.toggle("active", i === index);
    });
    quoteIcons.forEach((quoteIcon, i) => {
      quoteIcon.classList.toggle("active", i === index);
    });
  }

  // Forward
  nextButton.addEventListener("click", () => {
    slideNumber = (slideNumber + 1) % numberOfSlides;
    showSlide(slideNumber);
  });

  // Back
  prevButton.addEventListener("click", () => {
    slideNumber = (slideNumber - 1 + numberOfSlides) % numberOfSlides;
    showSlide(slideNumber);
  });

  // Automated play
  let playSlider;
  function startAutoplay() {
    playSlider = setInterval(() => {
      slideNumber = (slideNumber + 1) % numberOfSlides;
      showSlide(slideNumber);
    }, 4000);
  }

  function stopAutoplay() {
    clearInterval(playSlider);
  }

  // Start autoplay initially
  startAutoplay();

  // Stop autoplay on mouseover
  quoteSection.addEventListener("mouseover", stopAutoplay);

  // Start autoplay again on mouseout
  quoteSection.addEventListener("mouseout", startAutoplay);

  // Stats animation
  const stats = document.querySelectorAll(".stats .stats-copy");

  function countUp(element, endValue, duration) {
    const startValue = parseInt(element.textContent); // Use the initial value from the element's text content
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
      element.textContent = currentValue;
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  const animateStats = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        stats.forEach((stat, index) => {
          setTimeout(() => {
            stat.classList.add("animate");
            const counterElement = stat.querySelector('.counter');
            const endValue = parseInt(counterElement.getAttribute('data-target'));
            const duration = parseInt(counterElement.getAttribute('data-duration'));
            countUp(counterElement, endValue, duration);
          }, index * 1000);
        });
        observer.unobserve(entry.target);
      }
    });
  };

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    const io3 = new IntersectionObserver(animateStats, {
      threshold: 0.5, // Trigger when 50% of the stats section is visible
    });
    io3.observe(statsSection);
  }

  const titles = ["Be heard.", "Welcome to Our Site", "Your Trusted Partner"];
  let currentIndex = 0;

  setInterval(() => {
    document.title = titles[currentIndex];
    currentIndex = (currentIndex + 1) % titles.length;
  }, 1500); // Change title every x seconds


  const menuLinks = document.querySelectorAll('#menu a');
  const sections = document.querySelectorAll('section');

  function removeActiveClasses() {
    menuLinks.forEach(link => link.classList.remove('active'));
  }

  function setActiveLink(id) {
    removeActiveClasses();
    const activeLink = document.querySelector(`#menu a[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      console.log(id);
    }
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      const sectionId = this.getAttribute('href').substring(1);
      setActiveLink(sectionId);
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});
