'use strict';

const front = new Canvas('front_canvas',null);
const back = new Canvas('back_canvas',front);
const tools = new Map();
tools.set('pencil', new ToolButton('pencil',drawPencil,front,back));
tools.set('rect', new ToolButton('rect',drawRect,back,front));
tools.set('filledRect', new ToolButton('filledRect',drawFilledRect,back,front));
tools.set('filler', new ToolButton('filler',drawFill,front,back));
tools.set('eraser',new ToolButton('eraser',drawErase,front,back));
tools.set('circle',new ToolButton('circle',drawCircle,back,front));
tools.set('filledCircle',new ToolButton('filledCircle',drawFillCircle,back,front));
let currentTool = tools.get('pencil');
currentTool.click(null);
tools.forEach((value) => {
	value.docElement.onclick = (() => {
		value.click(currentTool);
		currentTool = value;
	})
});

function getImage(){
	const canv = front.element;
	// canv.style.backgroundColor = 'red';
	var image = canv.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
	window.location.href = image; // it will save locally
}

