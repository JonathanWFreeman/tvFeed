import filterTodayShows from './src/modules/fetchApi';
import {
  userTodayDate,
  convertToUserTimeZone,
  convert24hrTime,
} from './src/modules/timeZone';
import {
  generateShowTypeOptions,
  handleError,
  generateShowContainer,
  sortedByAirtime,
} from './src/modules/utils';
import { app, date, optionsForm } from './src/modules/selectors';

let listOfShows;

async function generateShowList(type = null) {
  if (!listOfShows) {
    const list = await filterTodayShows().catch(handleError);
    listOfShows = list;
    generateShowTypeOptions(listOfShows);
  }

  // const showHTML = listOfShows
  //   .filter(({show}) => type ? show.type === type : show)
  //   // .filter(({show}) => show.type !== 'News' && show.type !== 'Talk Show')
  //   .map(generateShowContainer)
  //   .join('');

  const filteredList = listOfShows.filter(show => {
    const time = parseInt(
      convert24hrTime(convertToUserTimeZone(show.airstamp))
    );

    if (time >= 19) {
      return show;
    }
    return null;
  });
  console.log(listOfShows);
  console.log(filteredList);

  const showHTML = Object.entries(sortedByAirtime(filteredList))
    .map(generateShowContainer)
    .join('');

  app.innerHTML = showHTML;
}

function handleInput(e) {
  let showType = e.target.value;
  if (showType === 'All') {
    showType = null;
  }
  generateShowList(showType);
}

optionsForm.addEventListener('input', handleInput);
date.textContent = userTodayDate;

// add git, figure out SSH
// add prettier

// sort cache for times
// idea for rows
// filter foreach reduce? loop through add to new array that separates
// loop through new array

generateShowList();
