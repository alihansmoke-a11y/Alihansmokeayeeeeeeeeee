// Основной JavaScript файл

// Эффект появления навигации при скролле
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию ко всем карточкам
document.querySelectorAll('.player-card, .trophy-item, .era-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Эффект параллакса для героя
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero, .history-hero, .trophy-hero');
    if (hero) {
        hero.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
    }
});

// Подсветка активного пункта меню
const currentLocation = location.pathname;
const menuItems = document.querySelectorAll('.nav-links a');
menuItems.forEach(item => {
    if (item.getAttribute('href') === currentLocation.split('/').pop()) {
        item.classList.add('active');
    }
});

// Случайная цитата дня
const quotes = [
    '"Més que un club" - Больше чем клуб',
    '"Visca el Barça!" - Да здравствует Барса!',
    '"El clásico - это не игра, это война миров"',
    '"В Ла Масии верят, что игроки рождаются, а не создаются"',
    '"Барселона - это единственный клуб, который имеет свой стиль жизни"',
    '"Камп Ноу - храм футбола"'
];

function setRandomQuote() {
    const quoteElement = document.querySelector('.random-quote');
    if (quoteElement) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    }
}

setRandomQuote();

// Добавляем кнопку "Наверх"
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--barca-red);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: var(--shadow);
    z-index: 99;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Добавляем анимацию для чисел
function animateNumbers() {
    document.querySelectorAll('.stat-value, .trophy-count').forEach(el => {
        const value = parseInt(el.textContent);
        if (!isNaN(value) && value > 0) {
            let current = 0;
            const increment = value / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    el.textContent = value;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 20);
        }
    });
}

// Запускаем анимацию чисел когда они видны
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            numberObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.player-stats, .trophy-count-big').forEach(el => {
    numberObserver.observe(el);
});