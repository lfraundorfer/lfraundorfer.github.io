const images = [
    { src: './img/hero/webp/crowd-heart.webp', word: 'word1' },
    { src: './img/hero/webp/crowd-happy.webp', word: 'word2' },
    { src: './img/hero/webp/fireworks.webp', word: 'word3' },
    { src: './img/hero/webp/hercules.webp', word: 'word4' },
    { src: './img/hero/webp/soccer.webp', word: 'word5' },
    { src: './img/hero/webp/swimmer.webp', word: 'word6' }
];

const zoomDuration = 3000;
const typingDuration = zoomDuration * 2 / 3;
const stayDuration = 1000; // Stay duration after typing is complete
const delayAfterErase = 500;

let currentIndex = 0;
const imageElement = document.getElementById('animated-image');
const textElement = document.getElementById('animated-text');
const blackOverlay = document.getElementById('black-overlay');

function applyZoomAnimation(element) {
    element.style.animation = 'none'; // Reset animation
    element.offsetHeight; // Trigger reflow
    element.style.animation = ''; // Restart animation
    element.style.animation = 'card-zoom 3s ease-in-out forwards';
}

function updateContent() {
    const currentImage = images[currentIndex];
    typeWriter(currentImage.word, () => {
        setTimeout(() => {
            erase(currentImage.word, () => {
                currentIndex = (currentIndex + 1) % images.length; // Move this line here
                const nextImage = images[currentIndex]; // Get the next image
                imageElement.src = nextImage.src; // Set the next image
                applyZoomAnimation(imageElement); // Apply zoom animation for new image
                blackOverlay.style.opacity = 0;
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
    blackOverlay.style.opacity = 1;
    function eraseChar() {
        if (i > 0) {
            textElement.textContent = textElement.textContent.slice(0, -2) + '|';
            i--;
            setTimeout(eraseChar, delayAfterErase / word.length);
        } else {
            textElement.textContent = '|';
            setTimeout(callback, delayAfterErase); // Ensure new content update after erase
        }
    }
    eraseChar();
}

// Initial setup
imageElement.src = images[currentIndex].src;
applyZoomAnimation(imageElement); // Apply zoom animation for the first image
typeWriter(images[currentIndex].word, () => {
    setTimeout(() => {
        erase(images[currentIndex].word, () => {
            currentIndex = (currentIndex + 1) % images.length;
            const nextImage = images[currentIndex];
            imageElement.src = nextImage.src;
            applyZoomAnimation(imageElement); // Apply zoom animation for the first image
            blackOverlay.style.opacity = 0;
            setTimeout(updateContent, delayAfterErase);
        });
    }, stayDuration);
});
