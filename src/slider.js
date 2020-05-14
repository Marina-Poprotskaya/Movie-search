import Swiper from 'swiper';

export let mySwiper = new Swiper('.swiper-container', {
  spaceBetween: 30,
  breakpoints: {
    200: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    760: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  },
  initialSlide: 0,
  observer: true,
  reachEnd: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 10,
    type: 'bullets',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})




