import { addListeners, cleanUpListeners } from './listeners.js';

export const modal = document.getElementById('modal');

export function getScrollbarWidth() {
    const div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.style.overflow = 'scroll';
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
}

export function openModal() {
    const scrollbarWidth = getScrollbarWidth();
    modal.classList.add('modal--visible');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    addListeners();
}

export function closeModal() {
    modal.classList.remove('modal--visible');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    cleanUpListeners();
}
