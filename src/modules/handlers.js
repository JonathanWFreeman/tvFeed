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

let showTime;
export async function handleFilters(e) {
  if (e.target.dataset.day) {
    const navUl = Array.from(e.currentTarget.children[0].children);
    navUl.forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
    state.timeOfDay = e.target.dataset.day;
    await filterDay();
  }
  // console.log(e.target.parentElement);
  if (e.target.parentElement.classList.contains('customCheckbox')) {
    const showTypeChildren = Array.from(showTypeSelector.children);
    const checkboxLabel = e.target.parentElement;

    e.stopPropagation();
    console.log(checkboxLabel);
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

  if (e.target.matches('input[type="radio"]')) {
    showTime = e.target.value;
  }
  generateShowList(showTime);
}
