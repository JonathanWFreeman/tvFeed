import { header } from './selectors';

let isTrue = false;

export function handleToggle(e) {
  isTrue = !isTrue;

  isTrue
    ? header.classList.add('toggle-open')
    : header.classList.remove('toggle-open');
}

export function handleNavClick(e) {
  const navUl = Array.from(e.currentTarget.children[0].children);

  navUl.forEach(el => el.classList.remove('active'));
  // e.currentTarget.children[0].children.classList.remove('active');
  e.target.classList.add('active');
}

// import { userTodayDate } from './timeZone';
// import { date, optionsForm } from './selectors';

// function handleInput(e) {
//   console.log(e);
//   console.log(e.target);
//   console.log(e.target.value);

//   let showType = e.target.value;
//   let showTime;

//   if (showType === 'All') {
//     showType = null;
//   }

//   if (e.target.type === 'radio') {
//     showTime = e.target.value;
//   }
//   generateShowList(showType, showTime);
// }

// optionsForm.addEventListener('input', handleInput);
// date.textContent = userTodayDate;
