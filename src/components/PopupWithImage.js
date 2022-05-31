import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup{
    constructor(popup){
        super(popup);
        this._popupImg = this._popup.querySelector('.popup__image');
        this._popupViewTitle = this._popup.querySelector('.popup__view-title')
    }

    //открытие попапа c изображением
    open(name,link){
        this._popupImg.src = link;
        this._popupImg.alt = name;
        this._popupViewTitle.textContent = name;
        super.open();
    }
}