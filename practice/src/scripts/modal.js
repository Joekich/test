const openModalButton = document.getElementById('button__open-modal');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('modal__close-button');
const cancelFormButton = document.getElementById('form__cancel-button');
const logoUpdateBlock = document.getElementById('form__logo-update');
const logoImage = document.getElementById('logo-image');
const logoUploadInput = document.getElementById('logo-upload');
const logoDeleteButton = document.getElementById('form__logo-delete-bg');
const defaultLogo = 'practice/src/assets/image/default-profile-image.webp';
const submitButton = document.getElementById('form__submit-button');
const organizationInput = document.getElementById('organization-input');
const phoneInput = document.getElementById('phone-input');
const emailInput = document.getElementById('email-input');
const selectInput = document.getElementById('form__select-input');

let isOrganizationValid = false;
let isPhoneValid = false;
let isEmailValid = false;
let isSelectValid = false;
let isLogoValid = false;
let scrollbarWidth = 0;
const defaultLogoSrc = 'practice/src/assets/image/default-profile-image.webp';

function getScrollbarWidth() {
    const div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.style.overflow = 'scroll';
    document.body.appendChild(div);
    scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
}

function openModal() {
    getScrollbarWidth();
    modal.classList.add('modal--visible');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    validateOrganization();
    validatePhone();
    validateEmail();
    validateSelect();
    validateLogo();
}

function closeModal() {
    modal.classList.remove('modal--visible');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

function openFileDialog() {
    logoUploadInput.click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const allowedExtensions = /\.(jpe?g|png)$/i;
        if (!allowedExtensions.test(file.name)) {
            alert('Вы пытаетесь загрузить неподходящий файл. Пожалуйста, выберите картинку с расширением JPEG или PNG.');
            logoUploadInput.value = '';
            validateLogo();
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            logoImage.src = e.target.result;
            logoImage.alt = 'User Logo';
            logoDeleteButton.classList.add('form__logo-delete-bg--visible');
            validateLogo();
        };
        reader.readAsDataURL(file);
    }
}

function deleteLogo(event) {
    event.stopPropagation();
    logoImage.src = defaultLogo;
    logoImage.alt = 'Default Logo';
    logoUploadInput.value = '';
    logoDeleteButton.classList.remove('form__logo-delete-bg--visible');
    validateLogo();
    validateForm();
}

function validateOrganization() {
    const value = organizationInput.value.trim();
    isOrganizationValid = /^[A-Za-zА-Яа-я\s]{3,}$/.test(value);

    const label = document.querySelector('label[for="organization-input"]');
    if (label) {
        label.dataset.tooltip = isOrganizationValid
            ? 'Поле заполнено корректно'
            : 'Название организации должно состоять минимум из 3-х символов';

        const requiredSign = label.querySelector('[data-required-sign]');
        if (requiredSign) {
            requiredSign.style.color = isOrganizationValid ? 'green' : 'red';
        }
    }

    validateForm();
}

function validatePhone() {
    const value = phoneInput.value.trim();
    isPhoneValid = /^\+7\d{10}$/.test(value);

    const label = document.querySelector('label[for="phone-input"]');
    if (label) {
        label.dataset.tooltip = isPhoneValid
            ? 'Поле заполнено корректно'
            : 'Номер телефона должен состоять из 11 цифр и начинаться на +7';

        const requiredSign = label.querySelector('[data-required-sign]');
        if (requiredSign) {
            requiredSign.style.color = isPhoneValid ? 'green' : 'red';
        }
    }

    validateForm();
}

function validateEmail() {
    const value = emailInput.value.trim();
    isEmailValid = /^(?:[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\u0008\u000B\u000C\u000E-\u001F!\u0023-\u005B\u005D-\u007F]|\\[\u0001-\u0009\u000B\u000C\u000E-\u007F])*")@(?:(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2}|[a-z\d-]*[a-z\d]:(?:[\u0001-\u0008\u000B\u000C\u000E-\u001F\u0021-\u005A\u0053-\u007F]|\\[\u0001-\u0009\u000B\u000C\u000E-\u007F])+)])$/.test(value);
    
    const label = document.querySelector('label[for="email-input"]');
    if (label) {
        label.dataset.tooltip = isEmailValid
            ? 'Поле заполнено корректно'
            : 'Введите корректный email (например YourEmail@mail.ru)';

        const requiredSign = label.querySelector('[data-required-sign]');
        if (requiredSign) {
            requiredSign.style.color = isEmailValid ? 'green' : 'red';
        }
    }

    validateForm();
}


function validateSelect() {
    isSelectValid = selectInput.value !== '';

    const label = document.querySelector('label[for="form__select-input"]');
    if (label) {
        label.dataset.tooltip = isSelectValid
            ? 'Поле заполнено корректно'
            : 'Выберите направление в выпадающем списке';

        const requiredSign = label.querySelector('[data-required-sign]');
        if (requiredSign) {
            requiredSign.style.color = isSelectValid ? 'green' : 'red';
        }
    }

    validateForm();
}

function validateLogo() {
    const uploadedLogoSrc = logoImage.src.split('/').pop();
    const defaultLogoFileName = defaultLogoSrc.split('/').pop();

    isLogoValid = uploadedLogoSrc !== defaultLogoFileName;

    const label = document.querySelector('label[for="logo-upload"]');
    if (label) {
        label.dataset.tooltip = isLogoValid
            ? 'Поле заполнено корректно'
            : 'Загрузите логотип в формате JPEG/PNG';

        const requiredSign = label.querySelector('[data-required-sign]');
        if (requiredSign) {
            requiredSign.style.color = isLogoValid ? 'green' : 'red';
        }
    }

    validateForm();
}

function validateForm() {
    submitButton.disabled = !(isOrganizationValid && isPhoneValid && isEmailValid && isSelectValid && isLogoValid);
}

phoneInput.addEventListener('focus', () => {
    if (phoneInput.value.length <= 2) {
        phoneInput.value = '+7';
    }
});

phoneInput.addEventListener('input', () => {
    let value = phoneInput.value;

    value = '+7' + value.slice(2).replace(/\D/g, '');
  
    if (value.length > 12) {
        value = value.slice(0, 12);
    }

    phoneInput.value = value;
    validatePhone();
});

organizationInput.addEventListener('input', () => {
    validateOrganization();
})

emailInput.addEventListener('input', () =>{
    validateEmail();
})

selectInput.addEventListener('change', () => {
    validateSelect();
})

logoUploadInput.addEventListener('change', () => {
    validateLogo();
});

submitButton.addEventListener('click', (event) => {
    if (!(isOrganizationValid && isPhoneValid && isEmailValid && isSelectValid && isLogoValid)) {
        event.preventDefault();
        alert('Каким-то магическим образом вам все же удалось нажать на кнопку отправки. К сожалению, ваши данные не будут отправлены, так как при заполнении формы были допущены ошибки (данные не валидны)');
    }
});

document.addEventListener('mousedown', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.querySelectorAll('[data-required-sign]').forEach((el) => {
    el.textContent = '\u2217';
});

openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
cancelFormButton.addEventListener('click', (event) => {
    event.preventDefault();
    closeModal();
});

logoUpdateBlock.addEventListener('click', openFileDialog);
logoUploadInput.addEventListener('change', handleFileUpload);
logoDeleteButton.addEventListener('click', deleteLogo);

validateForm();