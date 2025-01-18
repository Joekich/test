const openModalButton = document.querySelector('.button__open-modal');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal__close-button');
const cancelFormButton = document.querySelector('.form__cancel-button');
const body = document.body;
const logoUpdateBlock = document.querySelector('.form__logo-update');
const logoImage = document.querySelector('#logo-image');
const logoUploadInput = document.querySelector('#logo-upload');
const logoDeleteButton = document.querySelector('.form__logo-delete-bg');
const defaultLogo = 'practice/src/assets/image/default-profile-image.webp';
const submitButton = document.querySelector('.form__submit-button');
const organizationInput = document.querySelector('input[name="organization"]');
const phoneInput = document.querySelector('input[name="phone"]');
const emailInput = document.querySelector('input[name="email"]');
const selectInput = document.querySelector('.form__select-input');

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
        const reader = new FileReader();
        reader.onload = function(e) {
            logoImage.src = e.target.result;
            logoImage.alt = 'User Logo';
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

function validateForm() {
    const isOrganizationValid = validateOrganization();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isDirectionSelected = validateSelect();
    const isLogoUploaded = validateLogo();

    const isFormValid = isOrganizationValid && isPhoneValid && isEmailValid && isDirectionSelected && isLogoUploaded;

    submitButton.disabled = !isFormValid;
    submitButton.style.cursor = isFormValid ? 'pointer' : 'not-allowed';
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
    const emailRegex = /^[a-zA-Z0-9._@\s-]+@(gmail\.com|yandex\.ru|mail\.ru)$/;
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

document.addEventListener('mousedown', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.querySelectorAll('.form__required-sign').forEach((el) => {
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