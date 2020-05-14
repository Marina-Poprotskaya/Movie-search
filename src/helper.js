const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element
}

function getCard(card, index) {
  const defaultPoster = '../img/no_poster.png';
  const element = createElement('div', 'swiper-slide');
  const poster = card.Poster === 'N/A' ? defaultPoster : card.Poster
  const template = `
                     <a class="swiper-slide__title" target = _blank href = ${card.link}>${card.Title}</a>
                     <img class = "swiper-slide__poster" alt = '#' src = '${poster}' class="swiper-lazy">
                     <span class = "swiper-slide__year">${card.Year}</span>
                     <span class = "swiper-slide__rating"><img alt='#' class ="rating-star" src = '../img/star-rating.svg'>${card.rating}</span>
                     <button class = "description-btn btn-${index}">Full description</button>
                    `
  element.innerHTML = template;
  return element;
}


function createCardDescription(description) {
  const templateOfDescription = `
                                <div class="description">
                                <button class = "description-close">X</button>
                                <div class = "description-column">
                                    <div class = "description-title">"${description.Title}"</div>
                                    <div><b>Actors:</b> ${description.Actors}</div>
                                    <div><b>Awards:</b> ${description.Awards}</div>
                                    <div><b>BoxOffice:</b> ${description.BoxOffice}</div>
                                    <div><b>Country:</b> ${description.Country}</div>
                                    <div><b>DVD:</b> ${description.DVD}</div>
                                    <div><b>Director:</b> ${description.Director}</div>
                                 </div>   
                                 <div class = "description-column">
                                    <div><b>Genre:</b> ${description.Genre}</div> 
                                    <div><b>Language:</b> ${description.Language}</div>
                                    <div><b>Metascore:</b> ${description.Metascore}</div>
                                    <div><b>Plot:</b> ${description.Plot}</div>
                                    <div><b>Production:</b> ${description.Production}</div>
                                    <div><b>Rated:</b> ${description.Rated}</div>
                                    <div><b>Released:</b> ${description.Released}</div>
                                  </div> 
                                  <div class = "description-column">
                                    <div><b>Runtime:</b> ${description.Runtime}</div> 
                                    <div><b>Title:</b> ${description.Title}</div>
                                    <div><b>Type:</b> ${description.Type}</div>
                                    <div><b>Writer:</b> ${description.Writer}</div>
                                    <div><b>Year:</b> ${description.Year}</div>
                                    <div><b>imdbRating:</b> ${description.imdbRating}</div>
                                    <div><b>imdbVotes:</b> ${description.imdbVotes}</div>
                                    </div>   
                                </div>
  `
  const container = document.getElementById('container');
  container.innerHTML = templateOfDescription;
  return container;
}

const descriptionField = document.getElementById('container');
descriptionField.addEventListener('click', (event) => { 
    if(event.target.tagName === 'BUTTON') {
      clearDescriptionField();
    }
})

function clearDescriptionField() {
  const container = document.getElementById('container');
  container.innerHTML='';
}

function appendMainSpinner() {
  let spinnerWrapper = document.querySelector('.spinner-wrapper');
  const loadingSlider = createElement('div', 'loading-slider');
  let template = `    
                  <div class="spinner-main circles">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                  </div>
                `
  loadingSlider.innerHTML = template;
  spinnerWrapper.prepend(loadingSlider);
}


function removeMainSpinner() {
  let loadingSlider = document.querySelector('.loading-slider');
  loadingSlider.classList.add('slider-hide');
  if(loadingSlider && loadingSlider.parentNode) {
     loadingSlider.parentNode.removeChild(loadingSlider); 
  }
}


export { getCard, appendMainSpinner, removeMainSpinner, createCardDescription, clearDescriptionField };