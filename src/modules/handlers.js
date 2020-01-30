import { userTodayDate } from './timeZone';
import { date, optionsForm } from './selectors';

function handleInput(e) {
  console.log(e);
  console.log(e.target);
  console.log(e.target.value);

  let showType = e.target.value;
  let showTime;

  if (showType === 'All') {
    showType = null;
  }

  if (e.target.type === 'radio') {
    showTime = e.target.value;
  }
  generateShowList(showType, showTime);
}

optionsForm.addEventListener('input', handleInput);
date.textContent = userTodayDate;
