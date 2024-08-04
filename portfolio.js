document.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".category");
  const basePath = 'img/portfolio/';
  const categoryText = [
    {
      header: "Category 1 Header",
      description: "Lorem ipsum dolor sit amet, Category 1 description..."
    },
    {
      header: "Category 2 Header",
      description: "Lorem ipsum dolor sit amet, Category 2 description..."
    },
    {
      header: "Category 3 Header",
      description: "Lorem ipsum dolor sit amet, Category 3 description..."
    },
    {
      header: "Category 4 Header",
      description: "Lorem ipsum dolor sit amet, Category 4 description..."
    },
  ];
  const imageText = [
    {
      header: "Image 1 Title",
      description: "Lorem ipsum dolor sit amet, Image 1 description..."
    },
    {
      header: "Image 2 Title",
      description: "Lorem ipsum dolor sit amet, Image 2 description..."
    },
    // Add more image descriptions as needed
  ];

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
        const card = document.createElement('div');
        card.className = 'card';

        const img = new Image();
        img.src = imgSrc;

        const cardHover = document.createElement('div');
        cardHover.className = 'card-hover';
        cardHover.textContent = 'SHOW ME HOMIE';

        card.appendChild(img);
        card.appendChild(cardHover);
        output.appendChild(card);

        // Add event listener for hover and mobile tap
        card.addEventListener('mouseenter', function () {
          cardHover.style.opacity = '1';
          cardHover.style.transform = 'translate(0, -50%)';
        });

        card.addEventListener('mouseleave', function () {
          cardHover.style.opacity = '0';
          cardHover.style.transform = 'translate(100%, -50%)';
        });

        card.addEventListener('click', function () {
          openGallery(imgSrc, imageText[i - 1].header, imageText[i - 1].description);
        });

        i++;
      } else {
        break;
      }
    }
  }

  function openGallery(src, title, description) {
    const gallery = document.getElementById('gallery');
    const galleryImg = document.getElementById('galleryImg');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryDescription = document.getElementById('galleryDescription');
    
    galleryImg.src = src;
    galleryTitle.textContent = title;
    galleryDescription.textContent = description;
    
    gallery.style.display = 'flex';
  }

  function closeGallery() {
    const gallery = document.getElementById('gallery');
    gallery.style.display = 'none';
  }

  document.querySelector('.close').addEventListener('click', closeGallery);
  document.getElementById('gallery').addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closeGallery();
    }
  });

  categories.forEach((category, index) => {
    category.addEventListener("click", function () {
      // Remove active class from all categories
      categories.forEach((cat) => cat.classList.remove("active"));

      // Add active class to the clicked category
      this.classList.add("active");

      // Load category text
      document.getElementById('category-text').innerHTML = `
        <h2>${categoryText[index].header}</h2>
        <p>${categoryText[index].description}</p>
      `;

      // Load images for the clicked category
      loadImages(index);
    });
  });

  // Initial setup to select the first category
  categories[0].classList.add("active");
  document.getElementById('category-text').innerHTML = `
    <h2>${categoryText[0].header}</h2>
    <p>${categoryText[0].description}</p>
  `;
  loadImages(0); // Load images for the first category initially
});
