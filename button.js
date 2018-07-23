'use strict';

class Button {
	constructor(element) {
		this.element = element;
	}

	/*Ставим рамку для выделения нажатой кнопки*/
	putBorder() {
		this.element.style.borderWidth = this.element.offsetWidth / 10 + "px";
	}

	removeBorder() {
		this.element.style.borderWidth = "0";
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
		currentButton.removeBorder();
		this.putBorder();
		this.front.makeFirst();
		this.back.makeSecond();
		this.front.drawer = this.drawer;
	}
}