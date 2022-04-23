const configuration = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
}

const showInputError = (formElement,inputElement,errorMessage, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
};
const hideInputError = (formElement, inputElement, {inputErrorClass,errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent='';
};
function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}){
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}
const isValid = (formElement, inputElement, {inputErrorClass,errorClass}) =>{
    if(!inputElement.validity.valid){
        showInputError(formElement,inputElement,inputElement.validationMessage,{inputErrorClass,errorClass});
    } else{
        hideInputError(formElement,inputElement,{inputErrorClass,errorClass});
    }
};
const setEventListeners = (formElement,{inputSelector, submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList,submitButton, {inactiveButtonClass});
    inputList.forEach((inputElement) =>{
        inputElement.addEventListener('input', () =>{
            isValid(formElement, inputElement, {inputErrorClass,errorClass});
            toggleButtonState(inputList, submitButton, {inactiveButtonClass});
        });
    });
}
const enableValidation = ({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass}) =>{
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement)=>{
        formElement.addEventListener('submit',(evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement,{inputSelector, submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass});
    });
};
enableValidation(configuration);
// функция очищения ошибок
function clearError(inputErrorClass, errorClass){
    inputs.forEach((input) =>{
       input.classList.remove(inputErrorClass,errorClass);
    });
    errors.forEach((error) =>{
        error.textContent = '';
    });
}
