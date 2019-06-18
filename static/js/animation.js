'use strict';

const steps = 200;
const rangeRad = 200;
const baseHue = 60;
const rangeHue = 200;
const backgroundColor = 'hsla(0,0%,0%,0.8)';

let canvas;
let ctx;
let center;
let tick;
let simplex;

function setup() {
	tick = 0;

	simplex = new SimplexNoise();
	createCanvas();
	resize();
	
	draw();
}

function createCanvas() {
	canvas = {
		a: document.createElement('canvas'),
		b: document.createElement('canvas') };

	canvas.b.style = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`;
	document.body.appendChild(canvas.b);
	ctx = {
		a: canvas.a.getContext('2d'),
		b: canvas.b.getContext('2d') };

	center = [];
}

function resize() {
	const { innerWidth, innerHeight } = window;

	canvas.a.width = innerWidth;
	canvas.a.height = innerHeight;

	ctx.a.drawImage(canvas.b, 0, 0);

	canvas.b.width = innerWidth;
	canvas.b.height = innerHeight;

	ctx.b.drawImage(canvas.a, 0, 0);

	center[0] = 0.5 * canvas.a.width;
	center[1] = 0.5 * canvas.a.height;
}

function renderGlow() {
	ctx.b.save();
	ctx.b.filter = 'blur(8px) brightness(200%)';
	ctx.b.globalCompositeOperation = 'lighter';
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();

	ctx.b.save();
	ctx.b.filter = 'blur(4px) brightness(200%)';
	ctx.b.globalCompositeOperation = 'lighter';
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();
}

function renderToScreen() {
	ctx.b.save();
	ctx.b.globalCompositeOperation = 'lighter';
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();
}

function drawBackground() {
	ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

	ctx.b.fillStyle = backgroundColor;
	ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);
}

function drawSomething() {
	let x, y, n, w, r, h, c, i = 0;
	
	for (; i <= steps; i++) {
		x = (i / steps) * canvas.a.width;
		y = center[1];
		n = simplex.noise2D(x * 0.005, tick * 0.0015);
		w = n * (canvas.a.width / steps);
		r = n * rangeRad;
		c = `hsla(${baseHue + n * rangeHue},50%,50%,${n > 0 ? 0.5 : 0.01})`;

		ctx.a.beginPath();
		
		if (n > 0) {
			ctx.a.strokeStyle = c;
			ctx.a.arc(x, y, r, 0, TAU);
			ctx.a.stroke();
		} else {
			ctx.a.fillStyle = c;
			ctx.a.arc(x, y, -r * 0.5, 0, TAU);
			ctx.a.fill();
		}
		
		ctx.a.closePath();
	}
}

function draw() {
	tick++;

	drawBackground();
	drawSomething();
	renderGlow();
	renderToScreen();

	window.requestAnimationFrame(draw);
}

window.addEventListener('load', setup);
window.addEventListener("resize", resize);
