import { utcToZonedTime, format } from 'date-fns-tz';
import { startOfYesterday, startOfTomorrow } from 'date-fns';

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// const userTimeZone = 'America/New_York'
const now = new Date();

// const testAirstamp = "2020-01-13T02:00:00+00:00";

// const showTime = format(showFullTime, 'HH:mm');
// export const showDate = format(showFullTime, 'yyyy-MM-dd');

export function convertToUserTimeZone(airstamp) {
  const showConvertedAirstamp = utcToZonedTime(airstamp, userTimeZone);
  return showConvertedAirstamp;
}

export function convert12hrTime(airstamp) {
  const showFullTime = convertToUserTimeZone(airstamp);
  const showConvertedTime = format(showFullTime, 'h:mm a');
  return showConvertedTime;
}

export function convert24hrTime(airstamp) {
  const showFullTime = convertToUserTimeZone(airstamp);
  const showConvertedTime = format(showFullTime, 'HH:mm');
  return showConvertedTime;
}

export const userYesterdayDate = format(startOfYesterday(), 'yyyy-MM-dd');
export const userTodayDate = format(now, 'yyyy-MM-dd');
export const userTomorrowDate = format(startOfTomorrow(), 'yyyy-MM-dd');
export const currentDate = format(now, 'iiii, LLLL do, yyyy');
// export const userDate = '2020-01-12';
