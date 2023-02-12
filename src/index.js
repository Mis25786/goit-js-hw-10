//todo 1) напиши функцію fetchCountries(name), яка робить HTTP-запит
//todo на ресурс name і повертає проміс з масивом країн
// Використовуй публічний API Rest Countries v2, а саме ресурс name, який повертає масив об'єктів країн
// яка робить HTTP-запит на ресурс name і повертає проміс з масивом країн
//todo 2) Винеси її в окремий файл fetchCountries.js і зроби іменований експорт
//todo 3) скоротити обсяг переданих даних, додай рядок параметрів запиту
//* потрібні тільки наступні властивості:
//* name.official - повна назва країни
//* capital - столиця
//* population - населення
//* flags.svg - посилання на зображення прапора
//* languages - масив мов
//todo 4) для пошуку користувач вводить у текстове поле input#search-box
//todo 5)  HTTP-запити виконуються при введенні назви країни, тобто на події input
//todo 6) застосувати прийом Debounce на обробнику події і робити HTTP-запит через 300мс
//todo 7) Використовуй пакет lodash.debounce.
//todo 8) Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується,
//todo а розмітка списку країн або інформації про країну зникає

//todo 9) Виконай санітизацію введеного рядка методом trim()
//todo 10) Якщо у відповіді бекенд повернув більше ніж 10 країн,
//todo в інтерфейсі з'являється повідомлення про те, що назва повинна бути специфічнішою.

//todo 11) Для повідомлень використовуй бібліотеку notiflix і виводь такий рядок
// "Too many matches found. Please enter a more specific name."
//todo 12) Якщо бекенд повернув від 2-х до 10-и країн, під тестовим полем відображається список знайдених країн.
// Кожен елемент списку складається з прапора та назви країни.
//todo 13) Якщо результат запиту - це масив з однією країною, в інтерфейсі відображається розмітка картки з даними про країну:
// прапор, назва, столиця, населення і мови.
//todo 14) Якщо користувач ввів назву країни, якої не існує, бекенд поверне не порожній масив, а помилку
// овідомлення "Oops, there is no country with that name"
// використовуючи бібліотеку notiflix
//! fetch не вважає 404 помилкою, тому необхідно явно відхилити проміс, щоб можна було зловити і обробити помилку.
//todo 15) Додай мінімальне оформлення елементів інтерфейсу

//?========================================================================
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

//* //todo 14) Якщо користувач ввів назву країни, якої не існує, бекенд поверне не порожній масив, а помилку
// овідомлення "Oops, there is no country with that name"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//* //todo 7) Використовуй пакет lodash.debounce.
import debounce from 'lodash.debounce';

//* імпорт функції fetchCountries  // 2) Винеси її в окремий файл fetchCountries.js і зроби іменований експорт
import { fetchCountries } from './fetchCountries';
// console.log(fetchCountries);

//*===================== доступ до тегів =========================================
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// console.log(input);
// console.log(countryList);
// console.log(countryInfo);
//*===================== слухач на інпут =========================================
input.addEventListener('input', debounce(onLookingForCountry, DEBOUNCE_DELAY));
//*========================
fetchCountries().then(res => console.log(res));

//*====================================
function onLookingForCountry(e) {
  //* отримуємо данні з інпута
  let inputValue = e.target.value.trim();
  console.log(inputValue);

  //* початково задаємо порожні рядки на розмітку
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (inputValue.length === 0) return onFetchError;

  fetchCountries(inputValue)
    .then(countri => console.log(countri))
    .catch(error => onFetchError(error));
  // .catch(onFetchError);
}
//*================= логіка присвоєння розмітки ======================
function markupSelectionCountries(data) {
  if (data.length === 1) {
    return createMarkupCountries();
  } else if (data.length > 1 && data.length >= 10) {
    return createMarkupCountriInfo();
  }
  return onFetchError();
}

//*================= виводимо помилки ================================
function onFetchInfo(error) {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}

//*==================== розмітка для одної або 10 країн ==============
function createMarkupCountriInfo(arr) {
  const markup = arr
    .map(({ name, flags, capital, population, languages, fifa }) => {
      // console.log(el);
      return `<li>
      <h2>Name: ${name.official}</h2>
    <img src="${flags.svg}" alt="" width="70" heigth="50">
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages).join('', '')}</p>
    </li>`;
    })
    .join('');

  countryInfo.innerHTML = markup;
}

function createMarkupCountries(arr) {
  const markup = arr
    .map(({ name, flags, capital, population, languages, fifa }) => {
      // console.log(el);
      return `<li>
      <h2>Name: ${name.official}</h2>
    <img src="${flags.svg}" alt="" width="70" heigth="50">
    </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

//*====================
// const URL = 'https://restcountries.com/v3.1/name/canada';
// // const OPTIONS = {
// //   headers: {
// //     // option: '?fields=name,flags,capital,population,languages',
// //     // option: '?fields=name',
// //     // name: 'name',
// //   },
// // };

// //* повертаэ проміс і передаємо далі для обробки
// fetch(URL)
//   .then(res => res.json())
//   .then(data => console.log(data))
//*=================================================
