import filterTodayShows from './src/modules/fetchApi';
import {
  userTodayDate,
  convertToUserTimeZone,
  convert24hrTime,
} from './src/modules/timeZone';
import {
  generateShowTypeOptions,
  handleError,
  generateShowContainer,
  sortedByAirtime,
} from './src/modules/utils';
import { app, date, optionsForm, menuToggle } from './src/modules/selectors';
import optionsFilter from './src/modules/filters';

let listOfShows;

async function generateShowList(type = null, timeOfShow = 'primetime') {
  // create a show list array from fetchApi
  if (!listOfShows) {
    const list = await filterTodayShows().catch(handleError);
    listOfShows = list;
    generateShowTypeOptions(listOfShows);
  }

  const filteredList = optionsFilter(listOfShows, timeOfShow);

  const generateHTML = Object.entries(sortedByAirtime(filteredList))
    .map(generateShowContainer)
    .join('');

  app.innerHTML = generateHTML;
}

function handleFormInput(e) {
  console.log(e);
  console.log(e.target);
  console.log(e.target.value);

  let showType = e.target.value;
  let showTime;

  if (showType === 'All') {
    showType = null;
  }

  if (e.target.type === 'radio') {
    showTime = e.target.value;
  }
  generateShowList(showType, showTime);
}

const navMenu = document.querySelector('header');

let isTrue = false;
function handleToggle(e) {
  console.log(e);
  console.dir(navMenu);
  isTrue = !isTrue;
  console.log(isTrue);

  isTrue
    ? navMenu.classList.add('toggle-open')
    : navMenu.classList.remove('toggle-open');
}

optionsForm.addEventListener('input', handleFormInput);
menuToggle.addEventListener('click', handleToggle);
date.textContent = userTodayDate;

generateShowList();
