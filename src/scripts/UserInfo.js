export class UserInfo{
    constructor(nameSelector, descriptionSelector){
        this._nameSelector = document.querySelector(nameSelector);
        this._descriptionSelector = document.querySelector(descriptionSelector);
    }
    //передача данных пользователя при открытии формы
    getUserInfo(){
        this._info = {
            name: this._nameSelector.textContent,
            job: this._descriptionSelector.textContent
        }

        return this._info;
    }
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data){
        this._nameSelector.textContent = data.name;
        this._descriptionSelector.textContent = data.job;
    }
}