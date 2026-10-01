import gsap from 'gsap';
import { initLenis, getLenis } from './lenis-init.js';

const GLYPHS = '01·:;+=*#%$&/\\<>[]{}()!?^~•∙°01001101 10110 ERR SYS 0x2F'.split('');
const COLOR_VARS = ['--red', '--pink', '--grey-mid'];

let bound = false;
let isTraverse = false;

function reducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function randomGlyph() {
	const pool = GLYPHS.filter(Boolean);
	return pool[(Math.random() * pool.length) | 0] || '0';
}

function buildScatter(container, count) {
	container.innerHTML = '';
	const frag = document.createDocumentFragment();
	const w = window.innerWidth;
	const h = window.innerHeight;
	const cellW = w / 8;
	const cellH = h / 6;

	for (let i = 0; i < count; i++) {
		const col = i % 8;
		const row = Math.floor(i / 8) % 6;
		const jitterX = Math.random() * cellW * 0.6;
		const jitterY = Math.random() * cellH * 0.6;

		const span = document.createElement('span');
		span.textContent = randomGlyph();
		span.className = 'scatter-glyph mono';
		const colorVar = COLOR_VARS[(Math.random() * COLOR_VARS.length) | 0];
		span.style.color = `var(${colorVar})`;
		span.style.left = `${col * cellW + jitterX}px`;
		span.style.top = `${row * cellH + jitterY}px`;
		span.style.fontSize = `${0.75 + Math.random() * 1.6}rem`;
		frag.appendChild(span);
	}
	container.appendChild(frag);
	return Array.from(container.children);
}

function playIn(overlay, container) {
	const reduced = reducedMotion();
	const oldMain = document.getElementById('page-content');
	const glyphs = buildScatter(container, reduced ? 0 : 42);
	overlay.style.pointerEvents = 'auto';

	return new Promise((resolve) => {
		const tl = gsap.timeline({ onComplete: resolve });

		if (oldMain) {
			tl.to(
				oldMain,
				{ opacity: 0, filter: 'blur(6px)', duration: reduced ? 0.15 : 0.55, ease: 'power2.out' },
				0
			);
		}

		if (!reduced && glyphs.length) {
			tl.fromTo(
				glyphs,
				{ opacity: 0, scale: 0.5 },
				{
					opacity: 1,
					scale: 1,
					duration: 0.6,
					stagger: { each: 0.016, from: 'random' },
					ease: 'power2.out',
				},
				0.1
			);
			tl.to({}, { duration: 1.4 }); // hold at full scatter
		} else {
			tl.to({}, { duration: 0.2 });
		}
	});
}

function playOut(overlay, container) {
	const reduced = reducedMotion();
	const glyphs = Array.from(container.children);
	const newMain = document.getElementById('page-content');

	const tl = gsap.timeline({
		onComplete: () => {
			overlay.style.pointerEvents = 'none';
			container.innerHTML = '';
		},
	});

	if (!reduced && glyphs.length) {
		tl.to(
			glyphs,
			{ opacity: 0, scale: 0.6, duration: 0.55, stagger: { each: 0.01, from: 'random' }, ease: 'power1.in' },
			0
		);
	}

	if (newMain) {
		tl.to(
			newMain,
			{ opacity: 1, filter: 'blur(0px)', duration: reduced ? 0.2 : 0.7, ease: 'power2.out' },
			reduced ? 0 : 0.2
		);
	}
}

export function initTransitions() {
	initLenis();

	if (bound) return;
	bound = true;

	const overlay = document.getElementById('transition-overlay');
	const container = document.getElementById('transition-glyphs');
	if (!overlay || !container) return;

	document.addEventListener('astro:before-preparation', (event) => {
		isTraverse = event.navigationType === 'traverse';
		const originalLoader = event.loader;
		event.loader = async () => {
			await Promise.all([playIn(overlay, container), originalLoader()]);
		};
	});

	document.addEventListener('astro:after-swap', () => {
		const newMain = document.getElementById('page-content');
		if (newMain) gsap.set(newMain, { opacity: 0, filter: 'blur(6px)' });
		initLenis();
		if (!isTraverse) {
			const lenis = getLenis();
			if (lenis) lenis.scrollTo(0, { immediate: true });
			else window.scrollTo(0, 0);
		}
	});

	document.addEventListener('astro:page-load', () => {
		playOut(overlay, container);
	});
}
