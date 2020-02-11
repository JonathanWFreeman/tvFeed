import { checkExternalLink, starSvg, state, sortedByAirtime } from './utils';
import { showTypeFilter, filterDay } from './filters';
import { app } from './selectors';

export async function generateShowList() {
  await filterDay();

  const filteredCategory = showTypeFilter(
    state.filteredList,
    state.showCategories
  );

  const generateHTML = Object.entries(sortedByAirtime(filteredCategory))
    .map(generateShowContainer)
    .join('');

  app.innerHTML = generateHTML;
}

export function generateShowContainer([airtime, tvShow]) {
  const image = 'https://i.picsum.photos/id/229/200/200.jpg';

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
                        <span class="middot">&middot;</span>
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
