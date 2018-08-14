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

const drawFill = ((canvas, ev) => {
	const startColor = canvas.getColorByPixel(ev.offsetX, ev.offsetY);
	const tasks = [];
	const context = canvas.drawContext;
	const cmpColors = ((c1, c2) => {
		return (c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3]) ||
			(c1[0] === 255 && c1[1] === 255 && c1[2] === 255 && c2[3] === 0) ||         //canvas любит шуточки с нулевым a (из rgba)
			(c2[0] === 255 && c2[1] === 255 && c2[2] === 255 && c1[3] === 0);
	});
	let counter = 0;
	tasks.push({x: ev.offsetX, y: ev.offsetY, canTop: true, canBottom: true});
	tasks.push([ev.offsetX, ev.offsetY]);
	while (tasks.length !== 0) {
		if (counter === 300) {
			break;
		}
		counter++;
		const currentPoint = tasks.pop(), y = currentPoint.y;
		let left = currentPoint.x, x, visitedTop = false, visitedBottom = false;
		while (left >= 1 && cmpColors(startColor, canvas.getColorByPixel(left, y))) {
			left--;
		}
		x = ++left;
		while (x < 1280 && cmpColors(startColor, canvas.getColorByPixel(x, y))) {
			if (!visitedTop && y > 1 && cmpColors(startColor, canvas.getColorByPixel(x, y - 1))) {
				tasks.push({x: x, y: y - 1, canTop: true, canBottom: false});
				visitedTop = true;
			} else if (visitedTop && y > 1 && !cmpColors(startColor, canvas.getColorByPixel(x, y - 1))) {
				visitedTop = false;
			}
			if (!visitedBottom && y < 720 && cmpColors(startColor, canvas.getColorByPixel(x, y + 1))) {
				tasks.push({x: x, y: y + 1, canTop: false, canBottom: true});
				visitedBottom = true;
			} else if (visitedBottom && y < 720 && !cmpColors(startColor, canvas.getColorByPixel(x, y + 1))) {
				visitedBottom = false;
			}
			x++;
		}
		context.fillRect(left, y, x - left, 1);
	}
});