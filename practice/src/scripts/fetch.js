const tableBody = document.querySelector('.table__body');
const headers = document.querySelectorAll('.table__header-cell');
const searchInput = document.querySelector('.table__search');
let posts = [];
let filteredPosts = [];
let currentSortColumn = null;
let sortOrder = {};

async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    posts = await response.json();
    filteredPosts = posts;
    sortTable('userId');
}

function highlightText(text, query) {
    if (query.length < 3) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function renderTable(data, query = '') {
    tableBody.innerHTML = data.map(post => `
        <tr class="table__body-row">
            <td class="table__body-cell">${highlightText(post.userId.toString(), query)}</td>
            <td class="table__body-cell">${highlightText(post.id.toString(), query)}</td>
            <td class="table__body-cell">${highlightText(post.title, query)}</td>
            <td class="table__body-cell">${highlightText(post.body, query)}</td>
        </tr>
    `).join('');
}

function resetHeaderStyles() {
    headers.forEach(header => header.classList.remove(
        'table__header-cell--active',
        'table__header-cell--ascending',
        'table__header-cell--descending'
    ));
}

function updateHeaderStyles(column, isAscending) {
    const activeHeader = document.querySelector(`[data-column="${column}"]`);
    activeHeader.classList.add('table__header-cell--active');
    activeHeader.classList.add(isAscending ? 'table__header-cell--ascending' : 'table__header-cell--descending');
}

function sortTable(column, shouldToggleSort = true) {
    const isSameColumn = currentSortColumn === column;

    let isAscending;
    if (shouldToggleSort) {
        isAscending = isSameColumn ? !sortOrder[column] : true;
    } else {
        isAscending = sortOrder[column] ?? true;
    }

    resetHeaderStyles();
    updateHeaderStyles(column, isAscending);

    sortOrder[column] = isAscending;
    currentSortColumn = column;

    const sortedData = [...filteredPosts].sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        if (aValue < bValue) return isAscending ? -1 : 1;
        if (aValue > bValue) return isAscending ? 1 : -1;
        return 0;
    });

    filteredPosts = sortedData;
    renderTable(sortedData, searchInput.value);
}

function searchFilter(query) {
    filteredPosts = query.length >= 3
        ? posts.filter(post => Object.values(post).some(value =>
            value.toString().toLowerCase().includes(query.toLowerCase())
        ))
        : posts;
    sortTable(currentSortColumn || 'userId', false);
}

headers.forEach(header => {
    header.addEventListener('click', () => sortTable(header.dataset.column));
});

searchInput.addEventListener('input', event => {
    searchFilter(event.target.value);
});

fetchData();
