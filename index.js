import { getDateOfEpisodes } from './src/modules/timeZone';
import { state, removeDuplicates } from './src/modules/utils';
import { filterDay } from './src/modules/filters';
import { generateShowList } from './src/modules/showGenerators';
import {
  date,
  menuToggle,
  filters,
  showTypeSelector,
} from './src/modules/selectors';
import { handleToggle } from './src/modules/handlers';

async function handleFilters(e) {
  console.log(e.target);

  if (e.target.dataset.day) {
    const navUl = Array.from(e.currentTarget.children[0].children);
    navUl.forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
    state.timeOfDay = e.target.dataset.day;
    await filterDay();
  }

  if (e.target.matches('input[type="checkbox"]')) {
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

  if (e.target.matches('input[type="radio"]')) {
    state.showTime = e.target.value;
  }
  generateShowList();
}

menuToggle.addEventListener('click', handleToggle);
filters.addEventListener('click', handleFilters);

async function onLoad() {
  await filterDay();
  state.showCategories = removeDuplicates(state.listOfShowsToday);
  await generateShowList();
  console.log(state.showCategories);
  date.textContent = getDateOfEpisodes('today');
}
onLoad();
