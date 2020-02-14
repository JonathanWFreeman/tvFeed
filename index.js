import { getDateOfEpisodes } from './src/modules/timeZone';
import { state, removeDuplicates } from './src/modules/utils';
import { filterDay } from './src/modules/filters';
import { generateShowList } from './src/modules/showGenerators';
import { date, menuToggle, filters } from './src/modules/selectors';
import { handleToggle, handleFilters } from './src/modules/handlers';

async function onLoad() {
  await filterDay();
  state.showCategories = removeDuplicates(state.listOfShowsToday);
  await generateShowList();
  date.textContent = getDateOfEpisodes('today');
}

onLoad();

menuToggle.addEventListener('click', handleToggle);
filters.addEventListener('click', handleFilters);
