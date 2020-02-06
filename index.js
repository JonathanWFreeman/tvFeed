import filterTodayShows from './src/modules/fetchApi';
import { currentDate } from './src/modules/timeZone';
import {
  generateShowTypeOptions,
  handleError,
  generateShowContainer,
  sortedByAirtime,
} from './src/modules/utils';
import {
  app,
  date,
  optionsForm,
  menuToggle,
  nav,
} from './src/modules/selectors';
import optionsFilter from './src/modules/filters';
import { handleToggle, handleNavClick } from './src/modules/handlers';

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

optionsForm.addEventListener('input', handleFormInput);
menuToggle.addEventListener('click', handleToggle);
nav.addEventListener('click', handleNavClick);

date.textContent = currentDate;

generateShowList();
