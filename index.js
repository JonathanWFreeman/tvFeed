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
      generateShowTypeOptions(listOfShowsToday);
    }
    filteredList = optionsFilter(listOfShowsToday, timeOfShow);
  }

  if (filterDate === 'tomorrow') {
    if (!listOfShowsTomorrow) {
      const list = await filterTodayShows(filterDate).catch(handleError);
      listOfShowsTomorrow = list;
      generateShowTypeOptions(listOfShowsTomorrow);
    }
    filteredList = optionsFilter(listOfShowsTomorrow, timeOfShow);
  }

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

export function handleNavClick2(e) {
  console.dir(e.target.dataset.day);
  console.dir(e.currentTarget.children[0].children);
  const navUl = Array.from(e.currentTarget.children[0].children);

  console.dir(navUl);
  navUl.forEach(el => el.classList.remove('active'));
  // e.currentTarget.children[0].children.classList.remove('active');
  e.target.classList.add('active');

  generateShowList(undefined, undefined, e.target.dataset.day);
}

optionsForm.addEventListener('input', handleFormInput);
menuToggle.addEventListener('click', handleToggle);
nav.addEventListener('click', handleNavClick2);

date.textContent = currentDate;

generateShowList();
