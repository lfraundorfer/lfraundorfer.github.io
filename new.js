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

  const portfolioSection = document.querySelector("#portfolio");

  const activePortfolio = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("portfolio innasekt1")
        portfolioSection.classList.add("inview");
        observer.unobserve(entry.target);
      }
    });
  };

  const ioPortfolio = new IntersectionObserver(activePortfolio, {
    threshold: 0.7, // Trigger when 70% of the row is visible
  });

  ioPortfolio.observe(portfolioSection);

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
    slideNumber = index; // Update the slide number
  }

  quoteIcons.forEach((quoteIcon, i) => {
    quoteIcon.addEventListener("click", () => {
      showSlide(i);
    });
  });

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
  let currentTitleIndex = 0;

  setInterval(() => {
    document.title = titles[currentTitleIndex];
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
  }, 1500); // Change title every x seconds


  // New code for active menu item
  const menuLinks = document.querySelectorAll('#menu a');
  const sections = document.querySelectorAll('#partners, #portfolio, #usp, #stats, #why-us, #contact-form');

  function removeActiveClasses() {
    menuLinks.forEach(link => link.classList.remove('active'));
  }

  function setActiveLink(id) {
    removeActiveClasses();
    const activeLink = document.querySelector(`#menu a[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      console.log("Active link set:", id);
    }
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      const sectionId = this.getAttribute('href').substring(1);
      setActiveLink(sectionId);
    });
  });

  let lastScrollY = window.scrollY;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  function findClosestSection() {
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
  }

  const observerCallback = (entries, observer) => {
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


  const images = [
    { src: './img/hero/webp/crowd-heart.webp', word: 'LOVE' },
    { src: './img/hero/webp/crowd-happy.webp', word: 'SMILES' },
    { src: './img/hero/webp/fireworks.webp', word: 'WOW' },
    { src: './img/hero/webp/hercules.webp', word: 'HISTORY' },
    { src: './img/hero/webp/soccer.webp', word: 'EXCITEMENT' },
    { src: './img/hero/webp/swimmer.webp', word: 'WAVES' }
  ];

  const zoomDuration = 3000;
  const typingDuration = zoomDuration * 2 / 3;
  const stayDuration = 1000;
  const delayAfterErase = 500;

  let currentIndex = 0;
  const imageElements = document.querySelectorAll('.animated-image');
  const textElement = document.getElementById('animated-text');

  function showImage(index) {
    imageElements.forEach((img, i) => {
      img.classList.remove('show');
      if (i === index) {
        img.classList.add('show');
        img.style.animation = 'none'; // Reset animation
        img.offsetHeight; // Trigger reflow
        img.style.animation = ''; // Restart animation
        img.style.animation = 'card-zoom 3s ease-in-out forwards';
      }
    });
  }

  function updateContent() {
    const currentImage = images[currentIndex];
    typeWriter(currentImage.word, () => {
      setTimeout(() => {
        erase(currentImage.word, () => {
          currentIndex = (currentIndex + 1) % images.length;
          showImage(currentIndex);
          setTimeout(updateContent, delayAfterErase);
        });
      }, stayDuration);
    });
  }

  function typeWriter(word, callback) {
    let i = 0;
    textElement.textContent = '|';
    function type() {
      if (i < word.length) {
        textElement.textContent = textElement.textContent.slice(0, -1) + word.charAt(i) + '|';
        i++;
        setTimeout(type, typingDuration / word.length);
      } else {
        setTimeout(callback, 1500);
      }
    }
    type();
  }

  function erase(word, callback) {
    let i = word.length;
    function eraseChar() {
      if (i > 0) {
        textElement.textContent = textElement.textContent.slice(0, -2) + '|';
        i--;
        setTimeout(eraseChar, delayAfterErase / word.length);
      } else {
        textElement.textContent = '|';
        setTimeout(callback, delayAfterErase);
      }
    }
    eraseChar();
  }

  // Initial setup
  showImage(currentIndex);
  typeWriter(images[currentIndex].word, () => {
    setTimeout(() => {
      erase(images[currentIndex].word, () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
        setTimeout(updateContent, delayAfterErase);
      });
    }, stayDuration);
  });

});
