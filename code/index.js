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

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;

const validateField = (value, regex) => {
  return regex.test(value);
};

const emailInput = document.querySelector('input[name="mail"]');
const emailError = document.getElementById('email-error');
const passwordInput = document.querySelector('input[name="pass"]');
const passwordError = document.getElementById('password-error');
const loginErrorMessage = document.getElementById('login__error__message');

const submitLoginForm = (e) => {
  e.preventDefault();

  if (!validateField(emailInput.value, emailRegex)) {
    emailError.textContent = "Incorrect email format";
    return;
  } else {
    emailError.textContent = "";
  }

  if (!validateField(passwordInput.value, passRegex)) {
    passwordError.textContent = "The password must contain a minimum of 8 characters, including at least one digit";
    return;
  } else {
    passwordError.textContent = "";
  }

  const formData = new FormData(loginForm);
  const data = new URLSearchParams(formData);

  fetch('https://reqres.in/api/user', {
    method: 'POST',
    body: data
  }).then(res => res.json())
    .then(data => {
      setTimeout(() => {
        loginModal.style.display = "none";
        document.location.href = '../public/homeAccounting.html';
      }, 2000);
      console.log(data);
    })
    .catch(error => {
      loginErrorMessage.textContent = 'This';
      console.log(error);
    });
};

const loginForm = document.getElementById('form__login');
loginForm.addEventListener("submit", submitLoginForm);

const usernameInput = document.querySelector('input[name="username"]');
const usernameErrorS = document.getElementById('username-error');
const surnameInput = document.querySelector('input[name="surname"]');
const surnameErrorS = document.getElementById('surname-error');
const emailInputS = document.querySelector('input[name="mailS"]');
const emailErrorS = document.getElementById('signup-email-error');
const confirmEmailInput = document.querySelector('input[name="confirm-mail"]');
const confirmEmailErrorS = document.getElementById('confirm-email-error');
const passwordInputS = document.querySelector('input[name="passS"]');
const passwordErrorS = document.getElementById('signup-password-error');
const confirmPassInput = document.querySelector('input[name="confirm-pass"]');
const confirmPassErrorS = document.getElementById('confirm-password-error');
const signupErrorMessage = document.getElementById('signup__error__message');

const submitSignupForm = (e) => {
  e.preventDefault();

  if (!validateField(usernameInput.value, nameRegex)) {
    usernameErrorS.textContent = "Incorrect username format";
    return;
  } else {
    usernameErrorS.textContent = "";
  }

  if (!validateField(surnameInput.value, nameRegex)) {
    surnameErrorS.textContent = "Incorrect surname format";
    return;
  } else {
    surnameErrorS.textContent = "";
  }

  if (!validateField(emailInputS.value, emailRegex)) {
    emailErrorS.textContent = "Incorrect email format";
    return;
  } else {
    emailErrorS.textContent = "";
  }

  if (emailInputS.value !== confirmEmailInput.value) {
    confirmEmailErrorS.textContent = 'Email addresses do not match';
    return
  } else {
    confirmEmailErrorS.textContent = "";
  }

  if (!validateField(passwordInputS.value, passRegex)) {
    passwordErrorS.textContent = "The password must contain a minimum of 8 characters, including at least one digit";
    return;
  } else {
    passwordErrorS.textContent = "";
  }

  if (passwordInputS.value !== confirmPassInput.value) {
    confirmPassErrorS.textContent = 'Passwords do not match';
    return
  } else {
    confirmPassErrorS.textContent = "";
  }

  const formData = new FormData(signupForm);
  const data = new URLSearchParams(formData);

  fetch('https://reqres.in/api/user', {
    method: 'POST',
    body: data
  }).then(res => res.json())
    .then(data => {
      setTimeout(() => {
        signupModal.style.display = "none";
        document.location.href = '../public/homeAccounting.html';
      }, 2000);
      console.log(data);
    })
    .catch(error => {
      signupErrorMessage.textContent = 'This';
      console.log(error);
    });
};

const signupForm = document.getElementById('form__signup');
signupForm.addEventListener("submit", submitSignupForm);

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

const image1 = document.createElement('img');
image1.alt = 'img';
image1.src = '../img/img.jpeg';
createP.after(image1);

const footer = document.createElement('footer');
footer.textContent = 'by 2023';
document.body.append(footer);