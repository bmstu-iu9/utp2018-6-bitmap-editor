'use strict';

const brush = ((canvas, ev) => {
	const startPos = canvas.currentStartPosition;
	const context = canvas.drawContext;
	context.beginPath();
	context.moveTo(startPos[0], startPos[1]);
	context.lineTo(ev.offsetX, ev.offsetY);
	context.stroke();
	canvas.currentStartPosition = [ev.offsetX, ev.offsetY];
});

const rect = ((canvas, ev) => {
	const startPos = canvas.currentStartPosition;
	const context = canvas.drawContext;
	context.strokeRect(startPos[0], startPos[1], ev.offsetX, ev.offsetY);
});

const filledRect = ((canvas, ev) => {
	const startPos = canvas.currentStartPosition;
	const context = canvas.drawContext;
	context.fillRect(startPos[0], startPos[1], ev.offsetX, ev.offsetY);
});