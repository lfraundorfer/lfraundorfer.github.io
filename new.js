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

  const items = document.querySelectorAll(".appear");

  const active = function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("inview");
      } else {
        entry.target.classList.remove("inview");
      }
    });
  };

  const io2 = new IntersectionObserver(active, {
    threshold: [0, 0.1, 0.5, 1], // Different thresholds for testing
  });

  items.forEach((item) => {
    io2.observe(item);
  });
});
