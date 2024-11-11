class Particle {
	static objects = [];
	// Red - Yellow - Green - Blue - Purple
	static colors = [
		[
			255,
			0,
			0
		],
		[
			255,
			255,
			0
		],
		[
			0,
			255,
			0
		],
		[
			0,
			0,
			255,
		],
		[
			246,
			22,
			250
		]
	];
	static maxSpeed = 5;
	static mass = 10000;

	constructor(pos, vel, acc) {
		this.pos = pos;
		this.vel = vel;
		this.acc = acc;
		this.mass = Particle.mass;

		Particle.objects.push(this);
	}

	draw() {
		// Calculate Color
		let speed = Math.hypot(this.vel.x, this.vel.y);
		speed = Math.min(1, speed / Particle.maxSpeed);
		speed = Math.max(0, speed);
		// console.log(speed);

		let rgb = getColorGradient(
			speed,
			Particle.colors
		);

		ctx.fillStyle = rgb;
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, 1, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}

	update() {
		// F = (G * m1 * m2) / d^2
		this.acc.x = 0;
		this.acc.y = 0;
		Mass.objects.forEach(mass => {
			let g = 6.67430e-11;
			let d = Math.hypot(this.pos.x - mass.pos.x, this.pos.y - mass.pos.y);
			let m1 = this.mass;
			let m2 = mass.mass;
			let f = (g * m1 * m2) / (d * d);
			let a = f / m1;
			this.acc.x += (mass.pos.x - this.pos.x) / d * a;
			this.acc.y += (mass.pos.y - this.pos.y) / d * a;
		});

		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;

		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}
}