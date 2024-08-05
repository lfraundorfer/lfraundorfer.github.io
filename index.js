document.addEventListener("DOMContentLoaded", () => {
  const portfolioSection = document.querySelector("#portfolio");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const quotes = document.querySelectorAll(".quote");
  const quoteIcons = document.querySelectorAll(".quote-slider-icon");
  const quoteSection = document.querySelector(".quote-slider");
  const stats = document.querySelectorAll("#stats .stats-copy");
  const statsSection = document.querySelector("#stats");
  const sections = document.querySelectorAll('#partners, #portfolio, #usp, #stats, #why-us, #contact-form');
  const textElement = document.getElementById('animated-text');
  const imageElements = document.querySelectorAll('.animated-image');

  const AUTOPLAY_INTERVAL = 4000;
  const FADE_IN_THRESHOLD = 0.5;
  const PORTFOLIO_THRESHOLD = 0.7;
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
  let slideNumber = 0;
  let playSlider;

  const handleIntersection = (entries, observer, callback) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const ioPortfolio = new IntersectionObserver(
    (entries, observer) => handleIntersection(entries, observer, (target) => {
      portfolioSection.classList.add("inview");
    }),
    { threshold: PORTFOLIO_THRESHOLD }
  );

  ioPortfolio.observe(portfolioSection);

  const ioStats = new IntersectionObserver(
    (entries, observer) => handleIntersection(entries, observer, (target) => {
      stats.forEach((stat, index) => {
        setTimeout(() => {
          stat.classList.add("animate");
          const counterElement = stat.querySelector('.counter');
          const endValue = parseInt(counterElement.getAttribute('data-target'));
          const duration = parseInt(counterElement.getAttribute('data-duration'));
          countUp(counterElement, endValue, duration);
        }, index * 1000);
      });
    }),
    { threshold: FADE_IN_THRESHOLD }
  );

  if (statsSection) {
    ioStats.observe(statsSection);
  }

  const countUp = (element, endValue, duration) => {
    const startValue = parseInt(element.textContent);
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
      element.textContent = currentValue;
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const showSlide = (index) => {
    quotes.forEach((quote, i) => {
      quote.classList.toggle("active", i === index);
    });
    quoteIcons.forEach((quoteIcon, i) => {
      quoteIcon.classList.toggle("active", i === index);
    });
    slideNumber = index;
  };

  quoteIcons.forEach((quoteIcon, i) => {
    quoteIcon.addEventListener("click", () => {
      showSlide(i);
    });
  });

  nextButton.addEventListener("click", () => {
    slideNumber = (slideNumber + 1) % quotes.length;
    showSlide(slideNumber);
  });

  prevButton.addEventListener("click", () => {
    slideNumber = (slideNumber - 1 + quotes.length) % quotes.length;
    showSlide(slideNumber);
  });

  const startAutoplay = () => {
    playSlider = setInterval(() => {
      slideNumber = (slideNumber + 1) % quotes.length;
      showSlide(slideNumber);
    }, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    clearInterval(playSlider);
  };

  quoteSection.addEventListener("mouseover", stopAutoplay);
  quoteSection.addEventListener("mouseout", startAutoplay);
  startAutoplay();

  const titles = ["Be heard.", "Welcome to Our Site", "Your Trusted Partner"];
  let currentTitleIndex = 0;

  setInterval(() => {
    document.title = titles[currentTitleIndex];
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
  }, 1500);

  const showImage = (index) => {
    imageElements.forEach((img, i) => {
      img.classList.remove('show');
      if (i === index) {
        img.classList.add('show');
        img.style.animation = 'none';
        img.offsetHeight;
        img.style.animation = '';
        img.style.animation = 'card-zoom 3s ease-in-out forwards';
      }
    });
  };

  const typeWriter = (word, callback) => {
    let i = 0;
    textElement.textContent = '|';
    const type = () => {
      if (i < word.length) {
        textElement.textContent = textElement.textContent.slice(0, -1) + word.charAt(i) + '|';
        i++;
        setTimeout(type, typingDuration / word.length);
      } else {
        setTimeout(callback, 1500);
      }
    };
    type();
  };

  const erase = (word, callback) => {
    let i = word.length;
    const eraseChar = () => {
      if (i > 0) {
        textElement.textContent = textElement.textContent.slice(0, -2) + '|';
        i--;
        setTimeout(eraseChar, delayAfterErase / word.length);
      } else {
        textElement.textContent = '|';
        setTimeout(callback, delayAfterErase);
      }
    };
    eraseChar();
  };

  const updateContent = () => {
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
  };

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
