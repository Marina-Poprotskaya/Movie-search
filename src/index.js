import { mySwiper } from './slider';
import createKeyboard from './keyboard';
import { getDataAboutMovie, getDataAboutDescription} from './request';
import { getCard, appendMainSpinner, removeMainSpinner, createCardDescription, clearDescriptionField } from './helper';

const clearInputBtn = document.querySelector('.input-wrapper__clear-btn');
const form = document.querySelector('form');
const inputField = document.querySelector('input');
const fieldForMessage = document.querySelector('.field-for-message');
const swiperWrapper = document.querySelector('.swiper-wrapper');
let searchValue = inputField.value;

document.addEventListener("DOMContentLoaded", async () => {
    console.log('Привет! Смена языка на виртуальной клавиатуре - Alt')
    const cards = await getDataAboutMovie();
    renderCards(cards);
    mySwiper.slideTo(0, 400, false);
    mySwiper.update();
    removeMainSpinner();
});

function chooseTitle() {
    const arr = ['man', 'god', 'women', 'sleep', 'moon', 'sun', 'life', 'dog', 'cat', 'avatar']
    arr.sort(() => Math.random() - 0.5);
    searchValue = arr[0];
    return searchValue;
}
inputField.value = chooseTitle();

function clearInput() {
    inputField.value = '';
    inputField.focus();
}

clearInputBtn.addEventListener('click', () => {
    clearInput();
})

const slider = document.querySelector('.slider');
form.addEventListener('submit', async (e) => {
    let page = 1;
    e.preventDefault();
    if (inputField.value !== '') {
        appendMainSpinner();
        slider.classList.remove('slow-appear');
        fieldForMessage.innerHTML = '';
        searchValue = inputField.value;
        const cards = await getDataAboutMovie(page);
        removeMainSpinner();
        setTimeout(() => {
            slider.classList.add('slow-appear');    
        }, 1000)
        if (cards.length > 0) {
            clearDescriptionField();
            swiperWrapper.innerHTML = '';
            renderCards(cards);
            mySwiper.slideTo(0, 400, false);
            mySwiper.update();
        }
    } else {
        fieldForMessage.innerHTML = 'Please enter a movie title'
        fieldForMessage.classList.add('wrong');
    }
})

const keyboardField = document.querySelector('.keyboard-class');
const enterButton = document.getElementById('Enter');
enterButton.addEventListener('click', async () => {
    if (inputField.value !== '') {
        appendMainSpinner();
        slider.classList.remove('slow-appear');
        searchValue = inputField.value;
        fieldForMessage.innerHTML = '';
        keyboardField.classList.add('keyboard-disable');
        const cards = await getDataAboutMovie();
        removeMainSpinner();
        setTimeout(() => {
            slider.classList.add('slow-appear');    
        }, 1000)
        if (cards.length > 0) {
            clearDescriptionField();
            swiperWrapper.innerHTML = '';
            renderCards(cards);
            mySwiper.slideTo(0, 400, false);
            mySwiper.update();
        }
    } else {
        fieldForMessage.innerHTML = 'Please enter a movie title'
        fieldForMessage.classList.add('wrong');
    }
});

mySwiper.on('slideChange', async () => {
    const listOfSlides = document.getElementsByClassName('swiper-slide');
    let page = listOfSlides.length / 10 + 1;
    if (mySwiper.activeIndex > mySwiper.previousIndex) {
        if (mySwiper.activeIndex === listOfSlides.length - 5) {
            const cards = await getDataAboutMovie(page);
            renderCards(cards);
        }
    }
})

function renderCards(cards) {
    cards.forEach((card, index) => {
        const element = getCard(card, index);
        swiperWrapper.append(element);
    })
    mySwiper.update();
}

function showFullDescription(imdbIDList) {
    let spinnerWrapper = document.querySelector('.spinner-wrapper');
    const descriptionWrapper = document.querySelector('.description-wrapper');
    spinnerWrapper.addEventListener('click', async (event) => {
        if (event.target.classList.contains('description-btn')) {
            const target = event.target;
            for (let i = 0; i < imdbIDList.length; i++) {
                if (target.classList.contains(`btn-${i}`)) {
                    const description = await getDataAboutDescription(imdbIDList);
                    const wrapperOfSlide = target.closest('div');
                    const titleOfCurrentMovie = wrapperOfSlide.children[0].textContent;
                    if (titleOfCurrentMovie === description[`${i}`].Title) {
                        const container = createCardDescription(description[`${i}`]);
                        descriptionWrapper.append(container);
                    }
                }
            }
        }
    })
};



export { showFullDescription}