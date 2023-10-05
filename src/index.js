
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';


const refs = {
  selector: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loading: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.loading.classList.add('is-hidden');
refs.error.classList.add('is-hidden')



fetchBreeds().then(response => 
    { const selectedBreed = response.map(obj => ({text: obj.name, value: obj.id}))

selectedBreed.forEach(optionData => {
    const option = document.createElement('option')
    option.value = optionData.value;
    option.text = optionData.text;
    refs.selector.appendChild(option);
})}).catch(error => { 
    responseError();
});


refs.selector.addEventListener('change', onChangeBreed)

function onChangeBreed(event) {
    refs.loading.classList.remove('is-hidden');
    refs.selector.classList.add('is-hidden');
    refs.catInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;

    fetchCatByBreed(breedId).then( data => {
        refs.loading.classList.add('is-hidden');
        refs.selector.classList.remove('is-hidden')

        const {url, breeds} = data[0];

refs.catInfo.innerHTML = `
<div class="box-img">
<img src="${url}" alt="${breeds[0].name}" width="400"/>
</div>
<div class="box">
<h1 class="tittle">${breeds[0].name}</h1>
<p class="subtitle">${breeds[0].description}</p>
<p class="breed"><b>Temperament:</b> ${breeds[0].temperament}</p>
</div>`
new SlimSelect({
    select: '#single',
  });

refs.catInfo.classList.remove('is-hidden');

    }).catch(error => 
        responseError(error)); 
}

function responseError() {
    refs.selector.classList.add('is-hidden');
    refs.error.classList.remove('is-hidden'); Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    }
    