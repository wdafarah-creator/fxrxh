// Type that melts onto the page as it loads.
//
// Each line gets its own SVG goo filter: a heavy blur plus a colour matrix
// that slams the alpha contrast back up, so blurred glyphs bleed together
// into a liquid mass and then resolve into letterforms as the blur falls to
// zero. A small scale/settle on top reads as the line being pressed down.

const CONFIG = {
	selector: '[data-melt]',
	// Small type needs proportionally more blur than display type or the
	// effect is invisible.
	blurRatio: 0.3,
	duration: 850,
	stagger: 110,
};

const MATRIX = '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9';
const NS = 'http://www.w3.org/2000/svg';

let uid = 0;
let defs = null;

function getDefs() {
	if (defs) return defs;
	const svg = document.createElementNS(NS, 'svg');
	svg.setAttribute('aria-hidden', 'true');
	svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
	defs = document.createElementNS(NS, 'defs');
	svg.appendChild(defs);
	document.body.appendChild(svg);
	return defs;
}

function makeFilter(startBlur) {
	const id = `melt-${uid++}`;
	const filter = document.createElementNS(NS, 'filter');
	filter.setAttribute('id', id);
	// Roomy region so the blur is not clipped at the glyph edges.
	filter.setAttribute('x', '-30%');
	filter.setAttribute('y', '-30%');
	filter.setAttribute('width', '160%');
	filter.setAttribute('height', '160%');
	filter.setAttribute('color-interpolation-filters', 'sRGB');

	const blur = document.createElementNS(NS, 'feGaussianBlur');
	blur.setAttribute('in', 'SourceGraphic');
	blur.setAttribute('stdDeviation', String(startBlur));
	blur.setAttribute('result', 'blur');

	const matrix = document.createElementNS(NS, 'feColorMatrix');
	matrix.setAttribute('in', 'blur');
	matrix.setAttribute('type', 'matrix');
	matrix.setAttribute('values', MATRIX);

	filter.append(blur, matrix);
	getDefs().appendChild(filter);
	return { id, blur };
}

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

function melt(el, delay) {
	const size = parseFloat(getComputedStyle(el).fontSize) || 14;
	const startBlur = size * CONFIG.blurRatio;
	const { id, blur } = makeFilter(startBlur);

	el.style.filter = `url(#${id})`;
	el.classList.add('is-melting');

	let began = null;
	let done = false;

	const finish = () => {
		if (done) return;
		done = true;
		blur.setAttribute('stdDeviation', '0');
		el.style.filter = '';
		el.classList.remove('is-melting');
	};

	const step = (now) => {
		if (done) return;
		if (began === null) began = now;
		const elapsed = now - began - delay;
		if (elapsed < 0) return requestAnimationFrame(step);

		const t = Math.min(1, elapsed / CONFIG.duration);
		blur.setAttribute('stdDeviation', (startBlur * (1 - easeOutCubic(t))).toFixed(2));

		if (t < 1) return requestAnimationFrame(step);
		finish();
	};

	// rAF is paused in background tabs; never leave the type as a blob.
	setTimeout(finish, delay + CONFIG.duration + 600);
	requestAnimationFrame(step);
}

export function initMelt() {
	const targets = [...document.querySelectorAll(CONFIG.selector)];
	if (!targets.length) return;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		targets.forEach((el) => el.classList.add('is-settled'));
		return;
	}

	targets.forEach((el, i) => {
		const delay = i * CONFIG.stagger;
		melt(el, delay);
		// The transform settle runs alongside the blur.
		setTimeout(() => el.classList.add('is-settled'), delay);
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initMelt);
} else {
	initMelt();
}
