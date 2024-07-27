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
  { src: './img/hero/webp/crowd-heart.webp', word: 'word1' },
  { src: './img/hero/webp/crowd-happy.webp', word: 'word2' },
  { src: './img/hero/webp/fireworks.webp', word: 'word3' },
  { src: './img/hero/webp/hercules.webp', word: 'word4' },
  { src: './img/hero/webp/soccer.webp', word: 'word5' },
  { src: './img/hero/webp/swimmer.webp', word: 'word6' }
];

const zoomDuration = 3000;
const typingDuration = zoomDuration * 2 / 3;
const stayDuration = 1000;
const delayAfterErase = 500;

let currentIndex = 0;
const imageElement = document.getElementById('animated-image');
const textElement = document.getElementById('animated-text');
const blackOverlay = document.getElementById('black-overlay');

function applyZoomAnimation(element) {
  element.style.animation = 'none';
  element.offsetHeight;
  element.style.animation = '';
  element.style.animation = 'card-zoom 3s ease-in-out forwards';
}

function updateContent() {
  const currentImage = images[currentIndex];
  typeWriter(currentImage.word, () => {
    setTimeout(() => {
      erase(currentImage.word, () => {
        currentIndex = (currentIndex + 1) % images.length;
        const nextImage = images[currentIndex];
        imageElement.src = nextImage.src;
        applyZoomAnimation(imageElement);
        blackOverlay.style.opacity = 0;
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
  blackOverlay.style.opacity = 1;
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
imageElement.src = images[currentIndex].src;
applyZoomAnimation(imageElement);
typeWriter(images[currentIndex].word, () => {
  setTimeout(() => {
    erase(images[currentIndex].word, () => {
      currentIndex = (currentIndex + 1) % images.length;
      const nextImage = images[currentIndex];
      imageElement.src = nextImage.src;
      applyZoomAnimation(imageElement);
      blackOverlay.style.opacity = 0;
      setTimeout(updateContent, delayAfterErase);
    });
  }, stayDuration);
});

});
