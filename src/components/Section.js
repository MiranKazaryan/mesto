export class Section{
    constructor({items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => {
          this._renderer(item);
        });
    }
    //принимает DOM-элемент и добавляет его в контейнер.
    addItem(item, position = 'before') {
        if (position === 'before') {
        this._container.prepend(item);
        } else {
          this._container.append(item);
        }
      }
}