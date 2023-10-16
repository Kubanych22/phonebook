import {data, keyLocalStorage as key} from '../script.js';

export {removeStorage, setStorage, addContactData, getStorage};

const removeStorage = (deletedContact) => {
  let phone = deletedContact.querySelector('a').textContent;
  const dataFromStorage = JSON.parse(localStorage.getItem(key));
  const result = dataFromStorage.findIndex(elem => elem.phone === phone);
  dataFromStorage.splice(result, 1);
  deletedContact.remove();
  localStorage.setItem(key, JSON.stringify(dataFromStorage));
};

const setStorage = (key, contact) => {
  let dataFromStorage = JSON.parse(localStorage.getItem(key));
  dataFromStorage.unshift(contact);
  return localStorage.setItem(key, JSON.stringify(dataFromStorage));
};

const addContactData = (contact) => {
  data.push(contact);
  setStorage(key, contact);
};

const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
