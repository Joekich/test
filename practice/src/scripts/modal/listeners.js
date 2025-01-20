import { openModal, closeModal } from './modal.js';
import { openFileDialog, handleFileUpload, deleteLogo } from './logoUpload.js';
import { validateOrganization, validatePhone, validateEmail, validateSelect, validateLogo} from './validate.js';
import { isOrganizationValid, isPhoneValid, isEmailValid, isSelectValid, isLogoValid } from './validate.js';

const openModalButton = document.getElementById('button__open-modal');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('modal__close-button');
const cancelFormButton = document.getElementById('form__cancel-button');
const logoUpdateBlock = document.getElementById('form__logo-update');
const logoUploadInput = document.getElementById('logo-upload');
const logoDeleteButton = document.getElementById('form__logo-delete-bg');
const submitButton = document.getElementById('form__submit-button');
const organizationInput = document.getElementById('organization-input');
const phoneInput = document.getElementById('phone-input');
const emailInput = document.getElementById('email-input');
const selectInput = document.getElementById('form__select-input');

export function addListeners() {
    openModalButton.addEventListener('click', () => {
        openModal();

        document.addEventListener('mousedown', clickOutside);

        phoneInput.addEventListener('focus', phoneFocus);
        phoneInput.addEventListener('input', handlePhoneInput);

        organizationInput.addEventListener('input', validateOrganization);
        emailInput.addEventListener('input', validateEmail);
        selectInput.addEventListener('change', validateSelect);
        logoUploadInput.addEventListener('change', validateLogo);

        submitButton.addEventListener('click', formSubmit);

        cancelFormButton.addEventListener('click', closeModal);
        closeModalButton.addEventListener('click', closeModal);

        logoUpdateBlock.addEventListener('click', openFileDialog);
        logoUploadInput.addEventListener('change', handleFileUpload);
        logoDeleteButton.addEventListener('click', deleteLogo);
    });
}

export function cleanUpListeners() {
    document.removeEventListener('mousedown', clickOutside);

    phoneInput.removeEventListener('focus', phoneFocus);
    phoneInput.removeEventListener('input', handlePhoneInput);

    organizationInput.removeEventListener('input', validateOrganization);
    emailInput.removeEventListener('input', validateEmail);
    selectInput.removeEventListener('change', validateSelect);
    logoUploadInput.removeEventListener('change', validateLogo);

    submitButton.removeEventListener('click', formSubmit);

    logoUpdateBlock.removeEventListener('click', openFileDialog);
    logoUploadInput.removeEventListener('change', handleFileUpload);
    logoDeleteButton.removeEventListener('click', deleteLogo);

    cancelFormButton.removeEventListener('click', closeModal);
    closeModalButton.removeEventListener('click', closeModal);
}

function clickOutside(event) {
    if (event.target === modal) {
        closeModal();
    }
}

function phoneFocus() {
    if (phoneInput.value.length <= 2) {
        phoneInput.value = '+7';
    }
}

function handlePhoneInput() {
    let value = phoneInput.value;
    value = '+7' + value.slice(2).replace(/\D/g, '');

    if (value.length > 12) {
        value = value.slice(0, 12);
    }

    phoneInput.value = value;
    validatePhone();
}

function formSubmit(event) {
    if (!(isOrganizationValid && isPhoneValid && isEmailValid && isSelectValid && isLogoValid)) {
        event.preventDefault();
        alert('Каким-то магическим образом вам все же удалось нажать на кнопку отправки. К сожалению, ваши данные не будут отправлены, так как при заполнении формы были допущены ошибки (данные не валидны)');
        submitButton.disabled = true;
    }
}