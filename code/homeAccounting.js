"use strict"

const html = document.querySelector('html');
const logoutModal = document.getElementById('logout__modal');
const openModal = (modal) => {
  modal.style.display = 'block';
  html.classList.add('modal__open');
}
const closeModal = (modal) => {
  modal.style.display = 'none';
  html.classList.remove('modal__open');
}
const openModalHandler = (modal, button) => {
  button.addEventListener("click", () => {
    openModal(modal);
  });
}
const logoutButton = document.getElementById('open__logout');
openModalHandler(logoutModal, logoutButton);

const closeButtons = document.getElementsByClassName('close');
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", () => {
    logoutModal.style.display = 'none';
  });
}

document.addEventListener("click", (e) => {
  if (e.target === logoutModal) {
    logoutModal.style.display = 'none';
  }
});

const yesBtn = document.querySelector('.yes__btn');
const noBtn = document.querySelector(['.no__btn']);

yesBtn.addEventListener("click", () => {
  setTimeout(() => {
    document.location.href = '../public/index.html';
  }, 2000);
});

noBtn.addEventListener("click", () => {
  logoutModal.style.display = 'none';
});

const transactionBtn  = document.getElementById('transaction');
const filterBtn  = document.getElementById('filter');
const transactionBlock = document.getElementById('transaction__block');
const filterBlock = document.getElementById('filter__block');
const transactionArrow  = document.querySelector('.arrow');
const filterArrow = filterBtn.querySelector('.arrow');

transactionBtn.addEventListener("click", () => {
  if (transactionBlock.style.display === 'block') {
    transactionBlock.style.display = 'none';
  } else {
    transactionBlock.style.display = 'block';
  }
  transactionArrow.classList.toggle('active');
});

filterBtn.addEventListener("click", () => {
  if (filterBlock.style.display === 'block') {
    filterBlock.style.display = 'none';
  } else {
    filterBlock.style.display = 'block';
  }
  filterArrow.classList.toggle('active');
});

document.addEventListener("click", (e) => {
  if (!transactionBtn.contains(e.target) && !transactionBlock.contains(e.target)) {
    transactionBlock.style.display = 'none';
    transactionArrow.classList.remove('active');
  }
});

document.addEventListener("click", (e) => {
  if (!filterBtn.contains(e.target) && !filterBlock.contains(e.target)) {
    filterBlock.style.display = 'none';
    filterArrow.classList.remove('active');
  }
});

const typeSelect = document.getElementById('type');
const categoryExpenses = document.getElementById('category__expenses');
const categoryIncome = document.getElementById('category__income');

typeSelect.addEventListener("change", function() {
  if (this.value === 'Expenses') {
    categoryExpenses.style.display = 'block';
    categoryIncome.style.display = 'none';
  } else if (this.value === 'Income') {
    categoryExpenses.style.display = 'none';
    categoryIncome.style.display = 'block';
  } else {
    categoryExpenses.style.display = 'none';
    categoryIncome.style.display = 'none';
  }
});

const typeSelectFilter = document.getElementById('type__filter');
const categoryExpensesFilter = document.getElementById('category__expenses__filter');
const categoryIncomeFilter = document.getElementById('category__income__filter');

typeSelectFilter.addEventListener("change", function() {
  if (this.value === 'Expenses') {
    categoryExpensesFilter.style.display = 'block';
    categoryIncomeFilter.style.display = 'none';
  } else if (this.value === 'Income') {
    categoryExpensesFilter.style.display = 'none';
    categoryIncomeFilter.style.display = 'block';
  } else {
    categoryExpensesFilter.style.display = 'none';
    categoryIncomeFilter.style.display = 'none';
  }
});

const addButton = document.querySelector('.add__btn');
addButton.addEventListener("click", (e) => {
  e.preventDefault();

  const amountInput = document.getElementById('amount');
  const descriptionInput = document.getElementById('description');
  const selectedCategory = typeSelect.value === 'Expenses' ? categoryExpenses.value: categoryIncome.value;
  const dateInput = document.getElementById('date');

  const newRow = createTable.insertRow(0);
  const typeCell = newRow.insertCell();
  typeCell.textContent = typeSelect.value;
  const amountCell = newRow.insertCell();
  amountCell.textContent = amountInput.value;
  const descriptionCell = newRow.insertCell();
  descriptionCell.textContent = descriptionInput.value;
  const categoryCell = newRow.insertCell();
  categoryCell.textContent = selectedCategory;
  const dateCell = newRow.insertCell();
  dateCell.textContent = dateInput.value;
  const deleteCell = newRow.insertCell();

  amountInput.value = '';
  descriptionInput.value = '';
  categoryExpenses.value = 'Foodstuff';
  categoryIncome.value = 'Salary';
  dateInput.value = '';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn__delete');
  deleteBtn.addEventListener("click", () => {
    createTable.deleteRow(newRow.rowIndex);
  });
  deleteCell.append(deleteBtn);

  transactionBlock.style.display = 'none';

  transactionArrow.classList.remove('active');
});

const okButton = document.querySelector('.ok__btn');
okButton.addEventListener("click", (e) => {
  e.preventDefault();

  const selectedCategory = typeSelectFilter.value === 'Expenses' ? categoryExpensesFilter.value: categoryIncomeFilter.value;
  const dateStart = document.getElementById('date__start');
  const dateEnd = document.getElementById('date__end');

  categoryExpensesFilter.value = 'Foodstuff';
  categoryIncomeFilter.value = 'Salary';
  dateStart.value = '';
  dateEnd.value = '';

  filterBlock.style.display = 'none';

  filterArrow.classList.remove('active');
});

// BODY -------------------------------------------------------------------------------------------

const bodyContainer = document.getElementById('body__container');

const createH1 = document.createElement('h1');
createH1.textContent = 'Home Accounting';
bodyContainer.prepend(createH1);

const createP2 = document.createElement('p');
createP2.classList.add('text__body');
createP2.textContent = 'Here you can enter your transactions and view a list of all saved transactions.';
createH1.after(createP2);

const tableContainer = document.createElement('div');
tableContainer.classList.add('table__container');
bodyContainer.append(tableContainer);

const createTable = document.createElement('table');
createTable.classList.add('table__body');
tableContainer.append(createTable);

const footer = document.createElement('footer');
footer.textContent = 'by 2023';
document.body.append(footer);