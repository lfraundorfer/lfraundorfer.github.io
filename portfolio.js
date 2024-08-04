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

        // Capture the current value of i
        (function (i) {
          card.addEventListener('click', function () {
            if (imageText[categoryIndex] && imageText[categoryIndex][i - 1]) {
              const imageInfo = imageText[categoryIndex][i - 1];
              console.log(imageInfo);
              openGallery(imgSrc, imageInfo.header, imageInfo.description);
            } else {
              openGallery(imgSrc, "Default Title", "Default description");
            }
          });
        })(i);

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
