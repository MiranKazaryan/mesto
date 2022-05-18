export class Card{
    constructor(element, cardTemplate, openImgPopup){
        this._name = element.name;
        this._link = element.link;
        this._cardTemplate = document.querySelector(cardTemplate).content;
        this._openImgPopup = openImgPopup;
    }
  
    _likeCardSetListener(evt)
    {
        evt.querySelector('.card__like-button').addEventListener('click',function(evt){
            evt.target.classList.toggle('card__like-button_active');
        });
    };

    _deleteCardSetListener(evt){
        evt.querySelector('.card__delete-button').addEventListener('click',function(evt){
            evt.target.closest('.card').remove();
        });
    };
 
    initiateCard(element){
        const popupZoomImg = document.querySelector('.popup_view');
        const popupImg = document.querySelector('.popup__image');
        const popupViewTitle = document.querySelector('.popup__view-title');
        this._cardsElement = this._cardTemplate.cloneNode(true);
        this._cardImg = this._cardsElement.querySelector('.card__image'); 
        const cardTitle = this._cardsElement.querySelector('.card__title');
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name; 
        cardTitle.textContent = this._name;

        this._likeCardSetListener(this._cardsElement);
        this._deleteCardSetListener(this._cardsElement);
        this._cardImg.addEventListener('click', () => this._openImgPopup(this._name, this._link));
        /*function(){
            //зум не работает, надо сделать
            console.log(popupZoomImg);
            popupImg.src = this._link;
            popupImg.alt = this._name;
            popupViewTitle.textContent = this._name;
            openPopup(popupZoomImg);
        });*/
        return this._cardsElement;
    }
}