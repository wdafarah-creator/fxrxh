// Drives the custom pixel cursor: follows the pointer, turns red on
// interactive hover, flashes pink on click. No-ops on touch devices.

let started = false;

export function initCursor() {
	if (started) return; // persisted across Astro swaps, only bind once
	started = true;

	if (window.matchMedia('(pointer: coarse)').matches) return;

	const el = document.getElementById('pixel-cursor');
	if (!el) return;

	let targetX = window.innerWidth / 2;
	let targetY = window.innerHeight / 2;
	let x = targetX;
	let y = targetY;
	let clickTimeout;

	window.addEventListener('pointermove', (e) => {
		targetX = e.clientX;
		targetY = e.clientY;
		el.style.opacity = '1';
	});

	window.addEventListener('pointerleave', () => {
		el.style.opacity = '0';
	});

	window.addEventListener('pointerdown', () => {
		el.classList.add('is-click');
		clearTimeout(clickTimeout);
		clickTimeout = setTimeout(() => el.classList.remove('is-click'), 200);
	});

	const hoverSelector = 'a, button, [data-cursor-hover]';
	document.addEventListener('pointerover', (e) => {
		if (e.target instanceof Element && e.target.closest(hoverSelector)) {
			el.classList.add('is-hover');
		}
	});
	document.addEventListener('pointerout', (e) => {
		if (e.target instanceof Element && e.target.closest(hoverSelector)) {
			el.classList.remove('is-hover');
		}
	});

	function raf() {
		x += (targetX - x) * 0.55;
		y += (targetY - y) * 0.55;
		el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
}
