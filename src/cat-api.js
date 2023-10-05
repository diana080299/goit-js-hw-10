import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_JlpgD5LjMPXqnfbdBzuobVXBrTl7X1HSYzZlZGsvu1aANVyPApJiTRp2NpcoLvGo';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
export function fetchBreeds() {
  return axios.get('/breeds').then(response => response.data);
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}
