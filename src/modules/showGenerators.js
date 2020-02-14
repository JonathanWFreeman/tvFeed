import { checkExternalLink, starSvg, state, sortedByAirtime } from './utils';
import { showTypeFilter, timeOfDayFilter, filterDay } from './filters';
import { app, date } from './selectors';
import { getDateOfEpisodes } from './timeZone';

export async function generateShowList(showTime = 'primetime') {
  // filters show based on time of day
  const filteredTimeOfDay = timeOfDayFilter(await filterDay(), showTime);

  // filters shows based on show category type
  const filteredCategory = showTypeFilter(
    filteredTimeOfDay,
    state.showCategories
  );

  // filtered list that sorts shows by air time
  const generateHTML = Object.entries(sortedByAirtime(filteredCategory))
    .map(generateShowContainer)
    .join('');

  // sets list to page
  app.innerHTML = generateHTML;

  // sets date to page
  date.textContent = getDateOfEpisodes(state.timeOfDay);
}

export function generateShowContainer([airtime, tvShow]) {
  const image = 'https://i.picsum.photos/id/1025/210/295.jpg';

  return `<div class="container-grid">
            <h2 class="airtime">${airtime}</h2>
            <div class="show-grid-container">
              ${tvShow
                .map(
                  show => `
                  <div class="show-container">
                    <h3 class="show-network">${
                      show.show.network ? show.show.network.name : 'Unavailable'
                    }</h3>
                    <div class="show-info">
                      <img src="${
                        show.show.image ? show.show.image.medium : image
                      }"/>
                      <div class="show-desc">
                        <div class="show-meta">
                        <span class="show-rating">${starSvg}${
                    show.show.rating.average ? show.show.rating.average : '0'
                  }</span>                    
                  ${checkExternalLink(show)}
                        <p>S${show.season}
                        <span>&middot;</span>
                        E${show.number}</p>
                        </div>
                        <h4 class="show-title">${
                          show.show.name ? show.show.name : 'Unavailable'
                        }</h4>
                      </div>
                    </div>
                  </div>
                `
                )
                .join('')}
            </div>
          </div>`;
}
