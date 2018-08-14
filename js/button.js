'use strict';

class Button {
	constructor(element) {
		this.element = element;
	}

	/*Ставим рамку для выделения нажатой кнопки*/
	focus() {
		this.element.classList.add('focusedButton');
	}

	notfocus() {
		this.element.classList.remove('focusedButton');
	}
}

class ToolButton extends Button {
	constructor(element, drawer, frontCanvas, backCanvas) {
		super(element);
		this.drawer = drawer;
		this.front = frontCanvas;
		this.back = backCanvas;
	}

	click(currentButton) {
		currentButton.notfocus();
		this.focus();
		this.front.makeFirst();
		this.back.makeSecond();
		this.front.drawer = this.drawer;
	}
}