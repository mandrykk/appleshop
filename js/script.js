'use strict';
//Табы//

const tabItems = document.querySelector('.tabheader__items')
const tabItem = document.querySelectorAll('.tabheader__item');
const tabContent = document.querySelectorAll('.tabcontent');

hideTabContent();
showTabContent();

tabItems.addEventListener('click', (e) => {
    //проверяем на делегирование событий
    if (e.target && e.target.classList.contains('tabheader__item')) {
        tabItem.forEach((li, key) => {
            //если при клике это табАйтем, то вызываем функции 
            if (e.target === li) {
                hideTabContent();
                showTabContent(key);
            }
        })
    }


}) 

function hideTabContent() {
    // перебираем контент - убрали / добавили класс
    tabContent.forEach((tabcontent) => {
        tabcontent.classList.remove('active')
        tabcontent.classList.add('inactive')
    });
    // убираем активный класс
    //можно его вынестии отдельно
    tabItem.forEach((item) => {
        item.classList.remove('tabheader__item_active')
    })
}
    

function showTabContent(key = 0) {
    //к key - контента добавляем / убираем класс
    tabContent[key].classList.remove('inactive');
    tabContent[key].classList.add('active');
    // добавляем активный класс
    tabItem[key].classList.add('tabheader__item_active')
}

// находим дом элемент
// отображаем логику программы
// найти элемент
// скрыть элементы
// показать элементы

// Таймер

let deadline = '2022-01-13';

//найти дом элементы
//наметить дедлайн времени
//разница между текущим временем
//отобразить время на сайте с обновлением таймера

const daysDiv = document.getElementById('days');
const hoursDiv = document.getElementById('hours');
const minutesDiv = document.getElementById('minutes');
const secondsDiv = document.getElementById('seconds');
const timerInterval = setInterval(updateTime, 1000);

function timeRemaining () {
    let start = Date.parse(deadline) - Date.parse(new Date()),
    days = Math.floor(start / (1000 * 60 * 60 * 24) % 30),
    hours = Math.floor((start / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((start / (1000 * 60)) % 60),
    seconds = Math.floor((start / 1000) % 60);
    
    return {
        'total': start,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };
}

function addZero(i) {
    if (i >= 0 && i < 10) {
        return `0${i}`;
    } else {
        return i
    }
}

function updateTime() {    
    const obj = timeRemaining()
    daysDiv.innerHTML = addZero(obj.days);
    hoursDiv.innerHTML = addZero(obj.hours);
    minutesDiv.innerHTML = addZero(obj.minutes);
    secondsDiv.innerHTML = addZero(obj.seconds);

    if (obj.start <= 0) {
        clearInterval(timerInterval)
    }
}

// Карточки товаров (функция конструктор)

// function cards(src, alt, subtitle, price, parentDiv) {
//     this.src = src;
//     this.alt = alt;
//     this.subtitle = subtitle;
//     this.price = price;
//     this.parentDiv = document.querySelector('.parent');
//     this.markup = function () {
//         const menuItem = document.createElement('div');
//         menuItem.innerHTML = `
//         <div class="menu__item">
//                 <div style="color:red;">Акция</div>
//                 <img src=${this.src} alt=${this.alt}>
//                 <h3 class="menu__item-subtitle">${this.subtitle}</h3>
//                 <div class="menu__item-price">
//                     <div class="menu__item-cost">Цена:</div>
//                     <div class="menu__item-total"><span>${this.price}</span> грн</div>
//                 </div>
//                 <div class="header__right-block">
//                     <button class="btn btn_white" style="margin:auto">Купить</button>
//                 </div>
//             </div>`
//         this.parentDiv.append(menuItem);
//     }
// }

// const iPhone = new cards('img/iphone.jpeg', 'phone', 'Смартфон Apple iPhone 12 128Gb Starlight', '30.000')
// iPhone.markup()

// const iWatch = new cards('img/iwatch.jpeg', 'elite', 'Смарт-часы Apple Watch Series 6', '12.500')
// iWatch.markup()

// const macbook = new cards('img/macbook.jpeg', 'post', 'Ноутбук APPLE MacBook Pro 13" M1 16/250gb', '44.300')
// macbook.markup()

// использование классов

class Cards {
    constructor(src, alt, subtitle, price, parentDiv, dolar) {
        this.src = src;
        this.alt = alt;
        this.subtitle = subtitle;
        this.price = price;
        this.parentDiv = document.querySelector('.parent');
        this.dolar = 27;
        this.changeToDollar()   
    }

    changeToDollar() {
        this.price = Math.round(this.price * this.dolar);
    }

    markup() {
        const menuItem = document.createElement('div');
        menuItem.innerHTML = `
        <div class="menu__item">
                <div style="color:red;">Акция</div>
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span>$</div>
                </div>
                <div class="header__right-block">
                    <button class="btn btn_white" style="margin:auto">Купить</button>
                </div>
            </div>`
        this.parentDiv.append(menuItem);
    }
}

new Cards('img/iphone.jpeg', 'phone', 'Смартфон Apple iPhone 12 128Gb Starlight', '30.000').markup()

new Cards('img/iwatch.jpeg', 'elite', 'Смарт-часы Apple Watch Series 6', '12.500').markup()

new Cards('img/macbook.jpeg', 'post', 'Ноутбук APPLE MacBook Pro 13" M1 16/250gb', '44.300').markup()

//модальное окно

const openModalBtn = document.querySelectorAll('.btn');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close');
const modalTimeInterval = setInterval(onOpenModal, 5000); //через 5с открытие модального окна без нажатия

openModalBtn.forEach(elem => {
    elem.addEventListener('click', onOpenModal) //NodeList перебираем все эелементы + событие по клику
})

modal.addEventListener('click', onClickClose) //закрытие модалки по клику вне модалки

closeModalBtn.addEventListener('click', onCloseModal) //закрытие модалки по клику на крестик

function onOpenModal() {
    modal.classList.add('open')
}

function onCloseModal() {
    modal.classList.remove('open');
     clearInterval(modalTimeInterval) //по закрытию модалки прекращается всплытие
}

function onClickClose(e) {
    if (e.target === modal) {
        onCloseModal();
    }
}

// модалка при нажатие на крестик скрывается модалка 
// модалка при нажатии по бекдропу закрывается 
// зашла на страницу и через 5 секунд всплывает модальное окно - сетИнтервал
// докрутил до конца страницу - моадлка опять всплывает - то есть скролл остановился в конце и всплывается окно модальное 