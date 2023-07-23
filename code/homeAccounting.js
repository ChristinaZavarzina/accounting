"use strict"

const html = document.querySelector('html');
const logoutModal = document.getElementById('logout__modal');
const changeModalAll = document.getElementById('change__modal-all');

const openModal = (modal) => {
  modal.style.display = 'block';
  html.classList.add('modal__open');
}
const closeModal = (modal) => {
  modal.style.display = 'none';
  html.classList.remove('modal__open');
}
const openModalHandler = (modal, button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(modal);
  });
}
const logoutButton = document.getElementById('open__logout');
const changeButton = document.getElementById('open__change-profile');
openModalHandler(logoutModal, logoutButton);
openModalHandler(changeModalAll, changeButton);

const clearInputs = () => {
  const inputFields = document.querySelectorAll('.form__profile input');
  inputFields.forEach(input => {
    input.value = '';
  });
  const errorTextElements = document.querySelectorAll('.error__text');
  errorTextElements.forEach(errorText => {
    errorText.textContent = '';
  });
};

const closeButtons = document.getElementsByClassName('close');
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", () => {
    const modals = document.getElementsByClassName('modal');
    for (let j = 0; j < modals.length; j++) {
      modals[j].style.display = 'none';
    }
    clearInputs();
  });
}

// document.addEventListener("click", (e) => {
//   if (e.target === logoutModal || e.target === changeModalAll) {
//     const modals = document.getElementsByClassName('modal');
//     for (let i = 0; i < modals.length; i++) {
//       modals[i].style.display = 'none';
//     }
//     clearInputs();
//   }
// });

const yesBtn = document.querySelector('.yes__btn');
const noBtn = document.querySelector('.no__btn');

yesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeout(() => {
    document.location.href = '../public/index.html';
  }, 2000);
});

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logoutModal.style.display = 'none';
});

const usernameBtn = document.getElementById('username');
const transactionBtn = document.getElementById('transaction');
const filterBtn = document.getElementById('filter');
const userBlock = document.getElementById('user__block');
const transactionBlock = document.getElementById('transaction__block');
const filterBlock = document.getElementById('filter__block');
const transactionArrow = document.querySelector('.arrow');
const filterArrow = filterBtn.querySelector('.arrow');

let currentOpenBlock = null;

const toggleBlock = (block, arrow, flag) => {
  if (flag) {
    block.style.display = 'block';
    if (arrow !== null) {
      arrow.classList.add('active');
    }
  } else {
    block.style.display = 'none';
    if (arrow !== null) {
      arrow.classList.remove('active');
    }
  }
};

const closeOtherBlocks = (blockToKeepOpen) => {
  if (transactionBlock !== blockToKeepOpen) {
    toggleBlock(transactionBlock, transactionArrow, false);
  }
  if (filterBlock !== blockToKeepOpen) {
    toggleBlock(filterBlock, filterArrow, false);
  }
  if (userBlock !== blockToKeepOpen) {
    toggleBlock(userBlock, null, false);
  }
};

const handleBtnClick = (btn, block, arrow) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentOpenBlock === block) {
      toggleBlock(block, arrow, false);
      currentOpenBlock = null;
    } else {
      toggleBlock(block, arrow, true);
      closeOtherBlocks(block);
      currentOpenBlock = block;
    }
  });
};

handleBtnClick(usernameBtn, userBlock, null);
handleBtnClick(transactionBtn, transactionBlock, transactionArrow);
handleBtnClick(filterBtn, filterBlock, filterArrow);

document.addEventListener("click", (e) => {
  if (!transactionBtn.contains(e.target) && !transactionBlock.contains(e.target) &&
    !filterBtn.contains(e.target) && !filterBlock.contains(e.target) &&
    !usernameBtn.contains(e.target) && !userBlock.contains(e.target)) {
    closeOtherBlocks(null);
    currentOpenBlock = null;
  }
});

const menuTrans = document.querySelector('.menu__trans');
menuTrans.addEventListener("click", (e) => {
  e.stopPropagation();
});

const menuFilt = document.querySelector('.menu__filter');
menuFilt.addEventListener("click", (e) => {
  e.stopPropagation();
});

const submitChangeForm = (e) => {
  const usernameInput = document.querySelector('input[name="username"]');
  const usernameError = document.getElementById('username__arror');
  const surnameInput = document.querySelector('input[name="surname"]');
  const surnameError = document.getElementById('surname__error');
  const emailInput = document.querySelector('input[name="mail"]');
  const emailError = document.getElementById('email__error');
  const confirmEmailInput = document.querySelector('input[name="confirm-mail"]');
  const confirmEmailError = document.getElementById('confirm__email-error');
  const passInput = document.querySelector('input[name="pass"]');
  const passError = document.getElementById('change__pass-error');
  const confirmPassInput = document.querySelector('input[name="confirm-pass"]');
  const confirmPassError = document.getElementById('confirm__pass-error');
  const errorMessage = document.getElementById('error__message');
  const infoSucces = document.getElementById('info');
  e.preventDefault();

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;

  const validateField = (value, regex) => {
  return regex.test(value);
};

  if (!validateField(usernameInput.value, nameRegex)) {
    usernameError.textContent = "Incorrect username format";
    return;
  } else {
    usernameError.textContent = "";
  }

  if (!validateField(surnameInput.value, nameRegex)) {
    surnameError.textContent = "Incorrect surname format";
    return;
  } else {
    surnameError.textContent = "";
  }

  if (!validateField(emailInput.value, emailRegex)) {
    emailError.textContent = "Incorrect email format";
    return;
  } else {
    emailError.textContent = "";
  }

  if (emailInput.value !== confirmEmailInput.value) {
    confirmEmailError.textContent = 'Email addresses do not match';
    return
  } else {
    confirmEmailError.textContent = "";
  }

  if (!validateField(passInput.value, passRegex)) {
    passError.textContent = "The password must contain a minimum of 8 characters, including at least one digit";
    return;
  } else {
    passError.textContent = "";
  }

  if (passInput.value !== confirmPassInput.value) {
    confirmPassError.textContent = "Passwords do not match";
    return
  } else {
    confirmPassError.textContent = "";
  }
  infoSucces.style.display = 'block';

  const formData = new FormData(changeForm);
  const data = new URLSearchParams(formData);

  fetch('https://reqres.in/api/user', {
    method: 'POST',
    body: data
  }).then(res => res.json())
    .then(data => {
      setTimeout(() => {
        changeModalAll.style.display = "none";
        infoSucces.style.display = 'none'
        clearInputs();
      }, 2000);
      console.log(data);
    })
    .catch(error => {
      errorMessage.textContent = 'No server connection';
      console.log(error);
  });
};
const changeForm = document.getElementById('form__profile');
changeForm.addEventListener("submit", submitChangeForm);

const categoryExpenses = document.getElementById('category__expenses');
const categoryIncome = document.getElementById('category__income');
const categoryExpensesFilter = document.getElementById('category__expenses-filter');
const categoryIncomeFilter = document.getElementById('category__income-filter');

const typeSelect = document.getElementById('type');
typeSelect.addEventListener("change", function () {
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
const categoryLabel = document.getElementById('category__label');

typeSelectFilter.addEventListener("change", function () {
  if (this.value === 'All') {
    categoryLabel.classList.add('hidden');
    categoryExpensesFilter.style.display = 'none';
    categoryIncomeFilter.style.display = 'none';
  } else {
    categoryLabel.classList.remove('hidden');
    categoryExpensesFilter.style.display = this.value === 'Expenses' ? 'block' : 'none';
    categoryIncomeFilter.style.display = this.value === 'Income' ? 'block' : 'none';
  }
});

const transactionApply = document.querySelector('.transaction__apply');
transactionApply.addEventListener("click", (e) => {
  e.preventDefault();
  const typeSelect = document.getElementById('type');
  const amountInput = document.getElementById('amount');
  const descriptionInput = document.getElementById('description');
  const categoryExpenses = document.getElementById('category__expenses');
  const categoryIncome = document.getElementById('category__income');
  const dateInput = document.getElementById('date');
  
  const transactionData = {
    type: typeSelect.value,
    amount: amountInput.value,
    description: descriptionInput.value,
    category: typeSelect.value === 'Expenses' ? categoryExpenses.value : categoryIncome.value,
    date: dateInput.value,
  };
  
  fetch('https://reqres.in/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transactionData)
  })
  .then(response => response.json())
  .then(data => {
    const createTable = document.getElementById('table__body');
    const newRow = createTable.insertRow(0);
    const typeCell = newRow.insertCell();
    typeCell.textContent = transactionData.type;
    const amountCell = newRow.insertCell();
    amountCell.textContent = transactionData.amount;
    const descriptionCell = newRow.insertCell();
    descriptionCell.textContent = transactionData.description;
    const categoryCell = newRow.insertCell();
    categoryCell.textContent = transactionData.category;
    const dateCell = newRow.insertCell();
    dateCell.textContent = transactionData.date;
    const deleteCell = newRow.insertCell();
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('btn__delete');
    deleteBtn.addEventListener("click", () => {
    createTable.deleteRow(newRow.rowIndex);
    displayTotalBalance();
    });
    deleteCell.append(deleteBtn);
    
    amountInput.value = '';
    descriptionInput.value = '';
    categoryExpenses.value = 'Foodstuff';
    categoryIncome.value = 'Salary';
    dateInput.value = '';
    
    transactionBlock.style.display = 'none';
    filterBlock.style.display = 'none';
    transactionArrow.classList.remove('active');
    filterArrow.classList.remove('active');
    displayTotalBalance();
  })
  .catch(error => {
    console.error('No server connection:', error);
  });
});

const filterApply = document.querySelector('.filter__apply');
filterApply.addEventListener("click", (e) => {
  e.preventDefault();
  const typeFilter = document.getElementById('type__filter').value;
  const dateStartFilter = document.getElementById('date__start').value;
  const dateEndFilter = document.getElementById('date__end').value;
  const categoryExpensesFilter = document.getElementById('category__expenses-filter').value;
  const categoryIncomeFilter = document.getElementById('category__income-filter').value;
  const rows = document.querySelectorAll('#table__body tr');
  rows.forEach(row => {
    row.style.display = '';
  });
  rows.forEach(row => {
    const typeCell = row.querySelector('td:nth-child(1)');
    const dateCell = row.querySelector('td:nth-child(5)');
    const categoryCell = row.querySelector('td:nth-child(4)');
    const type = typeCell.textContent;
    const date = dateCell.textContent;
    const category = categoryCell.textContent;
    const showRow = (
      (typeFilter === 'All' || type === typeFilter) &&
      (dateStartFilter === '' || date >= dateStartFilter) &&
      (dateEndFilter === '' || date <= dateEndFilter) &&
      (categoryExpensesFilter === 'All Expenses' || category === categoryExpensesFilter) &&
      (categoryIncomeFilter === 'All Income' || category === categoryIncomeFilter)
    );
    row.style.display = showRow ? '' : 'none';
  });
  filterBlock.style.display = 'none';
  filterArrow.classList.remove('active');
});


const containerModal = document.getElementById('container__modal');



/* 
<div class="modal__content">
  <span class="close">&times;</span>
  <form id="form" novalidate>
    <h2 class="modal__itle">Text</h2>
    <input type="text" name="name" placeholder="Change name" class="input" autocomplete="name" required>
    <span class="error__text" id=""></span>
    <input type="submit" value="Submit" class="submit__btn">
    </form>
</div>
 */

// BODY -------------------------------------------------------------------------------------------

const bodyContainer = document.getElementById('body__container');

const createH1 = document.createElement('h1');
createH1.textContent = 'Home Accounting';
bodyContainer.prepend(createH1);

const createP2 = document.createElement('p');
createP2.classList.add('text__body');
createP2.textContent = 'Here you can enter your transactions and view a list of all saved transactions.';
createH1.after(createP2);

const balanceContainer = document.createElement('div');
balanceContainer.classList.add('balance__container');
balanceContainer.textContent = 'Total Balance:';
createP2.after(balanceContainer);
const balanceScreen = document.createElement('input');
balanceScreen.classList.add('screen__balance');
balanceScreen.type = 'text';
balanceScreen.setAttribute('disabled', 'true');
balanceScreen.id = 'total__balance';
balanceContainer.append(balanceScreen);

const tableContainer = document.createElement('div');
tableContainer.classList.add('table__container');
bodyContainer.append(tableContainer);

const createTable = document.createElement('table');
createTable.classList.add('table__body');
createTable.id = 'table__body';
tableContainer.append(createTable);

const footer = document.createElement('footer');
footer.textContent = 'by 2023';
document.body.append(footer);

const calcTotalBalance = () => {
  const rows = document.querySelectorAll('#table__body tr');
  let totalBalance = 0;

  rows.forEach(row => {
    const amountCell = row.querySelector('td:nth-child(2)');
    const amount = parseFloat(amountCell.textContent);

    if (!isNaN(amount)) {
      totalBalance += amount;
    }
  });

  return totalBalance;
};

const displayTotalBalance = () => {
  const totalBalanceEl = document.getElementById('total__balance');
  const totalBalance = calcTotalBalance();

  totalBalanceEl.value = `$${totalBalance.toFixed(2)}`;
};
displayTotalBalance();