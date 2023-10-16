import {
  createButtonsGroup, 
  createFooter,
  createForm,
  createHeader,
  createLogo,
  createMain,
  createRow,
  createTable
} from './createElements.js';

import {sortTable} from './sort.js';

export {renderContacts, renderPhoneBook};

const renderContacts = (list, data) => {
  const allRow = data.map(createRow);
  list.append(...allRow);
  const sortedCol = JSON.parse(localStorage.getItem('sortColumn'));
  if (sortedCol !== null) {
    sortTable(list, JSON.parse(localStorage.getItem('sortColumn')));
  }
  return allRow;
};

const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3 js-add',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  
  const table = createTable();
  header.headerContainer.append(logo);
  const {form, overlay} = createForm();
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
  const footer = createFooter();
  app.append(header, main, footer);
  return {
    list: table.tbody,
    tHead: table.tHead, // for sort
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};
