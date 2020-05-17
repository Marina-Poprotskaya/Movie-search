import { showInputSpinner, hideInputSpinner } from './helper';
import composeFilmsAndData from './composeFilmAndData';
import { apiKey, apiKeyTranslate, regexpRus } from './constants';

const inputField = document.querySelector('input');
const fieldForMessage = document.querySelector('.field-for-message');

const slider = document.querySelector('.slider');

async function getRatings(imdbIDList) {
    const ratingList = [];
    for (let i = 0; i < imdbIDList.length; i += 1) {
        const ratingURL = `https://www.omdbapi.com/?i=${imdbIDList[i]}&apikey=${apiKey}`;
        const responseRating = await fetch(ratingURL);
        const dataRating = await responseRating.json();
        ratingList.push(dataRating.imdbRating);
    }
    return ratingList;
}

function getLinks(imdbIDList) {
    const linksList = [];
    imdbIDList.forEach((el) => {
        const linksByTitle = `https://www.imdb.com/title/${el}/?ref_=fn_al_tt_1`;
        linksList.push(linksByTitle);
    });
    return linksList;
}

async function getTranslation(searchValue) {
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKeyTranslate}&text=${searchValue}&lang=ru-en`;
    const response = await fetch(urlTranslate);
    const data = await response.json();
    const translation = data.text.toString();
    return translation;
}

async function getDataAboutMovie(page = 1) {
    try {
        if (slider.classList.contains('slow-appear')) {
            showInputSpinner();
        }
        const searchValue = inputField.value;
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
        const imdbIDList = cards.map((element) => element.imdbID);
        const links = getLinks(imdbIDList);
        const rating = await getRatings(imdbIDList);
        const composedCards = composeFilmsAndData(cards, rating, links, imdbIDList);
        hideInputSpinner();
        slider.classList.add('slow-appear');
        return composedCards;
    } catch (errorMessage) {
        hideInputSpinner();
        if (errorMessage === 'Error: Movie not found!') {
            fieldForMessage.innerHTML = `No results for "${inputField.value}"`;
        } else {
            fieldForMessage.innerHTML = errorMessage;
        }
        fieldForMessage.classList.add('wrong');
        return [];
    }
}

async function getDataAboutDescription(someId) {
    const ratingURL = `https://www.omdbapi.com/?i=${someId}&apikey=${apiKey}`;
    const response = await fetch(ratingURL);
    const description = await response.json();
    return description;
}

export { getDataAboutMovie, getDataAboutDescription };
