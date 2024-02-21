import {getContactData} from './script/serviceStorage.js';
import {sortControl} from './script/sort.js';
import {hoverRow} from './script/hover.js';

import {deleteControl, formControl, modalControl} from './script/control.js';

import * as render from './script/render.js';

import './index.html';

import './css/normalize.css';
import './css/bootstrap.css';
import './css/index.css';


export const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Семён',
    surname: 'Бондарев',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
  {
    name: 'Борис',
    surname: 'Андреев',
    phone: '+79876543217',
  },
  {
    name: 'Александр',
    surname: 'Иванов',
    phone: '+79876543777',
  },
];

export const keyLocalStorage = 'data';

const init = (key, data) => {
  const dataFromStorage = getContactData(key);
  if (dataFromStorage !== null) {
    return dataFromStorage;
  } else {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
};

const phoneBookInit = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const {
    tHead,
    list,
    logo,
    btnAdd,
    formOverlay,
    form,
    btnDel,
  } = render.renderPhoneBook(app, title);
  
  // функционал
  
  const allRow = render.renderContacts(list, init(keyLocalStorage, data));
  const {closeModal} = modalControl(btnAdd, formOverlay);
  hoverRow(allRow, logo);
  
  deleteControl(btnDel, list);
  sortControl(list, tHead);
  formControl(form, list, closeModal);
};

phoneBookInit('#app', '');
