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

export const stringifyQuery = (params) => {
  return Object.entries(params)
    .reduce((res, [param, value]) => {
      if (value === '') {
        return res;
      }
      return (res += `${param}=${value}&`);
    }, '?')
    .slice(0, -1);
};

export const parseQuery = (searchString) => {
  return searchString
    .substring(1)
    .split('&')
    .reduce((res, paramString) => {
      const [param, value] = paramString.split('=');
      res[param] = value;
      return res;
    }, {});
};

export const createTitle = (title, additions, separator = ', ') => {
  return title + separator + Object.values(additions).join(separator);
};

export const groupDigits = (number, fractionLength = 0, spaceSymbol = ' ', pointSymbol = '.') => {
  const [integer, fraction] = number.toFixed(fractionLength).toString().split('.');
  let res = integer
    .split('')
    .reverse()
    .reduce((acc, current, index, arr) => {
      const shouldAddSpace = (index + 1) % 3 === 0 && index + 1 !== arr.length;
      if (shouldAddSpace) {
        return spaceSymbol + current + acc;
      }
      return current + acc;
    }, '');

  if (fraction) {
    return res + pointSymbol + fraction.slice(0, fractionLength);
  }
  return res;
};
