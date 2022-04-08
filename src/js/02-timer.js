// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

// const inputEl = document.querySelector('#datetime-picker');
// const buttonStartEl = document.querySelector('button[data-start]');

// const daysFieldEl = document.querySelector('span[data-days]');
// const hoursFieldEl = document.querySelector('span[data-hours]');
// const minutesFieldEl = document.querySelector('span[data-minutes]');
// const secondsFieldEl = document.querySelector('span[data-seconds]');

// console.log(daysFieldEl.innerHTML);

// buttonStartEl.addEventListener('click', startTimer);

// buttonStartEl.disabled = true;

// const options = {
// enableTime: true,
// time_24hr: true,
// defaultDate: new Date(),
// minuteIncrement: 1,
// onClose(selectedDates) {
// const selectedDatesMs = selectedDates[0].getTime();
// const dateNow = Date.now();
// console.log(selectedDates[0]);
// console.log(selectedDates[0].getTime());

// updateClock(selectedDatesMs, dateNow);
// console.log(selectedDatesMs);
// console.log(dateNow);
// let timeToDateMs = selectedDatesMs - dateNow;
// const timeToDate = convertMs(timeToDateMs);
// console.log(timeToDateMs);
// console.log(timeToDate);

// if (dateNow < selectedDatesMs) {
// buttonStartEl.disabled = false;

// console.log(timeToDate);
// daysFieldEl.innerHTML = timeToDate.days;
// hoursFieldEl.innerHTML = timeToDate.hours;
// minutesFieldEl.innerHTML = timeToDate.minutes;
// secondsFieldEl.innerHTML = timeToDate.seconds;
// startTimer(timeToDateMs);

// console.log(timeToDate.days);
// } else {
// buttonStartEl.disabled = true;
// Notiflix.Notify.failure('Please choose a date in the future', {
// timeout: 2000,
// });
// }
// },
// };

// if (t.total <= 0) {
//   clearInterval(timeinterval);
// }

// function updateClock(selectedDatesMs, dateNow) {
//   if (selectedDatesMs > dateNow) {
//     selectedDatesMs -= 1000;
//   }
// }

// function startTimer(timeToDateMs) {
//   console.log(timeToDateMs);

//   setInterval(() => {
//     timeToDateMs -= 1000;
//     console.log(timeToDateMs);
//   }, 1000);
// }

// console.log(options);

// flatpickr(inputEl, options);

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = pad(Math.floor(ms / day));
//   // Remaining hours
//   const hours = pad(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = pad(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }

// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24313140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// -----------------------------------------------

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('button[data-start]');

const daysFieldEl = document.querySelector('span[data-days]');
const hoursFieldEl = document.querySelector('span[data-hours]');
const minutesFieldEl = document.querySelector('span[data-minutes]');
const secondsFieldEl = document.querySelector('span[data-seconds]');

buttonStartEl.disabled = true;

// let dateNow = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    // console.log(options.defaultDate);
    // console.log(dateNowMs);
    // console.log(selectedDatesMs);

    const dateNowMs = Date.parse(options.defaultDate);
    const selectedDatesMs = Date.parse(selectedDates[0]);

    let timeToDateMs = selectedDatesMs - dateNowMs;
    // const timeToDate = convertMs(timeToDateMs);
    // console.log(timeToDate);

    if (dateNowMs < selectedDatesMs) {
      buttonStartEl.disabled = false;
      // daysFieldEl.innerHTML = timeToDate.days;
      // hoursFieldEl.innerHTML = timeToDate.hours;
      // minutesFieldEl.innerHTML = timeToDate.minutes;
      // secondsFieldEl.innerHTML = timeToDate.seconds;
      buttonStartEl.addEventListener('click', () => {
        let timeinterval = setInterval(() => {
          if (dateNowMs === selectedDatesMs) {
            clearInterval(timeinterval);
          }
          let timeToDate = convertMs(timeToDateMs);
          daysFieldEl.innerHTML = timeToDate.days;
          hoursFieldEl.innerHTML = timeToDate.hours;
          minutesFieldEl.innerHTML = timeToDate.minutes;
          secondsFieldEl.innerHTML = timeToDate.seconds;
          timeToDateMs -= 1000;
          // console.log(timeToDateMs);
        }, 1000);
      });
    } else {
      buttonStartEl.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 2000,
      });
    }
  },
};

// function startTimer(e) {
// console.log(timeToDateMs);

// setInterval(() => {
// console.log(options.defaultDate);
// timeToDateMs -= 1000;
// console.log(timeToDateMs);
// }, 1000);
// }

flatpickr(inputEl, options);
// console.log(options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
