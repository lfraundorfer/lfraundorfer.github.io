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
});
