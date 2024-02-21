import {addContactData, removeStorage} from './serviceStorage.js';
import {createRow} from './createElements.js';
import {keyLocalStorage as key} from '../index.js';

export {modalControl, addContactPage, checkDeleteButtonPressed,
  checkPhone, formControl, deleteControl};

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
  const {phone} = newContact;
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
    if (localStorage.getItem(key)) {
      checkDeleteButtonPressed(list);
    }
    
    if(!checkPhone(list, newContact)) {
      addContactPage(newContact, list);
      addContactData(newContact);
    }
    
    form.reset();
    closeModal();
  });
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
