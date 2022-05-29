import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImg = this._popupSelector.querySelector('.popup__image');
        this._popupViewTitle = this._popupSelector.querySelector('.popup__view-title')
    }

    //открытие попапа c изображением
    open(name,link){
        this._popupImg.src = link;
        this._popupImg.alt = name;
        this._popupViewTitle.textContent = name;
        super.open();
    }
}