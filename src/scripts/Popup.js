export class Popup{
    constructor(popupSelector){
        this._popupSelector = document.querySelector(popupSelector);
    }
    //открытие попапа
    open(){
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    //закрытие попапа
    close(){
        this._popupSelector.classList.remove('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    //закрытие попапа при нажатие Esc
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
           this.close();
          }
    }
    //слушатель клика вне области попапа
    setEventListeners(){
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button'))
            {
                this.close();
            }
        });
    }
}