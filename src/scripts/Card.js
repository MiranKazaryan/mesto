export class Card{
    constructor(element, cardTemplate, handleCardClick){
        this._name = element.name;
        this._link = element.link;
        this._cardTemplate = document.querySelector(cardTemplate).content;
        this._handleCardClick = handleCardClick;
    }
  
    _handleLikeIcon(){
        this._buttonLike.classList.toggle('card__like-button_active');
    };

    _handleDeleteCard(){
        this._buttonDelete.closest('.card').remove(); 
    };
 
    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => this._handleLikeIcon());
        this._buttonDelete.addEventListener('click', () => this._handleDeleteCard());
        this._cardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));
      }

    _getTemplate(){
        const cardElement = this._cardTemplate.cloneNode(true);
        return cardElement;
    }

    initiateCard(){
        const popupZoomImg = document.querySelector('.popup_view');
        const popupImg = document.querySelector('.popup__image');
        const popupViewTitle = document.querySelector('.popup__view-title');
        this._cardsElement = this._getTemplate();
        this._cardImg = this._cardsElement.querySelector('.card__image');
        this._buttonLike = this._cardsElement.querySelector('.card__like-button');
        this._buttonDelete = this._cardsElement.querySelector('.card__delete-button');
        const cardTitle = this._cardsElement.querySelector('.card__title');
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name; 
        cardTitle.textContent = this._name;
        this._setEventListeners();
        return this._cardsElement;
    }
}