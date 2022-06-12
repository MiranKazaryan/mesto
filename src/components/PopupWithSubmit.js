import { Popup } from "./Popup.js";
export class PopupWithSubmit extends Popup{
    constructor(popup, {formSubmit}){
        super(popup);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._formSubmit = formSubmit;
    }
    changeFormSubmit(newFormSubmit){
        this._formSubmit = newFormSubmit;
    }
    //добавляем обработчик сабмита формы
    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit();
        });
    }
}