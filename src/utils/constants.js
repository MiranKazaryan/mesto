export const configuration = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
}
export const popupProfile = document.querySelector('.popup_profile');
export const popupAdd= document.querySelector('.popup_add');
export const popupAvatar = document.querySelector('.popup_avatar');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupAddButton = document.querySelector('.profile__add-button');

export const avatarOpenEdit = document.querySelector('.profile__edit-avatar');
export const inputName = document.querySelector('.popup__input_type_name');
export const inputDescription = document.querySelector('.popup__input_type_description');
export const formAdd = document.getElementById('form-add');
export const formEdit = document.getElementById('form-avatar');