'use strict';

/* для удобства будем начинать названия со слова draw
*  каждая функция должна принимать 2 аргумента: канвас для рисования и евент клика*/

const drawPencil = ((canvas, ev) => {
	const startPos = canvas.currentStartPosition;
	const context = canvas.drawContext;
	context.beginPath();
	context.moveTo(startPos[0], startPos[1]);
	context.lineTo(ev.offsetX, ev.offsetY);
	context.stroke();
	canvas.currentStartPosition = [ev.offsetX, ev.offsetY];
});

const drawRect = ((canvas, ev) => {
	const startPos = canvas.currentStartPosition;
	const context = canvas.drawContext;
	context.strokeRect(startPos[0], startPos[1], ev.offsetX - startPos[0], ev.offsetY - startPos[1]);
});

const drawFilledRect = ((canvas, ev) => {
	const startPos = canvas.currentStartPosition;
	const context = canvas.drawContext;
	context.fillRect(startPos[0], startPos[1], ev.offsetX - startPos[0], ev.offsetY - startPos[1]);
});