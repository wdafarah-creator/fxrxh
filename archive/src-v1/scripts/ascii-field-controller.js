import { AsciiField } from './ascii-field.js';

let field = null;

function reducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function currentDensity() {
	const value = parseFloat(document.body.dataset.density ?? '1');
	return Number.isFinite(value) ? value : 1;
}

function registerQuietZones() {
	if (!field) return;
	const zones = Array.from(document.querySelectorAll('[data-quiet-zone]')).map((el) => {
		const rect = el.getBoundingClientRect();
		const padding = parseFloat(el.dataset.quietZone) || 56;
		return { x: rect.left, y: rect.top, w: rect.width, h: rect.height, padding };
	});
	field.setQuietZones(zones);
}

export function initAsciiField() {
	const canvas = document.getElementById('ascii-field');
	if (!canvas) return;

	if (!field) {
		field = new AsciiField(canvas, {
			cellSize: window.innerWidth < 720 ? 16 : 20,
			density: currentDensity(),
			reducedMotion: reducedMotion(),
		});

		window.addEventListener(
			'ascii-field:pulse',
			(e) => {
				const { x, y, radius, strength } = e.detail || {};
				field.pulse(x, y, radius, strength);
			},
			{ passive: true }
		);

		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		motionQuery.addEventListener('change', (e) => field.setReducedMotion(e.matches));

		if (!reducedMotion()) field.start();
	}

	field.setDensity(currentDensity());
	// Layout settles after swap; measure on next frame so rects are accurate.
	requestAnimationFrame(registerQuietZones);
}

export function getAsciiField() {
	return field;
}
