// The scattered discipline lines drift around the frame and bounce off the
// edges — nothing ever leaves the page.
//
// CSS keyframes cannot do this: a bounce needs to know where the element is
// relative to the viewport, which means measuring each frame.

const SPEED_MIN = 6; // px per second
const SPEED_MAX = 16;

export function initDrift() {
	const stage = document.querySelector('.disciplines');
	if (!stage) return;

	const items = [...stage.querySelectorAll('span')];
	if (!items.length) return;

	const still = window.matchMedia('(prefers-reduced-motion: reduce)');

	const state = items.map((el, i) => {
		// Seed direction from the index so the spread is deterministic rather
		// than every reload looking different.
		const angle = (i * 137.5 * Math.PI) / 180;
		const speed = SPEED_MIN + ((i * 37) % (SPEED_MAX - SPEED_MIN));
		return {
			el,
			x: 0,
			y: 0,
			vx: Math.cos(angle) * speed,
			vy: Math.sin(angle) * speed,
			w: 0,
			h: 0,
		};
	});

	let bounds = { w: 0, h: 0 };

	// The starting point is whatever the CSS put them at; from there we work
	// in offsets so the server-rendered layout is never overridden on load.
	function measure() {
		bounds = { w: stage.clientWidth, h: stage.clientHeight };
		state.forEach((s) => {
			const prev = s.el.style.transform;
			s.el.style.transform = 'none';
			const r = s.el.getBoundingClientRect();
			const sr = stage.getBoundingClientRect();
			s.w = r.width;
			s.h = r.height;
			s.baseX = r.left - sr.left;
			s.baseY = r.top - sr.top;
			s.el.style.transform = prev;
			// Pull anything already outside back in.
			s.x = clampOffset(s, s.x);
			s.y = clampOffsetY(s, s.y);
		});
	}

	const maxX = (s) => Math.max(0, bounds.w - s.w) - s.baseX;
	const minX = (s) => -s.baseX;
	const maxY = (s) => Math.max(0, bounds.h - s.h) - s.baseY;
	const minY = (s) => -s.baseY;

	const clampOffset = (s, v) => Math.min(maxX(s), Math.max(minX(s), v));
	const clampOffsetY = (s, v) => Math.min(maxY(s), Math.max(minY(s), v));

	let last = null;

	function frame(now) {
		if (last === null) last = now;
		const dt = Math.min((now - last) / 1000, 0.05); // cap after a tab switch
		last = now;

		state.forEach((s) => {
			// A line wider than the frame has nowhere to travel; park it.
			if (s.w >= bounds.w) {
				s.vx = 0;
				s.x = minX(s);
			} else {
				s.x += s.vx * dt;
				if (s.x <= minX(s)) {
					s.x = minX(s);
					s.vx = Math.abs(s.vx);
				} else if (s.x >= maxX(s)) {
					s.x = maxX(s);
					s.vx = -Math.abs(s.vx);
				}
			}

			s.y += s.vy * dt;
			if (s.y <= minY(s)) {
				s.y = minY(s);
				s.vy = Math.abs(s.vy);
			} else if (s.y >= maxY(s)) {
				s.y = maxY(s);
				s.vy = -Math.abs(s.vy);
			}

			s.el.style.transform = `translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px)`;
		});

		requestAnimationFrame(frame);
	}

	measure();
	window.addEventListener('resize', () => {
		last = null;
		measure();
	});

	if (!still.matches) requestAnimationFrame(frame);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initDrift);
} else {
	initDrift();
}
