'use strict';

function Life() {
	this.step = () => {
		let fieldBuffer = new Uint8Array(this.field);

		this.field.forEach((cell, index) => {
			let liveNeighbours = 0;
			liveNeighbours += this.field[index - this.width - 1];
			liveNeighbours += this.field[index - this.width];
			liveNeighbours += this.field[index - this.width + 1];
			liveNeighbours += this.field[index - 1];
			liveNeighbours += this.field[index + 1];
			liveNeighbours += this.field[index + this.width - 1];
			liveNeighbours += this.field[index + this.width];
			liveNeighbours += this.field[index + this.width + 1];

			// Rules:
			// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
			if (cell === 1 && liveNeighbours < 2) fieldBuffer[index] = 0;
			// Any live cell with two or three live neighbours lives on to the next generation.
			else if (cell === 1 && (liveNeighbours === 2 || liveNeighbours === 3)) fieldBuffer[index] = 1;
			// Any live cell with more than three live neighbours dies, as if by over-population.
			else if (cell === 1 && liveNeighbours > 3) fieldBuffer[index] = 0;
			// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
			else if (cell === 0 && liveNeighbours === 3) fieldBuffer[index] = 1;
		});

		this.field.set(fieldBuffer);
		this.draw();
		window.requestAnimationFrame(this.step);
	}

	this.draw = () => {
		this.field.forEach((el, index) => {
			index = index * 4;
			let fill = el === 1 ? 0 : 255; // black or white
			this.image.data[index] = fill;     // R
			this.image.data[index + 1] = fill; // G
			this.image.data[index + 2] = fill; // B
			this.image.data[index + 3] = 255;  // A
		});

		this.ctx.putImageData(this.image, 0, 0);
	};

	this.canvas = document.querySelector('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.width = this.canvas.width;
	this.height = this.canvas.height;

	this.field = new Uint8Array(this.width * this.height);

	this.field.forEach((cell, index) => this.field[index] = Math.random() < .1 ? 1 : 0);

	this.image = this.ctx.createImageData(this.width, this.height);
	
	this.draw();

	window.requestAnimationFrame(this.step);

}

window.addEventListener('DOMContentLoaded',function(){
	let life = new Life();
},false);
