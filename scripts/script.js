const initialCards = [
    {
        name: 'Колумбийский университет',
        link:'./images/columbia-university-new-york-city.jpg'
    },
    {
        name: 'Фреско национальный университет',
        link:'/images/frescos-national-university-mexico.jpg'     
    },
    {
        name: 'Хэндли, здание библиотеки',
        link:'./images/handley-library-building-in-winchester.jpg'      
    },
    {
        name: 'Национальная библиотека Буэнос-Айреса',
        link: './images/national-library-buenos-aires-argentina.jpg'     
    },
    {
        name: 'Португальская королевская библиотека',
        link: './images/royal-portuguese-cabinet-reading-rio.jpg'
    },
    {
        name: 'Упсала, здание библиотеки',
        link:  './images/uppsala-university-library.jpg' 
    }
];

const popupProfile = document.querySelector('.popup_profile');
const popupAdd= document.querySelector('.popup_add');
const editButton = document.querySelector('.profile__edit-button');
const formEdit = document.getElementById('form-edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const popups = document.querySelectorAll('popup');


const addButton = document.querySelector('.profile__add-button');


const closeButtons = document.querySelectorAll('.popup__close-button');



const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

const formAdd = document.getElementById('form-add');


const inputPlace = document.getElementById('input-place');
const inputLink = document.getElementById('input-link');

const initialCardsTemplate = document.querySelector('#initial-card').content;
const cardList = document.querySelector('.cards');

const popupZoomImg = document.querySelector('.popup_view');
const popupImg = document.querySelector('.popup__image');
const popupViewTitle = document.querySelector('.popup__view-title');

function openPopup(popupArg){
    popupArg.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
    popupArg.addEventListener('click', popupCloseOverlay);
    if(popupArg === (popupAdd || popupProfile)){
        const submitButton = popupArg.querySelector(configuration.submitButtonSelector);
        submitButton.classList.add(configuration.inactiveButtonClass);
        submitButton.disabled = true;
    }
};

function closePopup(popupArg){
    popupArg.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
    popupArg.removeEventListener('click', popupCloseOverlay);
};

//функция редактирования
function openProfilePopup(){
    openPopup(popupProfile);
    inputName.value=profileName.textContent;
    inputDescription.value=profileDescription.textContent;
};

//функция закрытия
function closeActivePopup(){
    const popupActive = document.querySelector('.popup_opened');
    if (popupActive){
        closePopup(popupActive);
    }
};

//функция изменения данных
function changeProfileData(evt){
    evt.preventDefault();
    console.log('Форма отправлена');
    profileName.textContent=inputName.value;
    profileDescription.textContent=inputDescription.value;
    closeActivePopup();
};



function likeCardSetListener(evt)
{
   evt.querySelector('.card__like-button').addEventListener('click',function(evt){
       evt.target.classList.toggle('card__like-button_active');
   });
};

function deleteCardSetListener(evt){
    evt.querySelector('.card__delete-button').addEventListener('click',function(evt){
        evt.target.closest('.card').remove();
    });
};

//инициализация элементов со значениями
function initiateCard(element){
    const cardsElement = initialCardsTemplate.cloneNode(true);
    const cardImg = cardsElement.querySelector('.card__image');// 
    cardImg.src = element.link;
    cardImg.alt = element.name; 
    const cardTitle = cardsElement.querySelector('.card__title');// 
    cardTitle.textContent = element.name;
    likeCardSetListener(cardsElement);
    deleteCardSetListener(cardsElement);
    cardImg.addEventListener('click',function(){
        console.log(popupZoomImg);
        popupImg.src = element.link;
        popupImg.alt = element.name;
        popupViewTitle.textContent = element.name;
        openPopup(popupZoomImg);
    });
    return cardsElement;
}

function renderCards(element){
    const cardsElement = initiateCard(element);
    cardList.prepend(cardsElement);
}

function renderInitialCards(){
    initialCards.forEach(renderCards);
};
renderInitialCards();


//добавление новой карточки на экран
function addNewCard(evt){
    evt.preventDefault();
    const element = {
        name: inputPlace.value,
        link: inputLink.value
    }
    renderCards(element);
    formAdd.reset();
    closeActivePopup();
}  
//Закрытие попапоd по клику на оверлей 
function popupCloseOverlay(evt) {
    if (evt.target.classList.contains('popup')){
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};
  //Закрытие попапов по клику на Esc
  const closePopupEscape = (evt) => {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }

  };


editButton.addEventListener('click',openProfilePopup);
formEdit.addEventListener('submit',changeProfileData);
addButton.addEventListener('click',function(){
    
    openPopup(popupAdd);
});
closeButtons.forEach(function(item){
    item.addEventListener('click', closeActivePopup);
});
formAdd.addEventListener('submit',addNewCard);