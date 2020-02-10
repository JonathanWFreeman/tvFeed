import { convertToUserTimeZone, convert24hrTime } from './timeZone';

function optionsFilter(listOfShows, timeOfShow) {
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

// const showHTML = listOfShows
//   .filter(({show}) => type ? show.type === type : show)
//   // .filter(({show}) => show.type !== 'News' && show.type !== 'Talk Show')
//   .map(generateShowContainer)
//   .join('');

export default optionsFilter;
