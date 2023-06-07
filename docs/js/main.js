const header = document.querySelector('.header');
const toggle = document.querySelector('.header__toggle');
const body = document.querySelector('.page-body');
const btnPrev = document.querySelector('.slider-btn--prev');
const btnNext = document.querySelector('.slider-btn--next');
const slides = document.querySelectorAll('.slider-item');
const progressBar = header.querySelector('.header__progressBar');
const slider = document.querySelector('.slider');
const achievements = document.querySelector('.achievements');

toggle.addEventListener('click', () => {
    if(header.classList.contains('header--nav-opened')){
        header.classList.remove('header--nav-opened');
        body.classList.remove('page-body--hidden');
        header.classList.add('header--nav-closed');
        body.style.overflow = 'auto';
    } else {
        header.classList.add('header--nav-opened');
        body.classList.add('page-body--hidden');
        body.style.overflow = 'hidden';
        header.classList.remove('header--nav-closed');
    }
});

const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener('scroll', scrollHandler);

function scrollHandler() {
    const windowScroll = window.scrollY;
    const progressBarWidth = (windowScroll / windowHeight).toFixed(2);
    progressBar.setAttribute('style', `transform: scaleX(${progressBarWidth})`);

    if(isPartiallyVisible(slider)) {
        slider.classList.add('slider--active');
    }

    if(isPartiallyVisible(achievements)) {
        achievements.classList.add('achievements--active');
    }
}

function isPartiallyVisible(element) {
    const elementBoundary = element.getBoundingClientRect();
    const top = elementBoundary.top;
    const bottom = elementBoundary.bottom;
    const height = elementBoundary.height;

    return (top + height >= 0 ) && (document.documentElement.clientHeight + height > bottom);
}

const swiperPortfolio = new Swiper('.slider__container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,

    // Navigation arrows
    navigation: {
        nextEl: '.slider__button--next',
        prevEl: '.slider__button--prev',
    },
    slidesPerView: 1,
});

const swiper = new Swiper('.achievements-slider', {
    direction: 'horizontal',
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: 'true',
        dynamicBullets: 'true',
    },
});
