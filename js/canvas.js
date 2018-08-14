'use strict';

class Canvas {
	// drawFunction - функция принимает ссылку на канвас и евент. Рисует что-то определенное и для всех инструментов разная
	// frontCanvas - ссылка на "передний" канвас. Нужна, чтобы отрисовывать изменения на него по окончании работы с нижним

	constructor(id, frontCanvas) {
		this.element = document.getElementById(id);
		this.context = this.element.getContext('2d');
		this.frontCanvas = frontCanvas;
		this.element.onmousedown = (ev => {
			this.clicked = true;
			this.clickedX = ev.offsetX;
			this.clickedY = ev.offsetY;
		});
		this.element.onmousemove = (ev => {
			if (this.clicked) {
				/* очистка, необходимая только для заднего канваса. Нужна в ситуациях типа рисования прямоугольника:
				   нужно отображать, какой прямоугольник получается и при этом стирать старые изображения
				 */
				if (this.frontCanvas !== null) {
					this.context.clearRect(0, 0, this.element.offsetWidth, this.element.offsetHeight);
				}
				this.drawFunction(this, ev);
			}
		});
		this.element.onmouseup = (ev => {
			if (this.frontCanvas !== null) {
				this.clicked = false;
				this.context.clearRect(0, 0, this.element.offsetWidth, this.element.offsetHeight);
				this.frontCanvas.currentStartPosition = this.currentStartPosition;
				this.drawFunction(this.frontCanvas, ev);
			} else {
				this.clicked = false;
				this.drawFunction(this, ev);
			}
		});
		this.element.onmouseleave = ((ev) => {
			if (this.clicked) {
				this.clicked = false;
				this.element.onmouseup(ev);
			}
		})
	}

	set drawer(d) {
		this.drawFunction = d;
	}

	makeFirst() {
		this.element.style.zIndex = "2";
	}

	makeSecond() {
		this.element.style.zIndex = "1";
	}

	set color(colorStr) {
		this.context.strokeStyle = colorStr;
	}

	setColorRGB(r, g, b) {
		this.color = "rgb(" + r + "," + g + "," + b + ")";
	}

	setColorRGBA(r, g, b, a) {
		this.color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}

	set lineWidth(w) {
		this.context.lineWidth = w;
	}

	get currentStartPosition() {       // дабы не нарушать инкапсуляцию
		return [this.clickedX, this.clickedY];
	}

	set currentStartPosition(pos) {    // будет нужно для кисточки
		this.clickedX = pos[0];
		this.clickedY = pos[1];
	}

	get drawContext() {
		return this.context;
	}
}