"use strict"

const html = document.querySelector('html');
const loginModal = document.getElementById('login__modal');
const signupModal = document.getElementById('signup__modal');

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
const signupButton = document.getElementById('open__signup');
openModalHandler(loginModal, loginButton);
openModalHandler(signupModal, signupButton);

const closeButtons = document.getElementsByClassName('close');
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", () => {
    signupModal.style.display = "none";
    loginModal.style.display = "none";
  });
}

document.addEventListener("click", (e) => {
  if (e.target === loginModal || e.target === signupModal) {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
  }
});

const validateInput = (input, regex) => {
  return regex.test(input.value);
}

const nameRegex = /^[a-zA-Z\s]+$/;
// const phoneRegex = /^\+?\d+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;

const submitBtn = document.querySelectorAll('.submit__btn');
submitBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const form = button.closest('form');
    const nameInput = form.querySelector('input[name="username"]');
    const surnameInput = form.querySelector('input[name="surname"]');
    const emailInput = form.querySelector('input[name="mail"]');
    const confirmEmailInput = form.querySelector('input[name="confirm-mail"]');
    const passInput = form.querySelector('input[name="pass"]');
    const confirmPassInput = form.querySelector('input[name="confirm-pass"]');
    // const phoneInput = form.querySelector('input[name="phone"]');

    let isValid = true;
    
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
        signupModal.style.display = "none";
        document.location.href = '../public/homeAccounting.html';
      }, 2000);
    }
  }); 
});

submitBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const formLogin = button.closest('form');
    const emailInput = formLogin.querySelector('input[name="mail"]');
    const passInput = formLogin.querySelector('input[name="pass"]');

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
// -----------------------------------
const emailInput = loginForm.querySelector('input[name="mail"]');
emailInput.addEventListener("input", (e) => {
  const email = e.target.value;
  console.log(email);
});
const passInput = loginForm.querySelector('input[name="pass"]');
passInput.addEventListener("input", (e) => {
  const password = e.target.value;
  console.log(password);
});
// -----------------------------------

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = loginForm.querySelector('input[name="mail"]');
  const passInput = loginForm.querySelector('input[name="pass"]');
  const email = emailInput.value;
  const password = passInput.value;
  const formData = new URLSearchParams();
  formData.append('mail', email);
  formData.append('pass', password);

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': getCookie('csrftoken'),
    },
    body: formData.toString(),
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

const signupForm = document.querySelector('.form__signup');
const signupErrorMessage = document.getElementById('signup__error__message');

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = signupForm.querySelector('input[name="mail"]');
  const passInput = signupForm.querySelector('input[name="pass"]');
  const email = emailInput.value;
  const password = passInput.value;
  const formData = new URLSearchParams();
  formData.append('mail', email);
  formData.append('pass', password);

  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': getCookie('csrftoken'),
    },
    body: formData.toString(),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setTimeout(() => {
          signupModal.style.display = "none";
          document.location.href = '../public/homeAccounting.html';
        }, 2000);
      } else {
        signupErrorMessage.textContent = 'This email address already exists';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

const loginLink = document.getElementById('login__link');
const signupLink = document.getElementById('signup__link');

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeout(() => {
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
  }, 2000);
});

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeout(() => {
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
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