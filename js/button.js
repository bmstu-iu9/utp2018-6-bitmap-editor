'use strict';

class Button {
	constructor(id) {
		this.element = document.getElementById(id);
	}

	/*Ставим рамку для выделения нажатой кнопки*/
	focus() {
		this.element.classList.add('focused-button');
	}

	notfocus() {
		this.element.classList.remove('focused-button');
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
		this.front.drawer = this.drawer;
	}

	get docElement() {
		return this.element;
	}
}