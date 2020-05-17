import { createElement } from './helper';

function getHtmlElementCard(card, index) {
    const defaultPoster = '../img/no_poster.png';
    const poster = card.Poster === 'N/A' ? defaultPoster : card.Poster;
    const template = `
                       <a class="swiper-slide__title" target = _blank href = ${card.link}>${card.Title}</a>
                       <img class = "swiper-slide__poster" alt = '#' src = '${poster}' class="swiper-lazy">
                       <span class = "swiper-slide__year">${card.Year}</span>
                       <span class = "swiper-slide__rating"><img alt='#' class ="rating-star" src = '../img/star-rating.svg'>${card.rating}</span>
                       <button class = "description-btn btn-${index}" data-id = "${card.id}">Full description</button>
                      `;
    const element = createElement('div', 'swiper-slide');
    element.innerHTML = template;
    return element;
}


function getHtmlElementDescription(description) {
    const {
        Title,
        Actors,
        Awards,
        BoxOffice,
        Country,
        DVD,
        Director,
        Genre,
        Language,
        Metascore,
        Plot,
        Production,
        Rated,
        Released,
        Runtime,
        Type,
        Writer,
        Year,
        imdbRating,
        imdbVotes,
    } = description;

    const templateOfDescription = `
                                  <div class="description">
                                  <button class = "description-close">X</button>
                                  <div class = "description-column">
                                      <div class = "description-title">"${Title}"</div>
                                      <div><b>Actors:</b> ${Actors}</div>
                                      <div><b>Awards:</b> ${Awards}</div>
                                      <div><b>BoxOffice:</b> ${BoxOffice}</div>
                                      <div><b>Country:</b> ${Country}</div>
                                      <div><b>DVD:</b> ${DVD}</div>
                                      <div><b>Director:</b> ${Director}</div>
                                   </div>   
                                   <div class = "description-column">
                                      <div><b>Genre:</b> ${Genre}</div> 
                                      <div><b>Language:</b> ${Language}</div>
                                      <div><b>Metascore:</b> ${Metascore}</div>
                                      <div><b>Plot:</b> ${Plot}</div>
                                      <div><b>Production:</b> ${Production}</div>
                                      <div><b>Rated:</b> ${Rated}</div>
                                      <div><b>Released:</b> ${Released}</div>
                                    </div> 
                                    <div class = "description-column">
                                      <div><b>Runtime:</b> ${Runtime}</div> 
                                      <div><b>Type:</b> ${Type}</div>
                                      <div><b>Writer:</b> ${Writer}</div>
                                      <div><b>Year:</b> ${Year}</div>
                                      <div><b>imdbRating:</b> ${imdbRating}</div>
                                      <div><b>imdbVotes:</b> ${imdbVotes}</div>
                                      </div>   
                                  </div>
    `;
    const container = document.getElementById('container');
    container.innerHTML = templateOfDescription;
    return container;
}


export { getHtmlElementCard, getHtmlElementDescription };
