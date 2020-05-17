import { mySwiper } from './slider';
import createKeyboard from './keyboard';
import { getDataAboutMovie, getDataAboutDescription } from './request';
import {
    appendMainSpinner, removeMainSpinner, clearDescriptionField, showFormMessage,
} from './helper';
import { getHtmlElementCard, getHtmlElementDescription } from './templates';

const clearInputBtn = document.querySelector('.input-wrapper__clear-btn');
const form = document.querySelector('form');
const inputField = document.querySelector('input');
const fieldForMessage = document.querySelector('.field-for-message');
const swiperWrapper = document.querySelector('.swiper-wrapper');
let searchValue = inputField.value;

function showFullDescription() {
    const spinnerWrapper = document.querySelector('.spinner-wrapper');
    const descriptionWrapper = document.querySelector('.description-wrapper');
    spinnerWrapper.addEventListener('click', async (event) => {
        if (event.target.tagName === 'BUTTON') {
            const bittonId = event.target.dataset.id;
            const description = await getDataAboutDescription(bittonId);
            const container = getHtmlElementDescription(description);
            descriptionWrapper.append(container);
        }
    });
}

function renderCards(cards) {
    cards.forEach((card, index) => {
        const element = getHtmlElementCard(card, index);
        swiperWrapper.append(element);
    });
    mySwiper.update();
}

document.addEventListener('DOMContentLoaded', async () => {
    const cards = await getDataAboutMovie();
    renderCards(cards);
    mySwiper.slideTo(0, 400, false);
    mySwiper.update();
    removeMainSpinner();
    showFullDescription();
});

function chooseTitle() {
    const arr = ['man', 'god', 'women', 'sleep', 'moon', 'sun', 'life', 'dog', 'cat', 'avatar'];
    arr.sort(() => Math.random() - 0.5);
    const someInd = 0;
    searchValue = arr[someInd];
    return searchValue;
}
inputField.value = chooseTitle();

function clearInput() {
    inputField.value = '';
    inputField.focus();
}

clearInputBtn.addEventListener('click', () => {
    clearInput();
});


const slider = document.querySelector('.slider');
form.addEventListener('submit', async (e) => {
    const page = 1;
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
        }, 1000);
        if (cards.length > 0) {
            clearDescriptionField();
            swiperWrapper.innerHTML = '';
            renderCards(cards);
            mySwiper.slideTo(0, 400, false);
            mySwiper.update();
        }
    } else {
        showFormMessage();
    }
});

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
        }, 1000);
        if (cards.length > 0) {
            clearDescriptionField();
            swiperWrapper.innerHTML = '';
            renderCards(cards);
            mySwiper.slideTo(0, 400, false);
            mySwiper.update();
        }
    } else {
        showFormMessage();
    }
});

mySwiper.on('slideChange', async () => {
    const listOfSlides = document.getElementsByClassName('swiper-slide');
    const page = listOfSlides.length / 10 + 1;
    if (mySwiper.activeIndex > mySwiper.previousIndex) {
        if (mySwiper.activeIndex === listOfSlides.length - 5) {
            const cards = await getDataAboutMovie(page);
            renderCards(cards);
        }
    }
});
