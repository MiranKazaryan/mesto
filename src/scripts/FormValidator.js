export class formValidator{
    constructor(configuration, formElement){
        this._configuration = configuration;
        this._formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll(this._configuration.inputSelector));
        this.submitButton = formElement.querySelector(this._configuration.submitButtonSelector);
    }
    
    _showInputError(inputElement,errorMessage){
        const {inputErrorClass, errorClass} = this._configuration;
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (inputElement) => {
        const {inputErrorClass,errorClass} = this._configuration;
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent='';
    };

    _hasInvalidInput(){
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    toggleButtonState(){
        const {inactiveButtonClass} = this._configuration;
        if(this._hasInvalidInput()){
            this.submitButton.classList.add(inactiveButtonClass);
            this.submitButton.disabled = true;
        } else {
            this.submitButton.classList.remove(inactiveButtonClass);
            this.submitButton.disabled = false;
        }
    }
    _isValid = (inputElement) =>{
        if(!inputElement.validity.valid){
            this._showInputError(inputElement,inputElement.validationMessage);
        } else{
            this._hideInputError(inputElement);
        }
    };

    setEventListeners = () => {
        this.toggleButtonState();
        this.inputList.forEach((inputElement) =>{
            inputElement.addEventListener('input', () =>{
                this._isValid(inputElement);
                this.toggleButtonState();
            });
        });
    }
    enableValidation = () =>{
        this._formElement.addEventListener('submit',(evt) => {
            evt.preventDefault();
        });
        this.setEventListeners();
    };
    //enableValidation(configuration);
    // функция очищения ошибок
    clearError(){
        this.inputList.forEach((input) =>{
           this._hideInputError(input);
        });
    }
}