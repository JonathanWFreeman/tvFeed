import filterTodayShows from './src/modules/fetchApi';
import { currentDate } from './src/modules/timeZone';
import {
  generateShowTypeOptions,
  handleError,
  sortedByAirtime,
} from './src/modules/utils';
import { generateShowContainer } from './src/modules/showGenerators';
import {
  app,
  date,
  optionsForm,
  menuToggle,
  nav,
  filters,
} from './src/modules/selectors';
import optionsFilter from './src/modules/filters';
import { handleToggle, handleNavClick } from './src/modules/handlers';

let listOfShowsToday;
let listOfShowsTomorrow;
let filteredList;

async function generateShowList(
  type = null,
  timeOfShow = 'primetime',
  filterDate = 'today'
) {
  // create a show list array from fetchApi
  if (filterDate === 'today') {
    if (!listOfShowsToday) {
      const list = await filterTodayShows(filterDate).catch(handleError);
      listOfShowsToday = list;
    }
    generateShowTypeOptions(listOfShowsToday);
    filteredList = optionsFilter(listOfShowsToday, timeOfShow);
  }

  if (filterDate === 'tomorrow') {
    if (!listOfShowsTomorrow) {
      const list = await filterTodayShows(filterDate).catch(handleError);
      listOfShowsTomorrow = list;
    }
    generateShowTypeOptions(listOfShowsTomorrow);
    filteredList = optionsFilter(listOfShowsTomorrow, timeOfShow);
  }

  const generateHTML = Object.entries(sortedByAirtime(filteredList))
    .map(generateShowContainer)
    .join('');

  app.innerHTML = generateHTML;
}

// find video for making state in javascript
let timeOfDay;
let showType;
let showTime;
function handleFilters(e) {
  console.log(e);

  if (e.target.dataset.day) {
    console.dir(e.currentTarget);
    const navUl = Array.from(e.currentTarget.children[0].children);
    navUl.forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
    timeOfDay = e.target.dataset.day;
  }

  if (e.target.type === 'checkbox') {
    console.log('checkbox');
  }

  if (e.target.type === 'radio') {
    showType = null;
    showTime;
    // filter through array of checked

    showTime = e.target.value;
  }
  console.log({ showType });
  console.log({ showTime });
  console.log({ timeOfDay });
  generateShowList(showType, showTime, timeOfDay);
}

// optionsForm.addEventListener('input', handleFormInput);
menuToggle.addEventListener('click', handleToggle);
filters.addEventListener('click', handleFilters);

date.textContent = currentDate;

generateShowList();
