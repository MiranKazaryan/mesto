export class Section{
    constructor({items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    //принимает DOM-элемент и добавляет его в контейнер.
    addItem(element){
        this._container.prepend(element);
    }
    addItemI(element){
        this._container.append(element);
    }
}