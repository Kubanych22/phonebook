import {data, keyLocalStorage as key} from '../script.js';

export {removeStorage, addContactData, getContactData};

const removeStorage = (deletedContact) => {
  let phone = deletedContact.querySelector('a').textContent;
  const dataFromStorage = JSON.parse(localStorage.getItem(key));
  const result = dataFromStorage.findIndex(elem => elem.phone === phone);
  dataFromStorage.splice(result, 1);
  deletedContact.remove();
  localStorage.setItem(key, JSON.stringify(dataFromStorage));
};

const getContactData = () => (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : data);

const setContactData = (data) => localStorage.setItem(key, JSON.stringify(data));

const addContactData = (contact) => {
  const data = getContactData(key);
  data.push(contact);
  setContactData(data);
};
