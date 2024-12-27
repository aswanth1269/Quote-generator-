const starsContainer = document.querySelector('.stars');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = star.style.height = `${Math.random() * 3}px`;
    star.style.animationDelay = `${Math.random() * 1}s`;
    starsContainer.appendChild(star);
}

const quotes = [
    { text: "Life is not a problem to be solved, but a reality to be experienced.", author: "Søren Kierkegaard" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Imagination is more important than knowledge.", author: "Albert Einstein" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { text: "Today is the first day of the rest of your life!", author: "Anonymous" }
];

const emojis = ['✨', '🌟', '💫', '⭐', '🌠', '🎈', '🎉', '🌈'];

function createEmojiRain() {
    const emoji = document.createElement('div');
    emoji.className = 'emoji-rain';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.position = 'fixed';
    emoji.style.top = '-20px';
    emoji.style.fontSize = '24px';
    emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(emoji);

    const animation = emoji.animate([
        { top: '-20px', opacity: 1 },
        { top: '100vh', opacity: 0 }
    ], {
        duration: 3000,
        easing: 'linear'
    });

    animation.onfinish = () => emoji.remove();
}

const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetQuoteBtn = document.getElementById('tweet-quote');

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayQuote() {
    const container = document.querySelector('.container');
    container.classList.add('loading');
    
    // Create emoji rain effect
    for (let i = 0; i < 10; i++) {
        setTimeout(createEmojiRain, i * 100);
    }

    setTimeout(() => {
        const { text, author } = getRandomQuote();
        quoteText.textContent = `"${text}"`;
        quoteAuthor.textContent = `- ${author}`;
        container.classList.remove('loading');
    }, 500);
}

function tweetQuote() {
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + ' ' + author)}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', displayQuote);
tweetQuoteBtn.addEventListener('click', tweetQuote);

// Add hover effect to container
const container = document.querySelector('.container');
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

container.addEventListener('mouseleave', () => {
    container.style.transform = 'rotateX(0) rotateY(0)';
});