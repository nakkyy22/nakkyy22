function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
    console.log('Cookie set:', name, value, expires);
}

// Функция для чтения значения cookie
function getCookie(name) {
    const nameEQ = name + '=';
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            console.log('Cookie found:', name, cookie.substring(nameEQ.length, cookie.length));
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    console.log('Cookie not found:', name);
    return null;
}

// Функция для изменения языка с обновлением страницы
function changeLanguage(languageCode) {
    const validLanguages = ['EN', 'RU', 'KA', 'ES']; // Список поддерживаемых языков
    if (validLanguages.includes(languageCode)) {
        setCookie('lang', languageCode, 365); // Установка cookie на 365 дней
        console.log('Язык установлен на: ' + languageCode);
        location.reload(); // Обновить страницу после изменения языка
    } else {
        console.error('Неверный код языка: ' + languageCode);
    }
}

// Обработка кликов по ссылкам в выпадающем меню
document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();

        // Получение текста выбранного языка
        const selectedLangText = event.target.textContent.trim();

        // Обновление текста кнопки
        const dropbtn = document.querySelector('.dropbtn');
        dropbtn.innerHTML = `${selectedLangText}`;

        // Установка выбранного языка в cookie
        changeLanguage(selectedLangText);
    });
});

// Применение языка из cookie и обновление кнопки при загрузке страницы
window.onload = function () {
    const currentLang = getCookie('lang');
    if (currentLang) {
        document.body.setAttribute('lang', currentLang); // Применить язык
        console.log('Язык загружен из cookie: ' + currentLang);

        // Обновление текста кнопки на основе сохраненного языка
        const dropbtn = document.querySelector('.dropbtn');
        dropbtn.innerHTML = currentLang;
    }
};