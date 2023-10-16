export {sortTable, sortControl};

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
