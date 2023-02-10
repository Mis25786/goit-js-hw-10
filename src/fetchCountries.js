const URL = 'https://restcountries.com/v3.1/all';
const OPTIONS = {
  headers: {
    option: '?fields=name,flags,capital,population,languages',
  },
};

//* повертаэ проміс і передаємо далі для обробки
export function fetchCountries() {
  return fetch(URL, OPTIONS).then(response => response.json());
}
