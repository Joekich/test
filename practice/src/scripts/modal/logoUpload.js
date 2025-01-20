import { validateLogo } from './validate.js';

const defaultLogo = 'practice/src/assets/image/default-profile-image.webp';
const logoImage = document.getElementById('logo-image');
const logoUploadInput = document.getElementById('logo-upload');
const logoDeleteButton = document.getElementById('form__logo-delete-bg');

export function openFileDialog() {
    logoUploadInput.click();
}

export function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

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

export function deleteLogo(event) {
    event.stopPropagation();
    logoImage.src = defaultLogo;
    logoImage.alt = 'Default Logo';
    logoUploadInput.value = '';
    logoDeleteButton.classList.remove('form__logo-delete-bg--visible');
    validateLogo();
}