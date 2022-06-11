import '../pages/index.css';
import { Card } from "../components/Card.js";
import { formValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api, Api } from '../components/Api.js';
import { data } from 'autoprefixer';
const ColumbImg = new URL('../images/columbia-university-new-york-city.jpg', import.meta.url);
const FrescoImg = new URL('../images/frescos-national-university-mexico.jpg', import.meta.url);
const HandleyImg = new URL('../images/handley-library-building-in-winchester.jpg', import.meta.url);
const BuenosImg = new URL('../images/national-library-buenos-aires-argentina.jpg', import.meta.url);
const PortugueseImg = new URL('../images/royal-portuguese-cabinet-reading-rio.jpg', import.meta.url);
const UpsalaImg = new URL('../images/uppsala-university-library.jpg', import.meta.url);

let userId;

api.getProfile()
.then(res => {
  console.log(res.avatar);
  userInfo.setUserInfo({name: res.name, job: res.about, avatar: res.avatar});
  document.querySelector('.profile__avatar').style.backgroundImage = `url(${res.avatar})`;
  userId = res._id;
})
.catch ((err) => console.log(err));
api.getInitialCards()
.then(cardList => {
  cardList.forEach((data) => {
    const newCard = renderCards({ 
      name: data.name,
      link: data.link, 
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    });
    
    initCards.addItem(newCard);
  })
})
.catch ((err) => console.log(err));
 
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
const popupAvatar = document.querySelector('.popup_avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

const avatarOpenEdit = document.querySelector('.profile__edit-avatar');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const formAdd = document.getElementById('form-add');

//создаем объекты классов для валидации форм
const validatorEditProfile = new formValidator(configuration, popupProfile);
const validatorAddCard = new formValidator(configuration, popupAdd);
const validatorEditAvatar = new formValidator(configuration, popupAvatar);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();
//создаем объект класса для считывания информации из полей 
const userInfo = new UserInfo('.profile__title','.profile__subtitle', '.profile__avatar');

//создаем класс формы для редактирования шапки сайта
const popupProfileEdit = new PopupWithForm('.popup_profile',  
  {
  formSubmit: (data) => {
    popupProfileEdit.renderLoad(true);
    api.editProfile(data.name, data.about)
    .then (res => {
      userInfo.setUserInfo({ name: data.name, job: data.about });
      popupProfileEdit.close();
    })
    .catch ((err) => console.log(err))
    .finally(() => popupProfileEdit.renderLoad(false))
  }}
)
//вешаем слушатели
popupProfileEdit.setEventListeners();
//
//Редактирование профиля
profileEditButton.addEventListener('click', function() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name; 
  inputDescription.value = userData.job;
  validatorEditProfile.clearError();
  popupProfileEdit.open();
});

const popupEditAvatar = new PopupWithForm('.popup_avatar',  
  {
  formSubmit: (data) => {
    popupEditAvatar.renderLoad(true);
    api.editAvatar(data.link)
      .then(res => {
        document.querySelector('.profile__avatar').style.backgroundImage = `url(${res.avatar})`;
        console.log(res);
        userInfo.setUserInfo({name: res.name, job: res.about, avatar: res.avatar});
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupEditAvatar.renderLoad(false))
  }}
)

popupEditAvatar.setEventListeners();

//Редактирование аватара
avatarOpenEdit.addEventListener('click', function() {
  validatorEditAvatar.clearError();
  validatorEditAvatar.toggleButtonState();
  popupEditAvatar.open();
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
    const card = new Card(element,'#initial-card', handleCardClick, 
    (id) => {
      popupConfirmDelete.open();
      popupConfirmDelete.changeFormSubmit(() =>{
        api.deleteCard(id);
        card.deleteCard();
        popupConfirmDelete.close();
      })
    },
    (id) => {
     if(card.isLiked()){
        api.deleteLike(id)
        .then ((res) => card.setLikes(res.likes))
        .catch ((err) => console.log(err));
    }
    else{
      api.addLike(id)
      .then ((res) => card.setLikes(res.likes))
      .catch ((err) => console.log(err));
    }
    });
    return card.initiateCard();
}
//создаем объект с карточками
const initCards = new Section(
    {
   items: [],
    renderer: (item) => initCards.addItem(renderCards(item))
    },'.cards');
//инициализируем карточки
initCards.renderItems();
//создаем класс формы для добавления карточки
const popupAddCard = new PopupWithForm('.popup_add',  
  {
  formSubmit: (data) => {
    popupAddCard.renderLoad(true);
    api.addCard(data['place'], data['link'])
    .then (res =>{
      const newCard = renderCards({ 
        name: res.name, 
        link: res.link, 
        likes: res.likes, 
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      });    
      initCards.addItem(newCard);
      popupAddCard.close();
    })
    .catch ((err) => console.log(err))
    .finally(()=>popupAddCard.renderLoad(false)) 
  }}
);

const popupConfirmDelete = new PopupWithForm('.popup_confirm',()=>{});

popupConfirmDelete.setEventListeners();
//
popupAddCard.setEventListeners();
//открытие формы добавления карточки
popupAddButton.addEventListener('click', function() {
  formAdd.reset();
  validatorAddCard.clearError();
  validatorAddCard.toggleButtonState();
  popupAddCard.open();
});