import filterTodayShows from './src/modules/fetchApi';
import { currentDate } from './src/modules/timeZone';
import {
  generateShowTypeOptions,
  handleError,
  sortedByAirtime,
  state,
  removeDuplicates,
} from './src/modules/utils';
import { generateShowContainer } from './src/modules/showGenerators';
import {
  app,
  date,
  optionsForm,
  menuToggle,
  nav,
  filters,
  showTypeSelector,
} from './src/modules/selectors';
import optionsFilter, { showTypeFilter } from './src/modules/filters';
import { handleToggle, handleNavClick } from './src/modules/handlers';

let listOfShowsToday;
let listOfShowsTomorrow;
let filteredList;

async function generateShowList() {
  // create a show list array from fetchApi
  if (state.timeOfDay === 'today') {
    if (!listOfShowsToday) {
      const list = await filterTodayShows(state.timeOfDay).catch(handleError);
      listOfShowsToday = list;
    }
    generateShowTypeOptions(listOfShowsToday);
    filteredList = optionsFilter(listOfShowsToday, state.showTime);
  }

  if (state.timeOfDay === 'tomorrow') {
    if (!listOfShowsTomorrow) {
      const list = await filterTodayShows(state.timeOfDay).catch(handleError);
      listOfShowsTomorrow = list;
    }
    generateShowTypeOptions(listOfShowsTomorrow);
    filteredList = optionsFilter(listOfShowsTomorrow, state.showTime);
  }
  const test = ['Reality', 'News', 'Award Show'];
  const filteredCategory = showTypeFilter(filteredList, state.showCategories);

  const generateHTML = Object.entries(sortedByAirtime(filteredCategory))
    .map(generateShowContainer)
    .join('');

  app.innerHTML = generateHTML;
}

function handleFilters(e) {
  console.log(e);

  if (e.target.dataset.day) {
    const navUl = Array.from(e.currentTarget.children[0].children);
    navUl.forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
    state.timeOfDay = e.target.dataset.day;
  }

  if (e.target.type === 'checkbox') {
    const showTypeChildren = Array.from(showTypeSelector.children);
    state.showCategories = [];

    showTypeChildren.forEach(child => {
      if (child.firstElementChild.checked) {
        console.log(child.firstElementChild.value);
        state.showCategories = [
          ...state.showCategories,
          child.firstElementChild.value,
        ];
      }
    });
    console.log(state.showCategories);
  }

  if (e.target.type === 'radio') {
    state.showTime = e.target.value;
  }
  generateShowList();
}

// optionsForm.addEventListener('input', handleFormInput);
menuToggle.addEventListener('click', handleToggle);
filters.addEventListener('click', handleFilters);

date.textContent = currentDate;

async function bleh() {
  await generateShowList();
  state.showCategories = removeDuplicates(listOfShowsToday);
  console.log(state.showCategories);
}
bleh();
