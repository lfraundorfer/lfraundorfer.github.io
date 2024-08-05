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
    [
      {
        header: "Cat 1 Image 1 Title",
        description: "Lorem ipsum dolor sit amet, Cat 1 Image 1 description..."
      }
    ],
    [
      {
        header: "Cat 2 Image 1 Title",
        description: "Lorem ipsum dolor sit amet, Cat 2 Image 1 description..."
      },
      {
        header: "Cat 2 Image 2 Title",
        description: "Lorem ipsum dolor sit amet, Cat 2 Image 2 description..."
      }
    ],
    [
      {
        header: "Cat 3 Image 1 Title",
        description: "Lorem ipsum dolor sit amet, Cat 3 Image 1 description..."
      },
      {
        header: "Cat 3 Image 2 Title",
        description: "Lorem ipsum dolor sit amet, Cat 3 Image 2 description..."
      },
      {
        header: "Cat 3 Image 3 Title",
        description: "Lorem ipsum dolor sit amet, Cat 3 Image 3 description..."
      }
    ],
    [
      {
        header: "Cat 4 Image 1 Title",
        description: "Lorem ipsum dolor sit amet, Cat 4 Image 1 description..."
      },
      {
        header: "Cat 4 Image 2 Title",
        description: "Lorem ipsum dolor sit amet, Cat 4 Image 2 description..."
      },
      {
        header: "Cat 4 Image 3 Title",
        description: "Lorem ipsum dolor sit amet, Cat 4 Image 3 description..."
      },
      {
        header: "Cat 4 Image 4 Title",
        description: "Lorem ipsum dolor sit amet, Cat 4 Image 4 description..."
      }
    ]
  ];

  let currentCategoryIndex = 0;
  let currentImageIndex = 0;

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

        (function (i) {
          card.addEventListener('click', function () {
            currentImageIndex = i - 1;
            openGallery(imgSrc, categoryIndex, currentImageIndex);
          });
        })(i);

        i++;
      } else {
        break;
      }
    }
  }

  let isFirstOpen = true;

  function openGallery(src, categoryIndex, imageIndex) {
    const gallery = document.getElementById('gallery');
    const galleryImg = document.getElementById('galleryImg');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryDescription = document.getElementById('galleryDescription');
  
    if (!isFirstOpen) {
      // Hide the image before changing source
      galleryImg.classList.add('hidden');
  
      setTimeout(() => {
        const imageInfo = imageText[categoryIndex][imageIndex];
        galleryImg.src = src;
        galleryTitle.textContent = imageInfo.header;
        galleryDescription.textContent = imageInfo.description;
  
        // Show the image after source is changed
        galleryImg.classList.remove('hidden');
      }, 500); // Match the duration of the transition animation
    } else {
      const imageInfo = imageText[categoryIndex][imageIndex];
      galleryImg.src = src;
      galleryTitle.textContent = imageInfo.header;
      galleryDescription.textContent = imageInfo.description;
      galleryImg.classList.remove('hidden');
      isFirstOpen = false;
    }
  
    gallery.style.display = 'flex';
  }
  
  // Reset isFirstOpen when the gallery is closed
  function closeGallery() {
    const gallery = document.getElementById('gallery');
    gallery.style.display = 'none';
    isFirstOpen = true;
  }
  

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageText[currentCategoryIndex].length;
    const imgSrc = `${basePath}cat${currentCategoryIndex + 1}-${currentImageIndex + 1}.jpg`;
    openGallery(imgSrc, currentCategoryIndex, currentImageIndex);
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageText[currentCategoryIndex].length) % imageText[currentCategoryIndex].length;
    const imgSrc = `${basePath}cat${currentCategoryIndex + 1}-${currentImageIndex + 1}.jpg`;
    openGallery(imgSrc, currentCategoryIndex, currentImageIndex);
  }

  document.querySelector('.close').addEventListener('click', closeGallery);
  document.querySelector('.gallery-nav.left').addEventListener('click', showPrevImage);
  document.querySelector('.gallery-nav.right').addEventListener('click', showNextImage);

  document.getElementById('gallery').addEventListener('click', function (event) {
    if (event.target === event.currentTarget || event.target.classList.contains('close')) {
      closeGallery();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeGallery();
    } else if (event.key === 'ArrowRight') {
      showNextImage();
    } else if (event.key === 'ArrowLeft') {
      showPrevImage();
    }
  });

  // Swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  function handleGesture() {
    if (touchEndX < touchStartX) {
      showNextImage();
    }
    if (touchEndX > touchStartX) {
      showPrevImage();
    }
  }

  document.getElementById('gallery').addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
  });

  document.getElementById('gallery').addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
  });

  categories.forEach((category, index) => {
    category.addEventListener("click", function () {
      categories.forEach((cat) => cat.classList.remove("active"));
      this.classList.add("active");
      currentCategoryIndex = index;

      document.getElementById('category-text').innerHTML = `
        <h2>${categoryText[index].header}</h2>
        <p>${categoryText[index].description}</p>
      `;
      loadImages(index);
    });
  });

  categories[0].classList.add("active");
  document.getElementById('category-text').innerHTML = `
    <h2>${categoryText[0].header}</h2>
    <p>${categoryText[0].description}</p>
  `;
  loadImages(0);
});
