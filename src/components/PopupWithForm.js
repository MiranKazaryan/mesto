import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
    constructor(popup, {formSubmit}){
        super(popup);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._formSubmit = formSubmit;
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._popupButton = this._popupForm.querySelector('.popup__save-button');
        this._popupButtonTextContent = this._popupButton.textContent;
    }
    //собираем значения инпутов 
    _getInputValues(){
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }
    changeFormSubmit(newFormSubmit){
        this._formSubmit = newFormSubmit;
    }
    //добавляем обработчик сабмита формы
    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
        });
    }
    //сбрасываем форму
    close(){
        super.close();
        this._popupForm.reset();
    }
    //меняем текст кнопки Submit на "Сохранение..."
    renderLoad(isLoading){
        if(isLoading){
            this._popupButton.textContent = 'Сохранение...';
        }
        else{
            this._popupButton.textContent = this._popupButtonTextContent;
        }
    }
}