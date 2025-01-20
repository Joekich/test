const logoImage = document.getElementById('logo-image');
const logoUploadInput = document.getElementById('logo-upload');
const defaultLogoSrc = 'practice/src/assets/image/default-profile-image.webp';
const submitButton = document.getElementById('form__submit-button');
const organizationInput = document.getElementById('organization-input');
const phoneInput = document.getElementById('phone-input');
const emailInput = document.getElementById('email-input');
const selectInput = document.getElementById('form__select-input');

export let isOrganizationValid = false;
export let isPhoneValid = false;
export let isEmailValid = false;
export let isSelectValid = false;
export let isLogoValid = false;

export function validateOrganization() {
    const value = organizationInput.value.trim();
    isOrganizationValid = /^[A-Za-zА-Яа-я\s]{3,}$/.test(value);

    const label = organizationInput.labels[0];
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

export function validatePhone() {
    const value = phoneInput.value.trim();
    isPhoneValid = /^\+7\d{10}$/.test(value);

    const label = phoneInput.labels[0];
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

export function validateEmail() {
    const value = emailInput.value.trim();
    isEmailValid = /^(?:[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\u0008\u000B\u000C\u000E-\u001F!\u0023-\u005B\u005D-\u007F]|\\[\u0001-\u0009\u000B\u000C\u000E-\u007F])*")@(?:(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2}|[a-z\d-]*[a-z\d]:(?:[\u0001-\u0008\u000B\u000C\u000E-\u001F\u0021-\u005A\u0053-\u007F]|\\[\u0001-\u0009\u000B\u000C\u000E-\u007F])+)\])$/.test(value);

    const label = emailInput.labels[0];
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

export function validateSelect() {
    isSelectValid = selectInput.value !== '';

    const label = selectInput.labels[0];
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

export function validateLogo() {
    const uploadedLogoSrc = logoImage.src.split('/').pop();
    const defaultLogoFileName = defaultLogoSrc.split('/').pop();

    isLogoValid = uploadedLogoSrc !== defaultLogoFileName;

    const label = logoUploadInput.labels[0];
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

export function validateForm() {
    submitButton.disabled = !(isOrganizationValid && isPhoneValid && isEmailValid && isSelectValid && isLogoValid);
}
