import '../pages/index.css';
import {
  configuration,
  popupProfile,
  popupAdd,
  popupAvatar,
  profileEditButton,
  popupAddButton,
  avatarOpenEdit,
  inputName,
  inputDescription,
  formAdd,
  formEdit 
} from '../utils/constants.js'; 
import { Card } from "../components/Card.js";
import { formValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import {PopupWithSubmit} from '../components/PopupWithSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { api, Api } from '../components/Api.js';
import { data } from 'autoprefixer';

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([res, cardList]) => {

    userInfo.setUserInfo({name: res.name, job: res.about, avatar: res.avatar});
    document.querySelector('.profile__avatar').style.backgroundImage = `url(${res.avatar})`;
    userId = res._id;
    
    cardList.forEach((data) => {
      const newCard = renderCards({ 
        name: data.name,
        link: data.link, 
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      });
      initCards.addItemI(newCard);   
    })

  })
  .catch((err) => {
    console.log(err);
});

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
  formEdit.reset();
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
        api.deleteCard(id)
        .then((res) => {
          card.deleteCard();
          popupConfirmDelete.close();
        })
        .catch((err) => {
          console.log(err);
      })  
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
    renderer: (item) => initCards.addItemI(item)
    },'.cards');



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
     // location.reload();
      popupAddCard.close();
  })
    .catch ((err) => console.log(err))
    .finally(()=>popupAddCard.renderLoad(false)) 
  }
}
);

const popupConfirmDelete = new PopupWithSubmit('.popup_confirm',()=>{});

popupConfirmDelete.setEventListeners();
//
popupAddCard.setEventListeners();
//открытие формы добавления карточки
popupAddButton.addEventListener('click', function() {
  formAdd.reset();
  validatorAddCard.clearError();
  validatorAddCard.toggleButtonState();
  popupAddCard.open();
})