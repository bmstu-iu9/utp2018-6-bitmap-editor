'use strict';

/* для удобства будем начинать названия со слова draw
*  каждая функция должна принимать 2 аргумента: канвас для рисования и евент клика*/

const parseColor = ((color) => {
	if (color.length === 4 && color[0] === '#') {
		return [parseInt(color.substring(1, 2), 16), parseInt(color.substring(2, 3), 16), parseInt(color.substring(3, 4), 16), 1]
	} else if (color.length === 7 && color[0] === '#') {
		return [parseInt(color.substring(1, 3), 16), parseInt(color.substring(3, 5), 16), parseInt(color.substring(5, 7), 16), 1]
	}
});

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

const drawErase = ((canvas, ev) => {
	const startColor = canvas.color;
	if (startColor !== '#ffffff') {
		canvas.color = '#ffffff';
	}
	drawPencil(canvas, ev);
	canvas.color = startColor;
});
const drawCircle = ((canvas, ev) => {
	const startPos = canvas.currentStartPosition;
	const context = canvas.drawContext;
	context.beginPath();
	context.arc(startPos[0], startPos[1], Math.abs((ev.offsetX - startPos[0])), 0 ,2*Math.PI, false);
	context.stroke();
});
const drawFillCircle = ((canvas, ev) => {
	const startPos = canvas.currentStartPosition;
	const context = canvas.drawContext;
	context.beginPath();
	context.arc(startPos[0], startPos[1], Math.abs((ev.offsetX - startPos[0])), 0 ,2*Math.PI, false);
	context.fill();
});
const drawFill = ((canvas, ev) => {
	const tasks = [];
	const context = canvas.drawContext;
	const data = canvas.canvasData;
	const startColor = [data[(ev.offsetX + ev.offsetY * 1280) * 4], data[(ev.offsetX + ev.offsetY * 1280) * 4 + 1],   // я бы сделал через splice, но у буфера такого метода нет(
		data[(ev.offsetX + ev.offsetY * 1280) * 4 + 2], data[(ev.offsetX + ev.offsetY * 1280) * 4 + 3]];
	const cmpColor = ((x1, y1) => {
		return (startColor[0] === data[x1 * 4 + y1 * 1280 * 4] && startColor[1] === data[x1 * 4 + y1 * 1280 * 4 + 1] &&
			startColor[2] === data[x1 * 4 + y1 * 1280 * 4 + 2] && startColor[3] === data[x1 * 4 + y1 * 1280 * 4 + 3])
	});
	tasks.push({x: ev.offsetX, y: ev.offsetY});
	while (tasks.length !== 0) {
		const currentPoint = tasks.pop(), y = currentPoint.y;
		let left = currentPoint.x, x, visitedTop = false, visitedBottom = false;
		while (left >= 1 && cmpColor(left, y)) {
			left--;
		}
		x = ++left;
		while (x < 1280 && cmpColor(x, y)) {
			if (!visitedTop && y > 1 && cmpColor(x, y - 1)) {
				tasks.push({x: x, y: y - 1});
				visitedTop = true;
			} else if (visitedTop && y > 1 && !cmpColor(x, y - 1)) {
				visitedTop = false;
			}
			if (!visitedBottom && y < 720 && cmpColor(x, y + 1)) {
				tasks.push({x: x, y: y + 1});
				visitedBottom = true;
			} else if (visitedBottom && y < 720 && !cmpColor(x, y + 1)) {
				visitedBottom = false;
			}
			if (data[x * 4 + y * 4 * 1280] === 255) {
				data[x * 4 + y * 4 * 1280] -= 1;
			} else {
				data[x * 4 + y * 4 * 1280] += 1;
			}
			x++;
		}
		context.fillRect(left, y, x - left, 1);
	}
});