const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mainSymbols = '01'; 
const hearts = '♥♡❤❣❦❧';
const fontSize = 18;
const columns = canvas.width / fontSize;
const rainDrops = [];

for (let x = 0; x < columns; x++) { rainDrops[x] = 1; }

const drawMatrix = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const isHeart = Math.random() > 0.85;
        const text = isHeart 
            ? hearts.charAt(Math.floor(Math.random() * hearts.length))
            : mainSymbols.charAt(Math.floor(Math.random() * mainSymbols.length));

        ctx.fillStyle = isHeart ? '#ff3399' : '#ffcce6';
        ctx.shadowBlur = isHeart ? 10 : 0;
        ctx.shadowColor = '#ff3399';

        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(drawMatrix, 35);

const card = document.getElementById('card');
const bgMusic = document.getElementById('bg-music');
let isMusicPlaying = false;

card.addEventListener('click', (e) => {
    if (isMusicPlaying) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
    isMusicPlaying = !isMusicPlaying;

    for (let i = 0; i < 12; i++) {
        createHeartParticle(e.clientX, e.clientY);
    }
});

function createHeartParticle(x, y) {
    const heart = document.createElement('span');
    heart.classList.add('heart-particle');
    heart.innerHTML = '❤️';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    const destX = (Math.random() - 0.5) * 400 + 'px';
    const destY = (Math.random() - 1) * 400 + 'px';
    const rotation = Math.random() * 360 + 'deg';
    heart.style.setProperty('--x', destX);
    heart.style.setProperty('--y', destY);
    heart.style.setProperty('--r', rotation);
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 1500);
}

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xRotation = ((clientY - innerHeight / 2) / innerHeight) * 20;
    const yRotation = ((clientX - innerWidth / 2) / innerWidth) * -20;
    card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
});

document.addEventListener('mouseleave', () => {
    card.style.transition = "transform 1s ease";
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

document.addEventListener('mouseenter', () => {
    card.style.transition = "none";
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});