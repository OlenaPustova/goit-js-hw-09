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

let timeinterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDatesMs = Date.parse(selectedDates[0]);

    let timeToDateMs = selectedDatesMs - Date.now();

    if (Date.now() < selectedDatesMs) {
      buttonStartEl.disabled = false;
      buttonStartEl.addEventListener('click', () => {
        inputEl.disabled = true;
        buttonStartEl.disabled = true;
        timeinterval = setInterval(() => {
          let timeToDate = convertMs(timeToDateMs);
          daysFieldEl.innerHTML = timeToDate.days;
          hoursFieldEl.innerHTML = timeToDate.hours;
          minutesFieldEl.innerHTML = timeToDate.minutes;
          secondsFieldEl.innerHTML = timeToDate.seconds;
          timeToDateMs -= 1000;
          if (timeToDateMs <= 0) {
            clearInterval(timeinterval);
            inputEl.disabled = false;
            buttonStartEl.disabled = false;
          }
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

flatpickr(inputEl, options);

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
