document.addEventListener("DOMContentLoaded", function () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const categories = document.querySelectorAll(".category");

  const images_cat1 = [
    'img/portfolio/cat1-1.jpg',
  ];

  const images_cat2 = [
    'img/portfolio/cat2-1.jpg',
    'img/portfolio/cat2-2.jpg',
  ];

  const images_cat3 = [
    'img/portfolio/cat3-1.jpg',
    'img/portfolio/cat3-2.jpg',
    'img/portfolio/cat3-3.jpg',
  ];

  const images_cat4 = [
    'img/portfolio/cat4-1.jpg',
    'img/portfolio/cat4-2.jpg',
    'img/portfolio/cat4-3.jpg',
    'img/portfolio/cat4-4.jpg'
  ];

  function loadImages(images) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear existing images
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      output.appendChild(img);
    });
  }

  categories.forEach((category, index) => {
    category.addEventListener("click", function () {
      // Remove active class from all categories
      categories.forEach((cat) => cat.classList.remove("active"));

      // Add active class to the clicked category
      this.classList.add("active");

      // Load images based on the clicked category
      switch (index) {
        case 0:
          loadImages(images_cat1);
          break;
        case 1:
          loadImages(images_cat2);
          break;
        case 2:
          loadImages(images_cat3);
          break;
        case 3:
          loadImages(images_cat4);
          break;
      }
    });
  });

  categories[0].classList.add("active");
  loadImages(images_cat1);

  // document.querySelector('button').addEventListener('click', function () {
  //   loadImages(images_cat1); // Initial load or button specific action
  });

