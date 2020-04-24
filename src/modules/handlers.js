import { header, menuToggle, showTypeSelector } from './selectors';
import { state } from './utils';
import { filterDay } from './filters';
import { generateShowList } from './showGenerators';

export function handleToggle() {
  header.classList.toggle('toggle-open');
  menuToggle.classList.toggle('animate');
  header.classList.toggle('toggle-closed');
}

export function handleNavClick(e) {
  const navUl = Array.from(e.currentTarget.children[0].children);

  navUl.forEach(el => el.classList.remove('active'));

  e.target.classList.add('active');
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

let showTime;
export async function handleFilters(e) {
  // Today Tomorrow
  if (e.target.dataset.day) {
    const navUl = Array.from(e.currentTarget.children[0].children);
    navUl.forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
    state.timeOfDay = e.target.dataset.day;
    scrollTop();
    await filterDay();
  }
  // Checkboxes
  if (e.target.parentElement.classList.contains('customCheckbox')) {
    const showTypeChildren = Array.from(showTypeSelector.children);
    const checkboxLabel = e.target.parentElement;

    state.showCategories = [];
    checkboxLabel.classList.toggle('checkboxSelected');
    showTypeChildren.forEach(child => {
      if (child.firstElementChild.checked) {
        state.showCategories = [
          ...state.showCategories,
          child.firstElementChild.value,
        ];
      }
    });
  }
  // Primetime Daytime
  if (e.target.matches('input[type="radio"]')) {
    scrollTop();
    showTime = e.target.value;
  }
  generateShowList(showTime);
}
