let popup=document.querySelector('.popup');

let editButton=document.querySelector('.profile__edit-button');
let saveButton=document.querySelector('.popup__saveButton');
let closeButton=document.querySelector('.popup__closeButton');

let profileName=document.querySelector('.profile__title');
let profileDescription=document.querySelector('.profile__subtitle');

let inputName=document.querySelector('.popup__input_type_name');
let inputDescription=document.querySelector('.popup__input_type_description');

let form=document.querySelector('.popup__form');

//открываем окно редактирования профиля
editButton.addEventListener('click',function()
{
    //popup.classList.remove('popup');
    popup.classList.add('popup_opened');
    inputName.value=profileName.textContent;
    inputDescription.value=profileDescription.textContent;
})


closeButton.addEventListener('click',function(){
    popup.classList.remove('popup_opened');
   // popup.classList.add('popup');
})
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
        popup.classList.remove('popup_opened');
       // popup.classList.add('popup');
	}
});



function changeUser(evt){
    evt.preventDefault();
    console.log('Форма отправлена');
    profileName.textContent=inputName.value;
    profileDescription.textContent=inputDescription.value;
    popup.classList.remove('popup_opened');
    popup.classList.add('popup');
}
document.addEventListener('keydown', function(event){
	if(event.key === "Enter"){
        form.addEventListener('submit',changeUser);
	}
});

form.addEventListener('submit',changeUser);