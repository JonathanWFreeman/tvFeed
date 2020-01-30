import { isToday } from 'date-fns';
import {
  userTodayDate,
  userYesterdayDate,
  userTomorrowDate,
  convertToUserTimeZone,
} from './timeZone';

const endpoint = 'https://api.tvmaze.com/schedule?country=US&date=';

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

async function filterTodayShows() {
  const shows = await fetchShows();
  const filteredShows = shows.filter(show =>
    isToday(convertToUserTimeZone(show.airstamp))
  );
  return filteredShows;
}

export default filterTodayShows;
