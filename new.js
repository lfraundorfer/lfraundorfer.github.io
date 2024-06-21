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
      console.log("Entry:", entry); // Debugging log
      if (entry.isIntersecting) {
        console.log("Adding inview to", entry.target); // Debugging log
        entry.target.classList.add("inview");
        observer.unobserve(entry.target);
      }
    });
  };

  const io2 = new IntersectionObserver(active, {
    threshold: 0.7, // Trigger when 20% of the row is visible
  });

  rows.forEach((row) => {
    console.log("Observing row:", row); // Debugging log
    io2.observe(row);
  });

  const testimonials = document.querySelector(".testimonials");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const quotes = document.querySelectorAll(".quote");
  const quoteIcons = document.querySelectorAll(".quote-slider-icon");
  const numberOfSlides = quotes.length;
  var slideNumber = 0;

  //forward:
  //make respective quote active
  nextButton.addEventListener("click", () => {
    slideNumber++;
    quotes.forEach((quote) => {
      quote.classList.remove("active");
    });
    quoteIcons.forEach((quoteIcon) => {
      quoteIcon.classList.remove("active");
    });

    //go back to start at overflow
    if (slideNumber > numberOfSlides - 1) {
      slideNumber = 0;
    }

    quotes[slideNumber].classList.add("active");
    quoteIcons[slideNumber].classList.add("active");
    console.log(slideNumber);
  });

  //back:
  //make respective quote active
  prevButton.addEventListener("click", () => {
    slideNumber--;
    quotes.forEach((quote) => {
      quote.classList.remove("active");
    });
    quoteIcons.forEach((quoteIcon) => {
      quoteIcon.classList.remove("active");
    });

    //go back to start at overflow
    if (slideNumber < 0) {
      slideNumber = numberOfSlides - 1;
    }

    quotes[slideNumber].classList.add("active");
    quoteIcons[slideNumber].classList.add("active");
    console.log(slideNumber);
  });

  //automated play:
  var playSlider;
  var repeater = () => {
    playSlider = setInterval(function () {
      slideNumber++;
      quotes.forEach((quote) => {
        quote.classList.remove("active");
      });
      quoteIcons.forEach((quoteIcon) => {
        quoteIcon.classList.remove("active");
      });

      //go back to start at overflow
      if (slideNumber > numberOfSlides - 1) {
        slideNumber = 0;
      }

      quotes[slideNumber].classList.add("active");
      quoteIcons[slideNumber].classList.add("active");
      console.log(slideNumber);
    }, 4000);
  };
  repeater();

  //stop automated play on mouseover
  testimonials.addEventListener("mouseover", () => {
    clearInterval(playSlider);
  });

  //start again on mouseout
  testimonials.addEventListener("mouseout", () => {
    repeater();
  });
});
