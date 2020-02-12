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
