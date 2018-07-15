'use strict';

class Canvas {
	clicked=false;
	clickedX;
	clickedY;
	constructor(id) {
		this.element=document.getElementById(id);
		this.context=this.element.getContext('2d');
		this.element.onmousedown = (ev => {
			this.clicked=true;
			this.clickedX=ev.offsetX;
			this.clickedY=ev.offsetY;
		});
	}
}
