'use strict';

class Canvas {
	clicked=false;
	clickedX;
	clickedY;
	drawFunction;       // функция принимает ссылку на канвас и евент. Рисует что-то определенное и для всех инструментов разная
	frontCanvas;        // ссылка на "передний" канвас. Нужна, чтобы отрисовывать изменения на него по окончании работы с нижним
	element;
	context;
	constructor(id,frontCanvas) {
		this.element=document.getElementById(id);
		this.context=this.element.getContext('2d');
		this.frontCanvas=frontCanvas;
		this.element.onmousedown = (ev => {
			this.clicked=true;
			this.clickedX=ev.offsetX;
			this.clickedY=ev.offsetY;
		});
		this.element.onmousemove = (ev => {
			if (this.clicked){
				/* очистка, необходимая только для заднего канваса. Нужна в ситуациях типа рисования прямоугольника:
				   нужно отображать, какой прямоугольник получается и при этом стирать старые изображения
				 */
				if (this.frontCanvas!=null){
					this.context.clearRect(0,0,this.element.offsetWidth,this.element.offsetHeight);
				}
				this.drawFunction(this,ev);
			}
		});
		this.element.onmouseup = (ev => {
			if (this.frontCanvas!=null){
				this.context.clearRect(0,0,this.element.offsetWidth,this.element.offsetHeight);
				this.drawFunction(this.frontCanvas,ev);
			} else{
				this.drawFunction(this,ev);
			}
		});
		this.element.onmouseleave = this.element.onmouseup;
	}
	set drawer(d){
		this.drawFunction=d;
	}
}
