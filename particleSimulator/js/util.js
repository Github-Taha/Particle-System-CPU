let linearInterpole = (t, p0, p1) => (1 - t) * p0 + t * p1;

function getColorGradient(t, colors) {
	let cv = 1 / (colors.length - 1);
	let tv = (t % cv) * (colors.length - 1);

	for (let i = 0; i < colors.length - 1; i++) {
		if (t < cv * (i + 1)) {
			let r = linearInterpole(tv, colors[i][0], colors[i + 1][0]);
			let g = linearInterpole(tv, colors[i][1], colors[i + 1][1]);
			let b = linearInterpole(tv, colors[i][2], colors[i + 1][2]);
			return `rgb(${r}, ${g}, ${b})`;
		}
	}

	if (t >= 1) {
		return `rgb(${colors[colors.length - 1][0]}, ${colors[colors.length - 1][1]}, ${colors[colors.length - 1][2]})`;
	}
}