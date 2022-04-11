import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', formSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

function formSubmit(e) {
  e.preventDefault();
  console.log(e.currentTarget.elements.amount.value);
  const amount = Number(e.currentTarget.elements.amount.value);
  const firstDelay = Number(e.currentTarget.elements.delay.value);
  const stepDelay = Number(e.currentTarget.elements.step.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, firstDelay + (i - 1) * stepDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
  formEl.reset();
}
