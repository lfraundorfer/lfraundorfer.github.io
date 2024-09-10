// add a sticky element which then becomes unsticky?
// so the section has to be larger than 100vh
document.addEventListener("DOMContentLoaded", function () {
  const PORTFOLIO_THRESHOLD = 0.7;
  const serviceFooter = document.querySelector(".services-footer");

  const boxHeaderSection = document.querySelector(".service-boxes");
  const boxHeader = document.querySelectorAll(".service-box");

  console.log(serviceFooter);

  const handleIntersection = (entries, observer, callback) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const ioPortfolio = new IntersectionObserver(
    (entries, observer) =>
      handleIntersection(entries, observer, (target) => {
        serviceFooter.classList.add("sticky");
        console.log("Hello, World!");
      }),
    { threshold: PORTFOLIO_THRESHOLD }
  );

  ioPortfolio.observe(serviceFooter);

  const ioStats = new IntersectionObserver(
    (entries, observer) =>
      handleIntersection(entries, observer, (target) => {
        boxHeader.forEach((header, index) => {
          header.classList.add("sticky");
          console.log(header);
        });
      }),
    { threshold: PORTFOLIO_THRESHOLD }
  );

  ioStats.observe(boxHeaderSection);
});

const ioStats = new IntersectionObserver(
  (entries, observer) =>
    handleIntersection(entries, observer, (target) => {
      stats.forEach((stat, index) => {
        setTimeout(() => {
          stat.classList.add("animate");
          const counterElement = stat.querySelector(".counter");
          const endValue = parseInt(counterElement.getAttribute("data-target"));
          const duration = parseInt(
            counterElement.getAttribute("data-duration")
          );
          countUp(counterElement, endValue, duration);
        }, index * 1000);
      });
    }),
  { threshold: FADE_IN_THRESHOLD }
);

if (statsSection) {
  ioStats.observe(statsSection);
}
