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
			if (!this.filler && this.clicked) {
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
				this.element.onmouseup(ev);
                this.clicked = false;
			}
		});
		if (frontCanvas === null){
			this.context.fillStyle = '#FFFFFF';
			this.context.fillRect(0,0,1280,720);
			this.context.fillStyle = '#000000';
		}
	}

	set drawer(d) {
		this.drawFunction = d;
	}

	get docElement() {
		return this.element;
	}

	makeFirst() {
		this.element.style.zIndex = "2";
	}

	makeSecond() {
		this.element.style.zIndex = "1";
	}

    set colorStroke(colorStr) {
        this.context.strokeStyle = colorStr;
    }

    set colorFill(colorStr){
        this.context.fillStyle = colorStr;
    }

	get canvasData() {
		return this.context.getImageData(0,0,1280,720).data;
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