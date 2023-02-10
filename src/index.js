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

//* //todo 7) Використовуй пакет lodash.debounce.
import debounce from 'lodash.debounce';

//* імпорт функції fetchCountries  // 2) Винеси її в окремий файл fetchCountries.js і зроби іменований експорт
import { fetchCountries } from './fetchCountries';

//* доступ до тегів
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

//* слухач на інпут
//* //todo 4) для пошуку користувач вводить у текстове поле input#search-box
//* //todo 6) застосувати прийом Debounce на обробнику події і робити HTTP-запит через 300мс
input.addEventListener('input', debounce(onLookingForCountry, DEBOUNCE_DELAY));
//*========================
//* приймає данні з інпута //todo 5)  HTTP-запити виконуються при введенні назви країни, тобто на події input
function onLookingForCountry(e) {
  e.preventDefault();

  console.log(input.value);
}

//*====================

fetchCountries()
  .then(countries => {
    console.log(countries);
  })
  .catch(error => {
    error;
  });
//*====================
function createMarkup(arr) {
  const markup = arr.map(
    item => `<li>
  <img src="${flags}" alt="Прапор">
  <h2>${name.official}</h2>
  <p>${capital}</p>
  <p>${population}</p>
  <p>${languages}</p>
  </li>`
  );

  countryInfo.innerHTML = markup.join('');
}

//*====================
// const o = fetch('https://restcountries.com/v3.1/name/${input.value}');
// console.log(o);

// fetch(
//   'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages'
// )
//   .then(response => {
//     // console.log(response.json());
//     return response.json();
//   })
//   .then(cantry => {
//     console.log(cantry);
//   })
//   .catch(error => {
//     console.log(error);
//   });

//! ВІДПОВІДЬ ФІЛЬТРА
// Ви можете відфільтрувати вихідні дані свого запиту, щоб включити лише вказані поля.
// https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=name,capital,currencies

// fetch('https://restcountries.com/v3.1/name/Canada')
//   .then(res => res.json())
//   .then(data => {
//     const { flag, capital, population, languages } = data[0];
// console.log(data[0]);
// console.log(flag);
// console.log(capital[0]);
// console.log(population);
// console.log(languages);
// console.log(Object.values(languages).join('', ''));
//   });

// {
/* <div class="card">
<p class=""country_name"">
        <span class=""country_flag""></span> 
    </p>
    <p class=""country_capital"">Capital:</p>
    <p class=""country_population"">Population:</p>
    <p class=""country_languages"">Languages:</p>
</div>" */
// }
