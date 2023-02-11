const URL = 'https://restcountries.com/v3.1/name/Canada';
const OPTIONS = {
  headers: {
    option: '?fields=name,flags,capital,population,languages',
    // option: '?fields=name',
  },
};

//* повертаэ проміс і передаємо далі для обробки
export function fetchCountries() {
  return fetch(URL, OPTIONS)
    .then(res => {
      // console.log(res);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
      // console.log(res.json());
    })
    .catch(error => console.log(error));
  // .then(data => console.log(data))
}
