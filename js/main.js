'use strict';

const front = new Canvas('front_canvas',null);
const back = new Canvas('back_canvas',front);
const tools = new Map();
tools.set('pencil', new ToolButton('pencil',drawPencil,front,back));
tools.set('rect', new ToolButton('rect',drawRect,back,front));
tools.set('filledRect', new ToolButton('filledRect',drawFilledRect,back,front));
tools.set('filler', new ToolButton('filler',drawFill,front,back));
let currentTool = tools.get('pencil');
currentTool.click(null);
tools.forEach((value) => {
	value.docElement.onclick = (() => {
		value.click(currentTool);
		currentTool = value;
	})
});