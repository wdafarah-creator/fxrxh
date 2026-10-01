import { TextScramble } from './text-scramble.js';

const instances = new WeakMap();

function getScrambler(el) {
	let inst = instances.get(el);
	if (!inst) {
		inst = new TextScramble(el);
		instances.set(el, inst);
	}
	return inst;
}

function bindWord(el) {
	if (el.dataset.scrambleBound) return;
	el.dataset.scrambleBound = 'true';

	const scrambler = getScrambler(el);
	const color = Math.random() > 0.5 ? 'var(--red)' : 'var(--pink)';
	el.style.setProperty('--hover-color', color);

	el.addEventListener('mouseenter', () => {
		el.classList.add('is-scrambling');
		scrambler.play({ duration: 420, stagger: 24 });

		const rect = el.getBoundingClientRect();
		window.dispatchEvent(
			new CustomEvent('ascii-field:pulse', {
				detail: {
					x: rect.left + rect.width / 2,
					y: rect.top + rect.height / 2,
					radius: Math.max(rect.width, 240),
					strength: 0.85,
				},
			})
		);
	});

	el.addEventListener('mouseleave', () => {
		el.classList.remove('is-scrambling');
	});
}

export function initNavInteractions(root = document) {
	root.querySelectorAll('[data-scramble]').forEach(bindWord);
}
