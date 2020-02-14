import { header, menuToggle } from './selectors';

// let isTrue = false;

export function handleToggle() {
  // isTrue = !isTrue;

  // isTrue
  //   ? header.classList.add('toggle-open')
  //   : header.classList.remove('toggle-open');

  header.classList.toggle('toggle-open');
  menuToggle.classList.toggle('animate');
  header.classList.toggle('toggle-closed');
}

export function handleNavClick(e) {
  const navUl = Array.from(e.currentTarget.children[0].children);

  navUl.forEach(el => el.classList.remove('active'));
  // e.currentTarget.children[0].children.classList.remove('active');
  e.target.classList.add('active');
}
