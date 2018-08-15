'use strict';

class Canvas {
	// drawFunction - функция принимает ссылку на канвас и евент. Рисует что-то определенное и для всех инструментов разная
	// frontCanvas - ссылка на "передний" канвас. Нужна, чтобы отрисовывать изменения на него по окончании работы с нижним

	constructor(id, frontCanvas) {
		this.element = document.getElementById(id);
		this.context = this.element.getContext('2d');
		this.filler = false;
		this.frontCanvas = frontCanvas;
		this.element.onclick = (ev => {    // особенное для заливки
			if (this.filler) {
				this.drawFunction(this, ev);
			}
		});
		this.element.onmousedown = (ev => {
			if (!this.filler) {
				this.clicked = true;
				this.clickedX = ev.offsetX;
				this.clickedY = ev.offsetY;
			}
		});
		this.element.onmousemove = (ev => {
			if (this.clicked && !this.filler) {
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
			if (!this.filler) {
				if (this.frontCanvas !== null) {
					this.clicked = false;
					this.context.clearRect(0, 0, this.element.offsetWidth, this.element.offsetHeight);
					this.frontCanvas.currentStartPosition = this.currentStartPosition;
					this.drawFunction(this.frontCanvas, ev);
				} else {
					this.clicked = false;
					this.drawFunction(this, ev);
				}
			}
		});
		this.element.onmouseleave = ((ev) => {
			if (this.clicked && !this.filler) {
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

	get color() {
		return this.context.strokeStyle;
	}

	set color(colorStr) {
		this.context.strokeStyle = colorStr;
		this.context.fillStyle = colorStr;
	}

	setColorHEX(c) {
		this.color = c;
	}

	setColorRGB(r, g, b) {
		this.color = "rgb(" + r + "," + g + "," + b + ")";
	}

	setColorRGBA(r, g, b, a) {
		this.color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}

	getColorByPixel(x,y) {
		return this.context.getImageData(x,y,1,1).data;
		// if (data[0]===0 && data[1]===0 && data[2]===0 && data[3]===0) {
		// 	return [255,255,255,255];
		// } else {
		// 	return data;
		// }
	}

	set lineWidth(w) {
		this.context.lineWidth = w;
	}

	get currentStartPosition() {
		return [this.clickedX, this.clickedY];
	}

	set currentStartPosition(pos) {
		this.clickedX = pos[0];
		this.clickedY = pos[1];
	}

	get drawContext() {
		return this.context;
	}

	get isFiller() {
		return this.filler;
	}

	set isFiller(v) {
		this.filler = v;
	}
}