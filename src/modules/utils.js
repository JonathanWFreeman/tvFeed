import { showTypeSelector } from './selectors';
import { convertToUserTimeZone, convert12hrTime } from './timeZone';

export function generateShowTypeOptions(list) {
  const getShowTypes = list.map(({ show }) => show.type);
  const removeShowTypeDuplicates = [...new Set(getShowTypes)];
  removeShowTypeDuplicates.unshift('All');
  const showTypeOptions = removeShowTypeDuplicates
    .map(show => `<option value="${show}">${show}</option>`)
    .join('');
  showTypeSelector.innerHTML = showTypeOptions;
}

// export const generateShowContainer = show => {
//   const image = 'https://i.picsum.photos/id/229/200/200.jpg';
//   return `
//   <div class="show">
//   <img src="${show.show.image ? show.show.image.medium : image}"/>
//   <p>${convert12hrTime(show.airstamp)}</p>
//   </div>
// `};

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

export function generateShowContainer([airTime, tvShow]) {
  const image = 'https://i.picsum.photos/id/229/200/200.jpg';

  // console.log(airTime);
  // console.log(tvShow);

  return `<div class="container">
            <h2>${airTime}</h2>
            <div class="show-grid-container">
              ${tvShow
                .map(
                  show => `
                  <div class="show-container">
                    <h3 class="show-network">${show.show.network.name}</h3>
                    <div class="show-info">
                      <img src="${
                        show.show.image ? show.show.image.medium : image
                      }"/>
                      <div class="show-desc">
                        <h4>${show.show.name}</h4>
                      </div>
                    </div>
                  </div>
                `
                )
                .join('')}
            </div>
          </div>`;
}