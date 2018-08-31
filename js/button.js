'use strict';
 
class Button {
    constructor(id) {
        this.idElement = id;
        this.element = document.getElementById(id);
    }
 
    /*Ставим рамку для выделения нажатой кнопки*/
    focus() {
        this.element.classList.add('focused-button');
    }
 
    notfocus() {
        this.element.classList.remove('focused-button');
    }
 
    get id() {
        return this.idElement;
    }
 
    get docElement() {
        return this.element;
    }
}
 
 
/* под frontCanvas подразумевается слой, на котором должна рисовать функция.
   он не обязан совпадать с реальным передним слоем(с html)
 */
class ToolButton extends Button {
    constructor(id, drawer, frontCanvas, backCanvas) {
        super(id);
        this.drawer = drawer;
        this.front = frontCanvas;
        this.back = backCanvas;
    }
 
    click(currentButton) {
        if (currentButton !== null) {
            currentButton.notfocus();
        }
        this.focus();
        this.front.makeFirst();
        this.back.makeSecond();
        if (this.idElement === 'filler') {
            this.toggleFiller();
        } else if (this.idElement === 'text') {
            this.toggleText();
        } else {
            let inp = document.getElementById("inputText");
            inp.style.borderStyle = 'none';
            inp.value = " ";
        }
        if (currentButton !== null && currentButton.id === 'filler') {
            currentButton.toggleFiller();
        } else if (currentButton !== null && currentButton.id === 'text') {
            currentButton.toggleText();
        }
        this.front.drawer = this.drawer;
    }
 
    toggleFiller() {
        this.front.isFiller = !this.front.isFiller;
    }
 
    toggleText() {
        this.front.isText = !this.front.isText;
    }
}