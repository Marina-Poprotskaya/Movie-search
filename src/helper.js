const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
};

function clearDescriptionField() {
    const container = document.getElementById('container');
    container.innerHTML = '';
}

const descriptionField = document.getElementById('container');
descriptionField.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        clearDescriptionField();
    }
});

function appendMainSpinner() {
    const spinnerWrapper = document.querySelector('.spinner-wrapper');
    const loadingSlider = createElement('div', 'loading-slider');
    const template = `    
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
                `;
    loadingSlider.innerHTML = template;
    spinnerWrapper.prepend(loadingSlider);
}

function removeMainSpinner() {
    const loadingSlider = document.querySelector('.loading-slider');
    loadingSlider.classList.add('slider-hide');
    if (loadingSlider && loadingSlider.parentNode) {
        loadingSlider.parentNode.removeChild(loadingSlider);
    }
}

function showFormMessage() {
    const fieldForMessage = document.querySelector('.field-for-message');
    fieldForMessage.innerHTML = 'Please enter a movie title';
    fieldForMessage.classList.add('wrong');
    setTimeout(() => {
        fieldForMessage.innerHTML = '';
        fieldForMessage.classList.remove('wrong');
    }, 3000);
}

function showInputSpinner() {
    const spinner = document.querySelector('.spinner');
    spinner.classList.add('show');
}

function hideInputSpinner() {
    const spinner = document.querySelector('.spinner');
    spinner.classList.remove('show');
}

export {
    createElement, appendMainSpinner, removeMainSpinner, clearDescriptionField,
    showFormMessage, showInputSpinner, hideInputSpinner,
};
