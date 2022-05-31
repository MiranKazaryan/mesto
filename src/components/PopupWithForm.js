import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
    constructor(popup, {formSubmit}){
        super(popup);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._formSubmit = formSubmit;
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }
    //собираем значения инпутов 
    _getInputValues(){
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
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
}