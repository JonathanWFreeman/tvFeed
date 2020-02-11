import {
  convertToUserTimeZone,
  convert24hrTime,
  getDateOfEpisodes,
} from './timeZone';
import filterShows from './fetchApi';
import { date } from './selectors';
import { state, handleError, generateShowTypeOptions } from './utils';

export function optionsFilter(listOfShows, timeOfShow) {
  return listOfShows.filter(show => {
    const time = parseInt(
      convert24hrTime(convertToUserTimeZone(show.airstamp))
    );

    if (timeOfShow === 'primetime' && time >= 19) {
      return show;
    }
    // if (timeOfShow === 'daytime' && time > 16 && time < 19) {
    if (timeOfShow === 'daytime' && time < 19) {
      return show;
    }
    return null;
  });
}

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

export async function filterDay() {
  if (state.timeOfDay === 'today') {
    if (!state.listOfShowsToday) {
      const list = await filterShows(state.timeOfDay).catch(handleError);
      state.listOfShowsToday = list;
      console.log('supTD');
    }
    generateShowTypeOptions(state.listOfShowsToday);
    state.filteredList = optionsFilter(state.listOfShowsToday, state.showTime);
    date.textContent = getDateOfEpisodes('today');
  }

  if (state.timeOfDay === 'tomorrow') {
    if (!state.listOfShowsTomorrow) {
      const list = await filterShows(state.timeOfDay).catch(handleError);
      state.listOfShowsTomorrow = list;
      console.log('supTM');
    }
    generateShowTypeOptions(state.listOfShowsTomorrow);
    state.filteredList = optionsFilter(
      state.listOfShowsTomorrow,
      state.showTime
    );
    date.textContent = getDateOfEpisodes('tomorrow');
  }
}
