const header = document.querySelector(".header"),
    toggler = document.querySelector(".header-toggle"),
    body = document.querySelector(".page-body");
toggler.addEventListener("click", (() => {
    header.classList.contains("header--nav-opened") ? (header.classList.remove("header--nav-opened"), body.classList.remove("page-body--hidden"), header.classList.add("header--nav-closed")) : (header.classList.add("header--nav-opened"), body.classList.add("page-body--hidden"), header.classList.remove("header--nav-closed"))
}));
const btnPrev = document.querySelector(".slider-btn--prev"),
    btnNext = document.querySelector(".slider-btn--next"),
    slides = document.querySelectorAll(".slider-item");
let counter = 0;
const maxStep = slides.length - 1;
console.log(maxStep), slides[counter].classList.add("slider-item--current");
const isLast = e => {
        e === maxStep ? btnNext.setAttribute("disabled", "disabled") : btnNext.removeAttribute("disabled", "disabled")
    },
    isFirst = e => {
        0 === e ? btnPrev.setAttribute("disabled", "disabled") : btnPrev.removeAttribute("disabled", "disabled")
    },
    nextBtnHendler = () => {
        slides[counter].classList.remove("slider-item--current"), slides[counter].setAttribute("style", "transform: translateX(0%);"), counter++, isLast(counter), isFirst(counter), slides[counter].classList.add("slider-item--current")
    },
    prevBtnHendler = () => {
        slides[counter].classList.remove("slider-item--current"), slides[counter].removeAttribute("style"), counter--, isLast(counter), isFirst(counter), slides[counter].classList.add("slider-item--current")
    };
btnNext.addEventListener("click", nextBtnHendler), btnPrev.addEventListener("click", prevBtnHendler);
