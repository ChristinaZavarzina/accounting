"use strict"

const html = document.querySelector('html');
const loginModal = document.getElementById('login__modal');
const signupModal = document.getElementById('signup__modal');
const emailModal = document.getElementById('email__modal');
const passModal = document.getElementById('pass__modal');

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

const closeModalHandler = (modal, button) => {
  button.addEventListener('click', () => {
    closeModal(modal);
    html.classList.add('modal__open');
  });
}

const loginButton = document.getElementById('open__login');
const signupButton = document.getElementById('open__signup');
const resetButton = document.getElementById('reset__password');
openModalHandler(loginModal, loginButton);
openModalHandler(signupModal, signupButton);
openModalHandler(emailModal, resetButton);
closeModalHandler(loginModal, resetButton);

const clearInputs = () => {
  const inputFields = document.querySelectorAll('.modal__content input');
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

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;

const validateField = (value, regex) => {
  return regex.test(value);
};

const errorMessage = document.querySelectorAll('.error__message');
const notExistError = document.querySelectorAll('.not-exist__error');
const infoSucces = document.querySelectorAll('.info');

const showElement = (elements) => {
  elements.forEach(element => {
    element.style.display = "block";
  });
};

const hideElement = (elements) => {
  elements.forEach(element => {
    element.style.display = "none";
  });
};

const setMessage = (elements, message) => {
  elements.forEach(element => {
    element.textContent = message;
  });
};


const submitLoginForm = (e) => {
  const emailInput = document.querySelector('input[name="mail"]');
  const passwordInput = document.querySelector('input[name="pass"]');
  e.preventDefault();

  if (!emailInput.value || !passwordInput.value) {
    setMessage(errorMessage, "Please fill in both email and password");
    return;
  }

  const formData = new FormData(loginForm);
  const data = new URLSearchParams(formData);

  fetch('https://reqres.in/api/user', {
    method: 'POST',
    body: data
  }).then(res => res.json())
  .then(data => {
    if (data) {
      setTimeout(() => {
        loginModal.style.display = "none";
        document.location.href = '../public/homeAccounting.html';
      }, 2000);
    } else {
      setMessage(notExistError, data);
    }
    console.log(data);
  }).catch(error => {
    setMessage(errorMessage, "No server connection");
    console.log(error);
  });
};
const loginForm = document.getElementById('form__login');
loginForm.addEventListener("submit", submitLoginForm);

const submitSignupForm = (e) => {
  const usernameInput = document.querySelector('input[name="username"]');
  const usernameErrorS = document.getElementById('username__error');
  const surnameInput = document.querySelector('input[name="surname"]');
  const surnameErrorS = document.getElementById('surname__error');
  const emailInputS = document.querySelector('input[name="mailS"]');
  const emailErrorS = document.getElementById('signup__email-error');
  const confirmEmailInput = document.querySelector('input[name="confirm-mail"]');
  const confirmEmailErrorS = document.getElementById('confirm__email-error');
  const passwordInputS = document.querySelector('input[name="passS"]');
  const passwordErrorS = document.getElementById('signup__password-error');
  const confirmPassInput = document.querySelector('input[name="confirm-pass"]');
  const confirmPassErrorS = document.getElementById('confirm__password-error');
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
    if (data) {
      setTimeout(() => {
        signupModal.style.display = "none";
        document.location.href = '../public/homeAccounting.html';
      }, 2000);
    } else {
      setMessage(notExistError, data);
    }
    console.log(data);
  }).catch(error => {
    setMessage(errorMessage, "No server connection");
    console.log(error);
  });
};
const signupForm = document.getElementById('form__signup');
signupForm.addEventListener("submit", submitSignupForm);

const handleServerResponse = (data) => {
  if (data.success === true) {
    passForm.style.display = "block";
  } else {
    setMessage(errorMessage, "No server connection"); // текст моно любой
  }
};

const submitResetForm = (e) => {
  e.preventDefault();
  const emailInputR = document.querySelector('input[name="reset-mail"]');
  const emailErrorR = document.getElementById('reset__error');

  if (!validateField(emailInputR.value, emailRegex)) {
    emailErrorR.textContent = "Incorrect email format";
    return;
  } else {
    emailErrorR.textContent = "";
  }
  showElement(infoSucces);

  const formData = new FormData(resetForm);
  const data = new URLSearchParams(formData);

  fetch('https://reqres.in/api/user', {
    method: 'POST',
    body: data
  }).then(res => res.json())
  .then(data => {
    if (data.success === true) {
      setTimeout(() => {
        handleServerResponse(data);
        hideElement(infoSucces);
      }, 2000);
    } else {
      setMessage(notExistError, data);
    }
    console.log(data);
  }).catch(error => {
    setMessage(errorMessage, "No server connection");
    console.log(error);
  });
};
const resetForm = document.getElementById('form__email');
resetForm.addEventListener("submit", submitResetForm);

const submitPassForm = (e) => {
  e.preventDefault();
  const passInputP = document.querySelector('input[name="new-password"]');
  const passErrorP = document.getElementById('password__error');
  const confirmPassP = document.querySelector('input[name="confirm__new-password"]');
  const passConfirmErrorR = document.getElementById('confirm__password-error');

  if (!validateField(passInputP.value, passRegex)) {
    passErrorP.textContent = "The password must contain a minimum of 8 characters, including at least one digit";
    return;
  } else {
    passErrorP.textContent = "";
  }

  if (passInputP.value !== confirmPassP.value) {
    passConfirmErrorR.textContent = 'Passwords do not match';
    return
  } else {
    passConfirmErrorR.textContent = "";
  }
  showElement(infoSucces);

  const formData = new FormData(passForm);
  const data = new URLSearchParams(formData);

  fetch('https://reqres.in/api/user', {
    method: 'POST',
    body: data
  }).then(res => res.json())
  .then(data => {
    if (data.success === true) {
      setTimeout(() => {
        passModal.style.display = "none";
        hideElement(infoSucces);
      }, 2000);
    } else {
      setMessage(notExistError, data);
    }
    console.log(data);
  }).catch(error => {
    setMessage(errorMessage, "No server connection");
    console.log(error);
  });
};
const passForm = document.getElementById('form__pass');
passForm.addEventListener("submit", submitPassForm);

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