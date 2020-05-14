import { getCard  } from './helper';
import { composeFilmsAndData } from './composeFilmAndData';
import { apiKey, apiKeyTranslate } from './constants.js';
import { showFullDescription } from './index';

const inputField = document.querySelector('input');
const fieldForMessage = document.querySelector('.field-for-message');
const spinner = document.querySelector('.spinner');
const slider = document.querySelector('.slider');
let loadingSlider = document.querySelector('.loading-slider');

async function getDataAboutMovie(page = 1) {
    try {
        if(slider.classList.contains('slow-appear')) {
            spinner.classList.add('show');
        }
        let regexpRus = /(^[А-я0-9\s]+)(?!.*[A-z])$/;
        let searchValue = inputField.value;
        const searchWord = searchValue.match(regexpRus) ? await getTranslation(searchValue) : searchValue;
        if (searchValue.match(regexpRus)) {
            fieldForMessage.innerHTML = `Showing results for "${searchWord}"`;
        }
        fieldForMessage.classList.remove('wrong');
        const url = `https://www.omdbapi.com/?s=${searchWord}&page=${page}&apikey=${apiKey}&type=movie`;
        const response = await fetch(url);
        const data = await response.json();
        const errorMessage = data.Error;
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        const cards = data.Search;
        const imdbIDList = cards.map((element) => {
            return element.imdbID;
        })
        const [rating, links] = await getRatingsAndLinks(imdbIDList);
        showFullDescription(imdbIDList);
        const composedCards = composeFilmsAndData(cards, rating, links);
        spinner.classList.remove('show');
        slider.classList.add('slow-appear');    
        return composedCards;
    }
    catch (errorMessage) {
        spinner.classList.remove('show');
        if (errorMessage == 'Error: Movie not found!') {
            fieldForMessage.innerHTML = `No results for "${inputField.value}"`;
        } else {
            fieldForMessage.innerHTML = errorMessage;
        }
        fieldForMessage.classList.add('wrong');
        return [];
    }
}

async function getRatingsAndLinks(imdbIDList) {
    const ratingList = [];
    const linksList = [];
    for (let i = 0; i < imdbIDList.length; i++) {
        const ratingURL = `https://www.omdbapi.com/?i=${imdbIDList[i]}&apikey=${apiKey}`;
        const linksByTitle = `https://www.imdb.com/title/${imdbIDList[i]}/?ref_=fn_al_tt_1`;
        const response_rating = await fetch(ratingURL);
        const data_rating = await response_rating.json();
        ratingList.push(data_rating.imdbRating);
        linksList.push(linksByTitle);
    }
    return [ratingList, linksList];
}

async function getDataAboutDescription(imdbIDList) {
    let description = [];
    for (let i = 0; i < imdbIDList.length; i++) {
        const ratingURL = `https://www.omdbapi.com/?i=${imdbIDList[i]}&apikey=${apiKey}`;
        const response = await fetch(ratingURL);
        const data = await response.json();
        description.push(data)
    }
    return description;
}

async function getTranslation(searchValue) {
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKeyTranslate}&text=${searchValue}&lang=ru-en`;
    const response = await fetch(urlTranslate);
    const data = await response.json();
    const translation = data.text.toString();
    return translation;
}

export { getDataAboutMovie, getDataAboutDescription }; 
