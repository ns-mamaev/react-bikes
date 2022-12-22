export const debounce = (func, timeout) => {
  let lastCall;
  let timer;
  return function (...args) {
    let previousCall = lastCall;
    lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= timeout) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func(...args), timeout);
  };
};
