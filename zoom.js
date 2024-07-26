const images = [
    { src: './img/hero/crowd-heart.jpg', word: 'word2' },
    { src: './img/hero/crowd-happy.jpg', word: 'word1' },
    { src: './img/hero/fireworks.jpg', word: 'word5' },
    { src: './img/hero/hercules.jpg', word: 'word6' },
    { src: './img/hero/soccer.jpg', word: 'word4' },
    { src: './img/hero/swimmer.jpg', word: 'word3' }
];

const zoomDuration = 3000;
const typingDuration = zoomDuration * 2 / 3;
const erasingDuration = zoomDuration / 3;

let currentIndex = 0;
const imageElement = document.getElementById('animated-image');
const textElement = document.getElementById('animated-text');

function updateContent() {
    const currentImage = images[currentIndex];
    imageElement.classList.remove('fade-in');
    imageElement.style.animation = 'none'; // Reset animation
    imageElement.offsetHeight; // Trigger reflow
    imageElement.style.animation = ''; // Restart animation

    // Update both src and class together to avoid race condition
    imageElement.src = currentImage.src;
    imageElement.classList.add('fade-in');

    typeWriter(currentImage.word);
    currentIndex = (currentIndex + 1) % images.length;
}

function typeWriter(word) {
    let i = 0;
    textElement.textContent = '|';
    function type() {
        if (i < word.length) {
            textElement.textContent = textElement.textContent.slice(0, -1) + word.charAt(i) + '|';
            i++;
            setTimeout(type, typingDuration / word.length);
        } else {
            setTimeout(() => {
                erase(word);
            }, zoomDuration / 2); // Sync erasing with zoom duration
        }
    }
    type();
}

function erase(word) {
    let i = word.length;
    function eraseChar() {
        if (i > 0) {
            textElement.textContent = textElement.textContent.slice(0, -2) + '|';
            i--;
            setTimeout(eraseChar, erasingDuration / word.length);
        } else {
            textElement.textContent = '|';
            setTimeout(() => {
                setTimeout(updateContent, 50); // Add delay before updating content
            }, 0);
        }
    }
    eraseChar();
}

// Initial setup with a slight delay to ensure smooth start
setTimeout(updateContent, 50);
