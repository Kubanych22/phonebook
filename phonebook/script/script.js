'use strict';
let data = [
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

{
  const keyLocalStorage = 'data';
  
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };
  
  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
  };
  
  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник ${title}`;
    
    return h1;
  };
  
  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    
    return main;
  };
  
  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    
    btnWrapper.classList.add('btn-wrapper');
    
    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      
      return button;
    });
    
    btnWrapper.append(...btns);
    
    return {
      btnWrapper,
      btns,
    };
  };
  
  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-stripped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="edit">Редактировать</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);
    
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tHead = thead;
    table.tbody = tbody;
    
    return table;
  };
  
  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" type="text" name="name" id="name" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" type="text" name="surname" id="surname" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" type="tel" name="phone" id="phone" required>
      </div>
    `);
    
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);
    
    form.append(...buttonGroup.btns);
    overlay.append(form);
    return {
      overlay,
      form,
    };
  };
  
  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    const tdEdit = document.createElement('td');
    tdEdit.classList.add('edit');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit-icon');
    tdEdit.append(buttonEdit);
    
    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    tdName.classList.add('first-name'); // for sort
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    tdSurname.classList.add('surname'); // for sort
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    
    tr.append(tdDel, tdEdit, tdName, tdSurname, tdPhone);
    return tr;
  };
  
  const renderContacts = (list, data) => {
    const allRow = data.map(createRow);
    list.append(...allRow);
    const sortedCol = JSON.parse(localStorage.getItem('sortColumn'));
    if (sortedCol !== null) {
      sortTable(list, JSON.parse(localStorage.getItem('sortColumn')));
    }
    return allRow;
  };
  
  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;
    footerContainer.textContent = '\u00A9 PhoneBook - 1.0.0. Все права защищены';
    return footer;
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
  
  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };
  
  // Функция сортировки по имени или по фамилии
  const sortTable = (list, sortedCol) => {
    let tableRows = list.querySelectorAll('tr');
    const sortColumns = [...tableRows].sort((a, b) => {
      a = a.childNodes[sortedCol].textContent;
      b = b.childNodes[sortedCol].textContent;
      return a >= b ? 1 : -1;
    });
    
    list.innerHTML = '';
    
    for (let tr of sortColumns) {
      list.append(tr);
    }
  };
  
  const sortControl = (list, tHead) => {
    tHead.addEventListener('click', (e) => {
      const target = e.target;
      if (target.textContent === 'Имя') {
        sortTable(list, 2);
        localStorage.setItem('sortColumn', JSON.stringify(2));
      } else if (target.textContent === 'Фамилия') {
        sortTable(list, 3);
        localStorage.setItem('sortColumn', JSON.stringify(3));
      }
    });
  };
  
  // Работа с формой модального окна
  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };
    
    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };
    
    btnAdd.addEventListener('click', openModal);
    
    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.closest('.close')) {
        closeModal();
      }
    });
    
    return {
      closeModal,
    };
  };
 
  const addContactPage = (contact, list) => {
    list.prepend(createRow(contact));
  };
  
  const checkDeleteButtonPressed = (list) => {
    if (list.querySelector('.delete').classList.contains('is-visible')) {
      document.querySelector('.btn-danger').click();
    }
  };
  
  const checkPhone = (list, newContact) => {
    const elems = list.querySelectorAll('a');
    const phones = [...elems].map(p => p.textContent);
    const phone = newContact.phone;
    if (phones.includes(phone)) {
      alert('Такой телефон уже имеется');
      return true;
    }
    return false;
  };
  
  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      
      checkDeleteButtonPressed(list);
      
      if(!checkPhone(list, newContact)) {
        addContactPage(newContact, list);
        addContactData(newContact);
      }
      
      form.reset();
      closeModal();
    });
  };
  
  // работа с localStorage  
  const removeStorage = (deletedContact) => {
    let phone = deletedContact.querySelector('a').textContent;
    const dataFromStorage = JSON.parse(localStorage.getItem(keyLocalStorage));
    const result = dataFromStorage.findIndex(elem => elem.phone === phone);
    dataFromStorage.splice(result, 1);
    deletedContact.remove();
    localStorage.setItem(keyLocalStorage, JSON.stringify(dataFromStorage));
  };
  
  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });
    
    list.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        let deletedContact = target.closest('.contact');
        if (confirm('Удалить также из localStorage?\nПри ответе \"Да\" контакт будет потерян навсегда!')) {
          removeStorage(deletedContact);
        } else {
          deletedContact.remove();
        }
      }
    });
  };
  
  const setStorage = (key, contact) => {
    let dataFromStorage = JSON.parse(localStorage.getItem(key));
    dataFromStorage.unshift(contact);
    return localStorage.setItem(key, JSON.stringify(dataFromStorage));
  };
  
  const addContactData = (contact) => {
    data.push(contact);
    setStorage(keyLocalStorage, contact);
  };
  
  const getStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  
  const init = (key, data) => {
    const dataFromStorage = getStorage(key);
    if (dataFromStorage !== null) {
      return dataFromStorage;
    } else {
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    }
  };
  
  window.phoneBookInit = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      tHead,
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);
    
    // функционал
    
    const allRow = renderContacts(list, init(keyLocalStorage, data));
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    
    deleteControl(btnDel, list);
    sortControl(list, tHead);
    formControl(form, list, closeModal);
  };
}
