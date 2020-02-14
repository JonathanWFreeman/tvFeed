import { userTodayDate, userYesterdayDate, userTomorrowDate } from './timeZone';
import { loader } from './utils';

const endpoint = 'https://api.tvmaze.com/schedule?country=US&date=';

async function fetchShows() {
  loader();
  let showList = [];

  const yesterdayRes = await fetch(`${endpoint}${userYesterdayDate}`);
  const yesterdayData = await yesterdayRes.json();

  const todayRes = await fetch(`${endpoint}${userTodayDate}`);
  const todayData = await todayRes.json();

  const tomorrowRes = await fetch(`${endpoint}${userTomorrowDate}`);
  const tomorrowData = await tomorrowRes.json();

  showList = [...yesterdayData, ...todayData, ...tomorrowData];

  loader();
  return showList;
}

export default fetchShows;
