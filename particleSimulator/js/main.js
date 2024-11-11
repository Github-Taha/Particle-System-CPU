const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
const ctx = canvas.getContext("2d");

let delta = 1000 / 60;
let ptime = 0;
let time = 0;
let changeTime = false;

// Create Objects
for (let i = 0; i < 2000; i++) {
    new Particle(
        {
            x: Math.random() * 300 + 100,
            y: Math.random() * 200 + 200,
        },
        {
            x: 2,
            y: 0,
        },
        {
            x: 0,
            y: 0
        }
    );
}

new Mass(
    {
        x: 800,
        y: 300
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    -1000000000000
);

new Mass(
    {
        x: 800,
        y: 350
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    1000000000000
);

new Mass(
    {
        x: 800,
        y: 250
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    1000000000000
);


let scale = {
    x: 1,
    y: 1,
}

ctx.scale(scale.x, scale.y);

function animate(timeElapsed) {
    ctx.clearRect(0, 0, canvas.width * (1 / scale.x), canvas.height * (1 / scale.y));

    // FPS
    time = timeElapsed;
    if (changeTime) {
        changeTime = false;
        delta = time - ptime;
    }
    ptime = time;
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText(parseInt(1000 / delta), 2, 17);

    // Update and Draw Particles
    Particle.objects.forEach(particle => {
        particle.draw();
        particle.update();
    });

    // Update and Draw Masses
    Mass.objects.forEach(mass => {
        mass.draw();
        mass.update();
    });

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

window.setInterval(() => {
    changeTime = true;
}, 500);