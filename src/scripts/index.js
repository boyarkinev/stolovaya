import '../pages/index.css'

import 'swiper/swiper-bundle.css'
import Swiper from 'swiper/bundle'

var swiper = new Swiper('.slider__container', {
  containerModifierClass: 'slider__container',
  wrapperClass: 'slider__wrapper',
  slideClass: 'widgets__slide',
  
  effect: 'slide',
  slidesPerView: 1,
  centeredSlides: true,
  loop: true,
  clickable: true,

  autoplay: {
    delay: 5000,
  },
  speed: 500,

  pagination: {
    el: '.slider__pagination',
    bulletActiveClass: 'slider__pagination-bullet-active',
    bulletClass: 'slider__pagination-bullet',
    clickable: true,
    type: 'bullets',
  },

  navigation: {
    nextEl: '.slider__arrow_right',
    prevEl: '.slider__arrow_left',
  },
})

const select = function() {
  const selectHeader = document.querySelectorAll('.select__header')
  const selectItem = document.querySelectorAll('.select__item')

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle)
  })

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose)
  })

  function selectToggle() {
    this.parentElement.classList.toggle('is-active')
  }

  function selectChoose() {
    const text = this.innerText,
          select = this.closest('.select')
    const currentText = this.closest('.select').querySelector('.select__current')
    currentText.innerText = text
    select.classList.remove('is-active')
  }
}

select()