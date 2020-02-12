import { isToday, isTomorrow } from 'date-fns';
import {
  convertToUserTimeZone,
  convert24hrTime,
  getDateOfEpisodes,
} from './timeZone';
import fetchShows from './fetchApi';
import { date } from './selectors';
import {
  state,
  handleError,
  generateShowTypeOptions as createCategoryList,
} from './utils';

// filter based on primetime or daytime airing
export function timeOfDayFilter(listOfShows, timeOfShow) {
  return listOfShows.filter(show => {
    const time = parseInt(
      convert24hrTime(convertToUserTimeZone(show.airstamp))
    );

    if (timeOfShow === 'primetime' && time >= 19) {
      return show;
    }
    if (timeOfShow === 'daytime' && time < 19) {
      return show;
    }
    return null;
  });
}

// filters shows based on show category type
export function showTypeFilter(listOfShows, showType) {
  return listOfShows.filter(({ show }) => {
    let newList;
    showType.map(type => {
      if (show.type === type) {
        newList = show;
      }
      return null;
    });
    return newList;
  });
}

// filter based on if day is today or tomorrow
export async function filterDay() {
  if (state.timeOfDay === 'today') {
    if (!state.listOfShowsToday) {
      const list = await filterShows(state.timeOfDay).catch(handleError);
      state.listOfShowsToday = list;
    }
    createCategoryList(state.listOfShowsToday);
    state.filteredList = state.listOfShowsToday;
  }

  if (state.timeOfDay === 'tomorrow') {
    if (!state.listOfShowsTomorrow) {
      const list = await filterShows(state.timeOfDay).catch(handleError);
      state.listOfShowsTomorrow = list;
    }
    createCategoryList(state.listOfShowsTomorrow);
    state.filteredList = state.listOfShowsTomorrow;
  }
  date.textContent = getDateOfEpisodes(state.timeOfDay);
}

// returns show list based on airing today or tomorrow
async function filterShows(day) {
  const shows = await fetchShows();
  const filteredShows = shows.filter(show => {
    if (day === 'today') {
      return isToday(convertToUserTimeZone(show.airstamp));
    }
    return isTomorrow(convertToUserTimeZone(show.airstamp));
  });
  return filteredShows;
}
