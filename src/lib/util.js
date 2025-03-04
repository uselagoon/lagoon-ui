import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import * as R from 'ramda';

export const queryStringToObject = R.pipe(
  R.defaultTo(''),
  R.replace(/^\?/, ''),
  R.split('&'),
  R.map(R.split('=')),
  R.fromPairs
);

export const makeSafe = string => string.toLocaleLowerCase().replace(/[^0-9a-z-]/g, '-');

export const debounce = (fn, delay) => {
  let timeoutId;

  return function (val) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.call(null, val);
    }, delay);
  };
};

export const getProcessDuration = process => {
  const processStart = process.started || process.created;
  const durationStart = (processStart && moment.utc(processStart)) || moment.utc();
  const durationEnd = (process.completed && moment.utc(process.completed)) || moment.utc();
  const duration = moment.duration(durationEnd - durationStart).format('HH[hr] mm[m] ss[sec]');

  return duration;
};
