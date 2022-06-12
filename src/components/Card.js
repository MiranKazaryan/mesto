export class Card{
    constructor(element, cardTemplate, handleCardClick, _handleConfirmDelete, _handleLikeClick){
        this._name = element.name;
        this._link = element.link;
        this._likes = element.likes;
        this._id = element.id;
        this._userId = element.userId;
        this._ownerId = element.ownerId; 
        this._cardTemplate = document.querySelector(cardTemplate).content.querySelector('.card');
        this._handleCardClick = handleCardClick;
        this._handleConfirmDelete = _handleConfirmDelete;
        this._handleLikeClick = _handleLikeClick;
    }
  
    _likeCard(){
        this._buttonLike.classList.add('card__like-button_active');
    }
    _dislikeCard(){
        this._buttonLike.classList.remove('card__like-button_active');
    }
    deleteCard(){
        this._cardsElement.remove();
        this._cardElement = null; 
    }
 
    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._id));
        this._buttonDelete.addEventListener('click', () => this._handleConfirmDelete(this._id));
        this._cardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));
      }

    _getTemplate(){
        const cardElement = this._cardTemplate.cloneNode(true);
        return cardElement;
    }
    isLiked(){
        return (this._likes.find(user => user._id === this._userId));       
    }
    setLikes(newLikes){
        this._likes = newLikes;
        this._likeCounter.textContent = this._likes.length;
        if(this.isLiked()){
            this._likeCard();
        }
        else {
            this._dislikeCard();
        }
    }
    initiateCard(){
        const popupImg = document.querySelector('.popup__image');
        this._cardsElement = this._getTemplate();
        this._cardImg = this._cardsElement.querySelector('.card__image');
        this._buttonLike = this._cardsElement.querySelector('.card__like-button');
        this._buttonDelete = this._cardsElement.querySelector('.card__delete-button');
        this._likeCounter = this._cardsElement.querySelector('.card__like-count');
        const cardTitle = this._cardsElement.querySelector('.card__title');
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name; 
        cardTitle.textContent = this._name;
        this._setEventListeners();
        this.setLikes(this._likes);
        if(this._ownerId !== this._userId){
            this._buttonDelete.style.display = 'none';
        }
       
        return this._cardsElement;
    }
}