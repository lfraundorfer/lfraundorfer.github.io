const images = [
    { src: './img/hero/crowd-heart.jpg', word: 'word1' },
    { src: './img/hero/crowd-happy.jpg', word: 'word2' },
    { src: './img/hero/fireworks.jpg', word: 'word3' },
    { src: './img/hero/hercules.jpg', word: 'word4' },
    { src: './img/hero/soccer.jpg', word: 'word5' },
    { src: './img/hero/swimmer.jpg', word: 'word6' }
];

const zoomDuration = 3000;
const typingDuration = zoomDuration * 2 / 3;
const stayDuration = 1000; // Stay duration after typing is complete
const delayAfterErase = 500;

let currentIndex = 0;
const imageElement = document.getElementById('animated-image');
const textElement = document.getElementById('animated-text');
const blackOverlay = document.getElementById('black-overlay');

function updateContent() {
    const currentImage = images[currentIndex];
    typeWriter(currentImage.word, () => {
        setTimeout(() => {
            erase(currentImage.word, () => {
                currentIndex = (currentIndex + 1) % images.length; // Move this line here
                const nextImage = images[currentIndex]; // Get the next image
                imageElement.src = nextImage.src; // Set the next image
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
typeWriter(images[currentIndex].word, () => {
    setTimeout(() => {
        erase(images[currentIndex].word, () => {
            currentIndex = (currentIndex + 1) % images.length;
            const nextImage = images[currentIndex];
            imageElement.src = nextImage.src;
            blackOverlay.style.opacity = 0;
            setTimeout(updateContent, delayAfterErase);
        });
    }, stayDuration);
});
