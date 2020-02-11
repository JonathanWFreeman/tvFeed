import { isToday, isTomorrow } from 'date-fns';
import {
  userTodayDate,
  userYesterdayDate,
  userTomorrowDate,
  convertToUserTimeZone,
} from './timeZone';
import { generateShowTypeOptions, handleError } from './utils';

const endpoint = 'https://api.tvmaze.com/schedule?country=US&date=';
let listOfShows;

async function fetchShows() {
  let showList = [];

  const yesterdayRes = await fetch(`${endpoint}${userYesterdayDate}`);
  const yesterdayData = await yesterdayRes.json();

  const todayRes = await fetch(`${endpoint}${userTodayDate}`);
  const todayData = await todayRes.json();

  const tomorrowRes = await fetch(`${endpoint}${userTomorrowDate}`);
  const tomorrowData = await tomorrowRes.json();

  showList = [...yesterdayData, ...todayData, ...tomorrowData];

  return showList;
}

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

// async function showListForToday() {
//   if (!listOfShows) {
//     listOfShows = await filterTodayShows().catch(handleError);
//     generateShowTypeOptions(listOfShows);
//   }
//   return listOfShows;
// }

export default filterShows;
