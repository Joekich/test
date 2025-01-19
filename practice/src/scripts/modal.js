const openModalButton = document.querySelector('#button__open-modal');
const modal = document.querySelector('#modal');
const closeModalButton = document.querySelector('#modal__close-button');
const cancelFormButton = document.querySelector('#form__cancel-button');
const body = document.body;
const logoUpdateBlock = document.querySelector('#form__logo-update');
const logoImage = document.querySelector('#logo-image');
const logoUploadInput = document.querySelector('#logo-upload');
const logoDeleteButton = document.querySelector('#form__logo-delete-bg');
const defaultLogo = 'practice/src/assets/image/default-profile-image.webp';
const submitButton = document.querySelector('#form__submit-button');
const organizationInput = document.querySelector('#organization-input');
const phoneInput = document.querySelector('#phone-input');
const emailInput = document.querySelector('#email-input');
const selectInput = document.querySelector('#form__select-input');

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
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${scrollbarWidth}px`;
}

function closeModal() {
    modal.classList.remove('modal--visible');
    body.style.overflow = '';
    body.style.paddingRight = '';
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
            validateForm();
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            logoImage.src = e.target.result;
            logoImage.alt = 'User Logo';
            validateForm();
        };
        reader.readAsDataURL(file);
    }
}

function deleteLogo(event) {
    event.stopPropagation();
    logoImage.src = defaultLogo;
    logoImage.alt = 'Default Logo';
    logoUploadInput.value = '';
    validateForm();
}

function validateOrganization() {
    const value = organizationInput.value.trim();
    return /^[A-Za-zА-Яа-я\s]{3,}$/.test(value);
}

function validatePhone() {
    const value = phoneInput.value.trim();
    return /^\+7\d{10}$/.test(value);
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^(?:[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\u0008\u000B\u000C\u000E-\u001F!\u0023-\u005B\u005D-\u007F]|\\[\u0001-\u0009\u000B\u000C\u000E-\u007F])*")@(?:(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2}|[a-z\d-]*[a-z\d]:(?:[\u0001-\u0008\u000B\u000C\u000E-\u001F\u0021-\u005A\u0053-\u007F]|\\[\u0001-\u0009\u000B\u000C\u000E-\u007F])+)])$/;
    return emailRegex.test(value);
}

function validateSelect() {
    return selectInput.value !== '';
}

function validateLogo() {
    const uploadedLogoSrc = logoImage.src.split('/').pop();
    const defaultLogoFileName = defaultLogoSrc.split('/').pop();
    return uploadedLogoSrc !== defaultLogoFileName;
}

function validateField(id, validationFunction, invalidMessage) {
    const field = document.getElementById(id);
    if (!field) return;

    const isFieldValid = validationFunction();
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) {
        label.dataset.tooltip = isFieldValid ? "Поле заполнено корректно" : invalidMessage;

        const requiredSign = label.querySelector('[data-required-sign]');
        if (requiredSign) {
            requiredSign.style.color = isFieldValid ? "green" : "red";
        }
    }
}

function validateForm() {
    validateField('organization-input', validateOrganization, "Название организации должно состоять минимум из 3-х символов");
    validateField('phone-input', validatePhone, "Номер телефона должен состоять из 11 цифр и начинаться на +7");
    validateField('email-input', validateEmail, "Введите корректный email (латиницей) - например YourEmail@mail.ru");
    validateField('form__select-input', validateSelect, "Выберите направление в выпадающем списке");
    validateField('logo-upload', validateLogo, "Загрузите логотип в формате jpeg/png");

    const isFormValid = validateOrganization() && validatePhone() && validateEmail() && validateSelect() && validateLogo();

    submitButton.disabled = !isFormValid;
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
    validateForm();
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

organizationInput.addEventListener('input', validateForm);
phoneInput.addEventListener('input', validateForm);
emailInput.addEventListener('input', validateForm);
selectInput.addEventListener('change', validateForm);
logoUploadInput.addEventListener('change', validateForm);

validateForm();