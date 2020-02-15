import { isToday, isTomorrow } from 'date-fns';
import { convertToUserTimeZone, convert24hrTime } from './timeZone';
import fetchShows from './fetchApi';
import { state, handleError } from './utils';

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
let listOfShowsToday;
let listOfShowsTomorrow;
export async function filterDay() {
  if (state.timeOfDay === 'today') {
    if (!listOfShowsToday) {
      const list = await filterShows(state.timeOfDay).catch(handleError);
      listOfShowsToday = list;
    }
    return listOfShowsToday;
  }

  if (state.timeOfDay === 'tomorrow') {
    if (!listOfShowsTomorrow) {
      const list = await filterShows(state.timeOfDay).catch(handleError);
      listOfShowsTomorrow = list;
    }
    return listOfShowsTomorrow;
  }
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
