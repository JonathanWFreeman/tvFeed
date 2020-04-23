import { showTypeSelector, loaderEl } from './selectors';
import { convertToUserTimeZone, convert12hrTime } from './timeZone';
import { loaderSvg, imdbSvg } from './svgs';

export function removeDuplicates(list) {
  const getShowTypes = list.map(({ show }) => show.type);
  const removeShowTypeDuplicates = [...new Set(getShowTypes)];
  return removeShowTypeDuplicates;
}

export function createCategoryList(list) {
  const showTypeOptions = removeDuplicates(list)
    .map(
      show => `
      <label class="customCheckbox checkboxSelected" for="${show}">
        <input type="checkbox" id="${show}" name="${show}" value="${show}" checked>
        <label for="${show}"></label>
        <span class="show-category">${show}</span>
      </label>
      `
    )
    .join('');
  showTypeSelector.innerHTML = showTypeOptions;
}

export function handleError(err) {
  console.log('Uh oh! Error!');
  console.log(err);
}

export function sortedByAirtime(listOfShows) {
  return listOfShows.reduce((sortedList, currentShow) => {
    const { airstamp } = currentShow;
    const newAirtime = convert12hrTime(convertToUserTimeZone(airstamp));

    sortedList[newAirtime]
      ? (sortedList[newAirtime] = [...sortedList[newAirtime], currentShow])
      : (sortedList[newAirtime] = [currentShow]);
    return sortedList;
  }, []);
}

export function checkExternalLink(show) {
  if (show.show.externals.imdb) {
    return `<span class="show-imdb"><a href="https://www.imdb.com/title/${
      show.show.externals.imdb
    }/" target="_blank">${imdbSvg}</a></span>`;
  }
  return `<span class="show-imdb"><a href="https://www.imdb.com/find?q=${
    show.show.name
  }" target="_blank">${imdbSvg}</a></span>`;
}

export function loader() {
  loaderEl.classList.toggle('loader');
  loaderEl.classList.contains('loader')
    ? (loaderEl.innerHTML = loaderSvg)
    : (loaderEl.innerHTML = '');
}

export const state = {
  showCategories: [],
  timeOfDay: 'today',
};
