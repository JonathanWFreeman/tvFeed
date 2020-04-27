import {
  checkExternalLink,
  state,
  sortedByAirtime,
  createCategoryList,
  removeDuplicates,
} from './utils';
import { starSvg } from './svgs';
import { showTypeFilter, timeOfDayFilter, filterDay } from './filters';
import { app, date } from './selectors';
import { getDateOfEpisodes } from './timeZone';

let currentDay;
export async function generateShowList(showTime = 'primetime') {
  if (state.timeOfDay !== currentDay) {
    createCategoryList(await filterDay());
    state.showCategories = removeDuplicates(await filterDay());
  }

  currentDay = state.timeOfDay;

  // filters show based on time of day
  const filteredTimeOfDayList = timeOfDayFilter(await filterDay(), showTime);

  // filters shows based on show category type
  const filteredCategory = showTypeFilter(
    filteredTimeOfDayList,
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

  // lazy load images
  loadImage();
}

export function generateShowContainer([airtime, tvShow]) {
  const image =
    'https://res.cloudinary.com/jwfreeman/image/upload/v1587679911/QuickTV/no_image_nwewzw.jpg';

  const base =
    'https://res.cloudinary.com/jwfreeman/image/upload/v1588009596/QuickTV/placeholder_fxoojh.png';

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
                    <div class="image-container" data-large="${
                      show.show.image ? show.show.image.medium : image
                    }">
                    <img class="placeholder" src="${base}">
                  </div>
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

function loadImage() {
  const largePicture = document.querySelectorAll('.image-container');
  // Load large image
  largePicture.forEach(img => {
    const imgLarge = new Image();
    imgLarge.src = img.dataset.large;
    imgLarge.onload = function() {
      imgLarge.classList.add('loaded');
    };
    imgLarge.classList.add('picture');
    img.appendChild(imgLarge);
  });
}
