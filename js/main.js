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
tools.set('text',new ToolButton('text',textDraw,front,back));
tools.set('triangle', new ToolButton('triangle', drawTriangle, back, front));
tools.set('filledTriangle', new ToolButton('filledTriangle', drawFillTriangle, back, front));
tools.set('straightLine', new ToolButton('straightLine', drawStraightLine, back, front));
let currentTool = tools.get('pencil');
currentTool.click(null);
tools.forEach((value) => {
	value.docElement.onclick = (() => {
		value.click(currentTool);
		currentTool = value;
	})
});

const thicknessTools = new Map();
 
thicknessTools.set('1px', new ToolThickness('1px', 1, front, back));
thicknessTools.set('2px', new ToolThickness('2px', 2, front, back));
thicknessTools.set('3px', new ToolThickness('3px', 3, front, back));
thicknessTools.set('4px', new ToolThickness('4px', 4, front, back));
 
let currentWidth = thicknessTools.get('1px');
currentWidth.click(null);
thicknessTools.forEach((value) => {
    value.docElement.onclick = (() => {
        value.click(currentWidth);
        currentWidth = value;
    })
});


front.colorStroke = back.colorStroke = document.getElementById('color').value;
front.colorFill = back.colorFill = document.getElementById('colorPour').value;

function getImage(){
	window.location.href = front.element.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
}

document.getElementById('color').onchange = function () {
	front.colorStroke = this.value;
	back.colorStroke = this.value;
};

document.getElementById('colorPour').onchange = function () {
	front.colorFill = this.value;
	back.colorFill = this.value;
};
