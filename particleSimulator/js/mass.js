class Mass {
    static objects = [];

    constructor(pos, vel, acc, mass) {
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
        this.mass = mass;

        Mass.objects.push(this);
    }

    draw() {
        ctx.fillStyle = this.mass > 0 ? "red" : "rgb(22, 163, 250)";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
}