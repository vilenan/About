const header = document.querySelector('.header');
const toggler = document.querySelector('.header-toggle');

toggler.addEventListener('click', ()=>{
    if(header.classList.contains('header--nav-opened')){
        header.classList.remove('header--nav-opened');
        header.classList.add('header--nav-closed');
    } else {
        header.classList.add('header--nav-opened');
        header.classList.remove('header--nav-closed');
    }
});
