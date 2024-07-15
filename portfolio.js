document.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".category");
  const basePath = 'img/portfolio/';
  
  async function imageExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (err) {
      return false;
    }
  }

  async function loadImages(categoryIndex) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear existing images
    let i = 1;
    while (true) {
      const imgSrc = `${basePath}cat${categoryIndex + 1}-${i}.jpg`;
      if (await imageExists(imgSrc)) {
        const img = new Image();
        img.src = imgSrc;
        output.appendChild(img);
        i++;
      } else {
        break;
      }
    }
  }

  categories.forEach((category, index) => {
    category.addEventListener("click", function () {
      // Remove active class from all categories
      categories.forEach((cat) => cat.classList.remove("active"));

      // Add active class to the clicked category
      this.classList.add("active");

      // Load images for the clicked category
      loadImages(index);
    });
  });

  // Initial setup to select the first category
  categories[0].classList.add("active");
  loadImages(0); // Load images for the first category initially
});
