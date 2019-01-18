const helper = {};

/*
* function cookie
*
*/

helper.getCookie = () => {
  const name = process.env.COOKIE_NAME;
  const cookie = document.cookie.split(';');
  for (let i = 0; i < cookie.length; i += 1) {
    let c = cookie[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

helper.removeCookie = () => {
  document.cookie = `${process.env.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

/*
* function localstorage
*
*/

helper.setStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

helper.getStorage = key => window.localStorage.getItem(key);

helper.removeStorage = key => window.localStorage.removeItem(key);

export default helper;
