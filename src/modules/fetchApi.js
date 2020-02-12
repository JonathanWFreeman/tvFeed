import { userTodayDate, userYesterdayDate, userTomorrowDate } from './timeZone';

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

export default fetchShows;
