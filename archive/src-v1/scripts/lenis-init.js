import Lenis from 'lenis';
import gsap from 'gsap';

let lenis;
let tickerFn;

function reducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initLenis() {
	destroyLenis();

	if (reducedMotion()) return null;

	lenis = new Lenis({
		duration: 1.1,
		smoothWheel: true,
		wheelMultiplier: 1,
		touchMultiplier: 1.1,
	});

	tickerFn = (time) => {
		lenis.raf(time * 1000);
	};
	gsap.ticker.add(tickerFn);
	gsap.ticker.lagSmoothing(0);

	return lenis;
}

export function destroyLenis() {
	if (tickerFn) {
		gsap.ticker.remove(tickerFn);
		tickerFn = null;
	}
	if (lenis) {
		lenis.destroy();
		lenis = null;
	}
}

export function getLenis() {
	return lenis;
}

export function scrollToTop() {
	if (lenis) {
		lenis.scrollTo(0, { immediate: true });
	} else {
		window.scrollTo(0, 0);
	}
}
