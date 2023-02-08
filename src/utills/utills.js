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
