const header = document.querySelector('.header');
const toggler = document.querySelector('.header-toggle');
const body = document.querySelector('.page-body');
const btnPrev = document.querySelector('.slider-btn--prev');
const btnNext = document.querySelector('.slider-btn--next');
const slides = document.querySelectorAll('.slider-item');

toggler.addEventListener('click', () => {
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

let counter = 0;
const maxStep = slides.length - 1;
slides[counter].classList.add('slider-item--current');

const isLast = (num) => {
    num === maxStep ? btnNext.setAttribute('disabled', 'true') : btnNext.removeAttribute('disabled')
};

const isFirst = (num) => {
    num === 0 ? btnPrev.setAttribute('disabled', 'true') : btnPrev.removeAttribute('disabled')
};

const onNextBtnClick = () => {
        slides[counter].classList.remove('slider-item--current');
        slides[counter].setAttribute('style', 'transform: translateX(0%);');
        counter++;
        isLast(counter);
        isFirst(counter);
        slides[counter].classList.add('slider-item--current');
    };
const onPrevBtnClick = () => {
        slides[counter].classList.remove('slider-item--current');
        slides[counter].removeAttribute('style');
        counter--;
        isLast(counter);
        isFirst(counter);
        slides[counter].classList.add('slider-item--current');
    };
btnNext.addEventListener('click', onNextBtnClick);
btnPrev.addEventListener('click', onPrevBtnClick);

const swiper = new Swiper('.achievements-slider', {
    direction: 'horizontal',
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: 'true',
        dynamicBullets: 'true',
    },
});
