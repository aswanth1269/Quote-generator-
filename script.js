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
    // Inspirational
    { text: "Life is not a problem to be solved, but a reality to be experienced.", author: "Søren Kierkegaard", category: "inspirational" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "inspirational" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso", category: "inspirational" },
    { text: "Whatever you are, be a good one.", author: "Abraham Lincoln", category: "inspirational" },
    
    // Wisdom
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "wisdom" },
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost", category: "wisdom" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "wisdom" },
    
    // Humor
    { text: "I'm not lazy, I'm just conserving energy.", author: "Unknown", category: "humor" },
    { text: "I don't need a hair stylist, my pillow gives me a new hairstyle every morning.", author: "Unknown", category: "humor" },
    { text: "Why don't scientists trust atoms? Because they make up everything!", author: "Unknown", category: "humor" },
    
    // Motivation
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "motivation" },
    
    // Life
    { text: "Life is what happens while you're busy making other plans.", author: "John Lennon", category: "life" },
    { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller", category: "life" },
    { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius", category: "life" }
];

const emojis = ['✨', '🌟', '💫', '⭐', '🌠', '🎈', '🎉', '🦋', '🎭', '🎪', '🎡', '🌺', '🌸', '🍀', '🎨'];
const animationStyles = ['sparkle', 'bounce', 'wobble', 'pulse', 'float'];

function getRandomAnimation() {
    return animationStyles[Math.floor(Math.random() * animationStyles.length)];
}

function createEmojiRain() {
    const emoji = document.createElement('div');
    emoji.className = 'emoji-rain';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.fontSize = `${Math.random() * 10 + 20}px`;
    
    const rotation = Math.random() * 360;
    const horizontalMovement = (Math.random() - 0.5) * 100;
    
    const animation = emoji.animate([
        { 
            top: '-20px', 
            opacity: 1,
            transform: `rotate(${rotation}deg) translateX(0px)`
        },
        { 
            top: '100vh', 
            opacity: 0,
            transform: `rotate(${rotation + 360}deg) translateX(${horizontalMovement}px)`
        }
    ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    document.body.appendChild(emoji);
    animation.onfinish = () => emoji.remove();
}

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayQuote() {
    const container = document.querySelector('.container');
    container.classList.add('loading');
    
    animationStyles.forEach(style => {
        container.classList.remove(`animation-${style}`);
    });
    
    const newAnimation = getRandomAnimation();
    container.classList.add(`animation-${newAnimation}`);
    
    for (let i = 0; i < 15; i++) {
        setTimeout(createEmojiRain, i * 100);
    }

    setTimeout(() => {
        const { text, author, category } = getRandomQuote();
        quoteText.textContent = `"${text}"`;
        quoteAuthor.textContent = `- ${author}`;
        container.classList.remove('loading');
        
        const colors = {
            inspirational: '#ff61d8',
            wisdom: '#61ffb4',
            humor: '#61b4ff',
            motivation: '#ffd761',
            life: '#ff6161'
        };
        
        container.style.borderColor = colors[category] || '#ffffff';
    }, 500);
}

function tweetQuote() {
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + ' ' + author)}`;
    window.open(twitterUrl, '_blank');
}

const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetQuoteBtn = document.getElementById('tweet-quote');

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