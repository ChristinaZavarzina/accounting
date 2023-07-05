"use strict"

const html = document.querySelector('html');
const loginModal = document.getElementById('login__modal');
const registrationModal = document.getElementById('registration__modal');

const openModal = (modal) => {
  modal.style.display = 'block';
  html.classList.add('modal__open');
}

const closeModal = (modal) => {
  modal.style.display = 'none';
  html.classList.remove('modal__open');
}

const openModalHandler = (modal, button) => {
  button.addEventListener('click', () => {
    openModal(modal);
  });
}

const loginButton = document.getElementById('open__login');
const registrationButton = document.getElementById('open__registration');
openModalHandler(loginModal, loginButton);
openModalHandler(registrationModal, registrationButton);

// document.addEventListener("DOMContentLoaded", () => {
//   closeModal(loginModal);
//   closeModal(registrationModal);
// });

const closeButtons = document.getElementsByClassName('close');
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", () => {
    registrationModal.style.display = "none";
    loginModal.style.display = "none";
  });
}

document.addEventListener("click", (e) => {
  if (e.target === loginModal || e.target === registrationModal) {
    loginModal.style.display = "none";
    registrationModal.style.display = "none";
  }
});

const submitBtn = document.querySelectorAll('.submit__btn');

const nameRegex = /^[a-zA-Z\s]+$/;
// const phoneRegex = /^\+?\d+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;

const validateInput = (input, regex) => {
  return regex.test(input.value);
}

submitBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let isValid = true;
    
    const form = button.closest('form');
    const nameInput = form.querySelector('input[name="username"]');
    const surnameInput = form.querySelector('input[name="surname"]');
    const emailInput = form.querySelector('input[name="mail"]');
    const confirmEmailInput = form.querySelector('input[name="confirm-mail"]');
    const passInput = form.querySelector('input[name="pass"]');
    const confirmPassInput = form.querySelector('input[name="confirm-pass"]');
    // const phoneInput = form.querySelector('input[name="phone"]');
    
    if (!validateInput(nameInput, nameRegex)) {
      nameInput.nextElementSibling.textContent = 'Please enter the correct name';
      isValid = false;
    } else {
      nameInput.nextElementSibling.textContent = '';
    }
    
    if (!validateInput(surnameInput, nameRegex)) {
      surnameInput.nextElementSibling.textContent = 'Please enter the correct surname';
      isValid = false;
    } else {
      surnameInput.nextElementSibling.textContent = '';
    }
    
    if (!validateInput(emailInput, emailRegex)) {
      emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
      isValid = false;
    } else {
      emailInput.nextElementSibling.textContent = '';
    }
    
    if (emailInput.value !== confirmEmailInput.value) {
      confirmEmailInput.nextElementSibling.textContent = 'Email addresses do not match';
      isValid = false;
    } else {
      confirmEmailInput.nextElementSibling.textContent = '';
    }
    
    if (!validateInput(passInput, passRegex)) {
      passInput.nextElementSibling.textContent = 'Please enter a valid password minimum of 8 characters';
      isValid = false;
    } else {
      passInput.nextElementSibling.textContent = '';
    }
    
    if (passInput.value !== confirmPassInput.value) {
      confirmPassInput.nextElementSibling.textContent = 'Passwords do not match';
      isValid = false;
    } else {
      confirmPassInput.nextElementSibling.textContent = '';
    }
    
    // if (!validateInput(phoneInput, phoneRegex)) {
    //   phoneInput.nextElementSibling.textContent = 'Please enter a valid phone number';
    //   isValid = false;
    // } else {
    //   phoneInput.nextElementSibling.textContent = '';
    // }
    
    if (isValid) {   // под вопросом 
      setTimeout(() => {
        registrationModal.style.display = "none";
        document.location.href = '../public/homeAccounting.html';
      }, 2000);
    }
  }); 
});

submitBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const form = button.closest('form');
    const emailInput = form.querySelector('input[name="mail"]');
    const passInput = form.querySelector('input[name="pass"]');

    let isValid = true;

    if (!validateInput(emailInput, emailRegex) || emailInput.value.trim() === '') {
      emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
      isValid = false;
    } else {
      emailInput.nextElementSibling.textContent = '';
    }

    if (!validateInput(passInput, passRegex) || passInput.value.trim() === '') {
      passInput.nextElementSibling.textContent = 'Please enter a valid password minimum of 8 characters';
      isValid = false;
    } else {
      passInput.nextElementSibling.textContent = '';
    }

    if (isValid) {  // под вопросом 
      setTimeout(() => {
        loginModal.style.display = "none";
        document.location.href = '../public/homeAccounting.html';
      }, 2000);
    }
  });
});

const loginForm = document.querySelector('.form__login');
const loginErrorMessage = document.getElementById('login__error__message');

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = loginForm.querySelector('input[name="mail"]');
  const passInput = loginForm.querySelector('input[name="pass"]');

  const email = emailInput.value;
  const password = passInput.value;

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setTimeout(() => {
          loginModal.style.display = "none";
          document.location.href = '../public/homeAccounting.html';
        }, 2000);
      } else {
        loginErrorMessage.textContent = 'This email address or password does not exist';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

const registrationForm = document.querySelector('.form__registration');
const registrationErrorMessage = document.getElementById('registration__error__message');

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = loginForm.querySelector('input[name="mail"]');

  const email = emailInput.value;

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setTimeout(() => {
          registrationModal.style.display = "none";
          document.location.href = '../public/homeAccounting.html';
        }, 2000);
      } else {
        registrationErrorMessage.textContent = 'This email address already exists';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

const loginLink = document.getElementById('login__link');
const registrationLink = document.getElementById('registration__link');

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeout(() => {
    registrationModal.style.display = 'none';
    loginModal.style.display = 'block';
  }, 2000);
});

registrationLink.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeout(() => {
    loginModal.style.display = 'none';
    registrationModal.style.display = 'block';
  }, 2000);
});


// BODY ------------------------------------------------------------------------------------
const bodyContainer = document.getElementById('body__container');

const createH1 = document.createElement('h1');
createH1.textContent = 'Home Accounting';
bodyContainer.prepend(createH1);


const createP = document.createElement('p');
createP.classList.add('text__body');
createP.textContent = `Is a website that helps you keep track of your expenses and income.
It allows you to create transactions, track them, sort and analyze data.`;
createH1.after(createP);