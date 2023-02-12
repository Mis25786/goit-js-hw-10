// import { onFetchError } from './index';

//*========== виносиммо в змінні данні юрл і фільтра ====================
const URL = `https://restcountries.com/v3.1/name/`;
const OPTIONS = 'name,capital,population,flags,languages';
// const OPTIONS = {
//   headers: {
//     option: 'name,flags,capital,population,languages',
//   },
// };

//*=========== повертає проміс і передаємо далі для обробки =============
export function fetchCountries(name) {
  return fetch(`${URL}/${name}?fields=${OPTIONS}`).then(res => {
    if (!res.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return res.json();
    // console.log(res.json());
  });
}

// export { fetchCountries };
