import '../pages/index.css';
import { Card } from "../components/Card.js";
import { formValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
const ColumbImg = new URL('../images/columbia-university-new-york-city.jpg', import.meta.url);
const FrescoImg = new URL('../images/frescos-national-university-mexico.jpg', import.meta.url);
const HandleyImg = new URL('../images/handley-library-building-in-winchester.jpg', import.meta.url);
const BuenosImg = new URL('../images/national-library-buenos-aires-argentina.jpg', import.meta.url);
const PortugueseImg = new URL('../images/royal-portuguese-cabinet-reading-rio.jpg', import.meta.url);
const UpsalaImg = new URL('../images/uppsala-university-library.jpg', import.meta.url);




const initialCards = [
    {
        name: 'Колумбийский университет',
        link: ColumbImg
    },
    {
        name: 'Фреско национальный университет',
        link: FrescoImg     
    },
    {
        name: 'Хэндли, здание библиотеки',
        link: HandleyImg
    },
    {
        name: 'Национальная библиотека Буэнос-Айреса',
        link: BuenosImg
    },
    {
        name: 'Португальская королевская библиотека',
        link: PortugueseImg
    },
    {
        name: 'Упсала, здание библиотеки',
        link:  UpsalaImg
    }
];

const configuration = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
}
const popupProfile = document.querySelector('.popup_profile');
const popupAdd= document.querySelector('.popup_add');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const formAdd = document.getElementById('form-add');

//создаем объекты классов для валидации форм
const validatorEditProfile = new formValidator(configuration, popupProfile);
const validatorAddCard = new formValidator(configuration, popupAdd);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
//создаем объект класса для считывания информации из полей 
const userInfo = new UserInfo('.profile__title','.profile__subtitle');

//создаем класс формы для редактирования шапки сайта
const popupProfileEdit = new PopupWithForm('.popup_profile',  
  {
  formSubmit: (data) => { 
    userInfo.setUserInfo({ name: data['name'], job: data['about'] });
    popupProfileEdit.close();
  }}
)
//вешаем слушатели
popupProfileEdit.setEventListeners();

//Редактирование профиля
profileEditButton.addEventListener('click', function() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name; 
  inputDescription.value = userData.job;
  editProfileValidator.clearError();
  popupProfileEdit.open();
});
//создаем объект класса для зума
const popupZoomImage = new PopupWithImage('.popup_view') 

//вешаем слушатели
popupZoomImage.setEventListeners();

//Открытие картинки
function handleCardClick(name, link) {
    popupZoomImage.open(name, link);
}
//функция возвращает новую карточку
function renderCards(element){
    const card = new Card(element,'#initial-card', handleCardClick);
    return card.initiateCard();
}
//создаем объект с карточками
const initCards = new Section(
    {
    items:initialCards,
    renderer: (item) => initCards.addItem(renderCards(item))
    },'.cards');
//инициализируем карточки
initCards.renderItems();
//создаем класс формы для добавления карточки
const popupAddCard = new PopupWithForm('.popup_add',  
  {
  formSubmit: (data) => {
    const newCard = renderCards({ name: data['place'], link: data['link'] });    
    initCards.addItem(newCard);
    popupAddCard.close();
    formElementCard.reset();
  }}
);
//
popupAddCard.setEventListeners();
//открытие формы добавления карточки
popupAddButton.addEventListener('click', function() {
  formAdd.reset();
  addCardValidator.clearError();
  addCardValidator.toggleButtonState();
  popupAddCard.open();
});