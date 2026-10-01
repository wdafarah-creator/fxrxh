// Character-shuffle "decrypt" effect: on hover each letter cycles through
// random glyphs before resolving back to the original character.

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#%&*+=/\\<>'.split('');

export class TextScramble {
	constructor(el) {
		this.el = el;
		this.original = el.dataset.text ?? el.textContent;
		el.dataset.text = this.original;
		this.frame = 0;
		this.frameRequest = null;
		this.queue = [];
	}

	play({ duration = 480, stagger = 28 } = {}) {
		if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
		const chars = this.original.split('');
		const totalFrames = Math.ceil(duration / 16);

		this.queue = chars.map((char, i) => {
			const start = Math.floor((i * stagger) / 16);
			const end = start + Math.max(4, Math.floor(totalFrames * 0.5));
			return { char, start, end, current: '' };
		});

		this.frame = 0;
		return new Promise((resolve) => {
			this._resolve = resolve;
			this._update();
		});
	}

	_update() {
		let output = '';
		let complete = 0;

		for (const item of this.queue) {
			if (item.char === ' ') {
				output += ' ';
				complete++;
				continue;
			}
			if (this.frame >= item.end) {
				output += item.char;
				complete++;
			} else {
				if (!item.lockFrame || this.frame >= item.lockFrame) {
					item.current = SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
					item.lockFrame = this.frame + 2;
				}
				output += item.current;
			}
		}

		this.el.textContent = output;

		if (complete === this.queue.length) {
			this.el.textContent = this.original;
			this._resolve?.();
			return;
		}

		this.frame++;
		this.frameRequest = requestAnimationFrame(() => this._update());
	}

	reset() {
		if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
		this.el.textContent = this.original;
	}
}
