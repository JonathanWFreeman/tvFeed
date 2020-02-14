import { getDateOfEpisodes } from './src/modules/timeZone';
import { state, removeDuplicates } from './src/modules/utils';
import { filterDay } from './src/modules/filters';
import { generateShowList } from './src/modules/showGenerators';
import { date, menuToggle, filters, app } from './src/modules/selectors';
import { handleToggle, handleFilters } from './src/modules/handlers';

async function onLoad() {
  state.showCategories = removeDuplicates(await filterDay());
  await generateShowList();
  date.textContent = getDateOfEpisodes('today');
  app.classList.remove('fill-height');
}

onLoad();

menuToggle.addEventListener('click', handleToggle);
filters.addEventListener('click', handleFilters);
