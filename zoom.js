document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.animated-image');
    const textElement = document.getElementById('animated-text');
    const words = ['word1', 'word2', 'word3', 'word4', 'word5', 'word6'];
    const zoomDuration = 3000;
    const typingDuration = zoomDuration * 2 / 3;
    const stayDuration = 1000;
    const delayAfterErase = 500;
    let currentIndex = 0;
  
    function applyZoomAnimation(element) {
      element.style.animation = 'none';
      element.offsetHeight;
      element.style.animation = '';
      element.style.animation = 'card-zoom 3s ease-in-out forwards';
    }
  
    function updateContent() {
      typeWriter(words[currentIndex], () => {
        setTimeout(() => {
          erase(words[currentIndex], () => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
            applyZoomAnimation(images[currentIndex]);
            setTimeout(updateContent, delayAfterErase);
          });
        }, stayDuration);
      });
    }
  
    function typeWriter(word, callback) {
      let i = 0;
      textElement.textContent = '|';
      function type() {
        if (i < word.length) {
          textElement.textContent = textElement.textContent.slice(0, -1) + word.charAt(i) + '|';
          i++;
          setTimeout(type, typingDuration / word.length);
        } else {
          setTimeout(callback, 1500);
        }
      }
      type();
    }
  
    function erase(word, callback) {
      let i = word.length;
      function eraseChar() {
        if (i > 0) {
          textElement.textContent = textElement.textContent.slice(0, -2) + '|';
          i--;
          setTimeout(eraseChar, delayAfterErase / word.length);
        } else {
          textElement.textContent = '|';
          setTimeout(callback, delayAfterErase);
        }
      }
      eraseChar();
    }
  
    // Initial setup
    images[currentIndex].classList.add('active');
    applyZoomAnimation(images[currentIndex]);
    typeWriter(words[currentIndex], () => {
      setTimeout(() => {
        erase(words[currentIndex], () => {
          currentIndex = (currentIndex + 1) % images.length;
          images[currentIndex].classList.add('active');
          applyZoomAnimation(images[currentIndex]);
          setTimeout(updateContent, delayAfterErase);
        });
      }, stayDuration);
    });
  });
  