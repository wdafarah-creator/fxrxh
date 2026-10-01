// Canvas-based ASCII texture field.
// Draws a grid of monospace glyphs that quietly flicker between characters.
// Deliberately low-contrast and slow so it reads as texture, not noise.

const GLYPHS = '01·:;+=*#%$&/\\<>[]{}()!?^~•∙°'.split('');

function readVar(name, fallback) {
	if (typeof window === 'undefined') return fallback;
	const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	return value || fallback;
}

function hexToRgb(hex) {
	const clean = hex.replace('#', '');
	const bigint = parseInt(clean, 16);
	return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export class AsciiField {
	constructor(canvas, opts = {}) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.cellSize = opts.cellSize ?? 20;
		this.density = opts.density ?? 1;
		this.reducedMotion = opts.reducedMotion ?? false;

		this.quietZones = [];
		this.pulses = [];
		this.cols = 0;
		this.rows = 0;
		this.cells = [];
		this.dpr = Math.min(window.devicePixelRatio || 1, 2);

		this.lastFrame = 0;
		this.frameInterval = 1000 / 24;
		this.running = false;
		this._raf = null;

		this.colorRgb = [hexToRgb(readVar('--grey-light', '#b4b4b4')), hexToRgb(readVar('--grey-mid', '#6a6a6a'))];
		this.fontFamily = readVar('--font-mono', "ui-monospace, 'SF Mono', monospace");

		this._onResize = this._onResize.bind(this);
		this._tick = this._tick.bind(this);

		this.resize();
		window.addEventListener('resize', this._onResize);
	}

	_onResize() {
		clearTimeout(this._resizeTimer);
		this._resizeTimer = setTimeout(() => this.resize(), 120);
	}

	resize() {
		const { canvas } = this;
		const w = window.innerWidth;
		const h = window.innerHeight;
		this.dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.floor(w * this.dpr);
		canvas.height = Math.floor(h * this.dpr);
		canvas.style.width = w + 'px';
		canvas.style.height = h + 'px';
		this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

		this.cols = Math.ceil(w / this.cellSize) + 1;
		this.rows = Math.ceil(h / this.cellSize) + 1;
		this.width = w;
		this.height = h;

		this._buildCells();
		this._render(true);
	}

	_buildCells() {
		const cells = new Array(this.cols * this.rows);
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				const x = col * this.cellSize;
				const y = row * this.cellSize;
				const hole = this._holeMask(x, y);
				cells[row * this.cols + col] = {
					char: GLYPHS[(Math.random() * GLYPHS.length) | 0],
					colorIdx: Math.random() > 0.35 ? 0 : 1,
					baseAlpha: hole,
					alpha: hole,
					nextChange: performance.now() + Math.random() * 4000,
				};
			}
		}
		this.cells = cells;
	}

	// Organic, static "clearings" using layered sine noise so the field
	// thins out in some regions instead of covering the viewport evenly.
	_holeMask(x, y) {
		const w = this.width || 1;
		const h = this.height || 1;
		const nx = x / w;
		const ny = y / h;
		const n =
			Math.sin(nx * 6.1 + 1.7) * Math.cos(ny * 5.3) +
			Math.sin((nx + ny) * 4.2 + 0.4) * 0.6 +
			Math.cos(nx * 9.4 - ny * 3.1) * 0.3;
		const normalized = (n + 2) / 4; // roughly 0..1
		const clamped = Math.min(1, Math.max(0, normalized));
		// push toward extremes so clearings read as clearings, not haze
		return Math.pow(clamped, 1.6);
	}

	setQuietZones(zones) {
		this.quietZones = zones;
	}

	setDensity(density) {
		this.density = density;
	}

	pulse(x, y, radius = 220, strength = 0.9, duration = 900) {
		this.pulses.push({ x, y, radius, strength, start: performance.now(), duration });
	}

	_quietFactor(x, y) {
		let factor = 1;
		for (const zone of this.quietZones) {
			const pad = zone.padding ?? 40;
			const left = zone.x - pad;
			const right = zone.x + zone.w + pad;
			const top = zone.y - pad;
			const bottom = zone.y + zone.h + pad;
			if (x >= left && x <= right && y >= top && y <= bottom) {
				const dx = Math.max(zone.x - x, 0, x - (zone.x + zone.w));
				const dy = Math.max(zone.y - y, 0, y - (zone.y + zone.h));
				const dist = Math.sqrt(dx * dx + dy * dy);
				const t = Math.min(1, dist / pad);
				factor = Math.min(factor, t);
			}
		}
		return factor;
	}

	_pulseBoost(x, y, now) {
		let boost = 0;
		this.pulses = this.pulses.filter((p) => now - p.start < p.duration);
		for (const p of this.pulses) {
			const dx = x - p.x;
			const dy = y - p.y;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist > p.radius) continue;
			const t = 1 - dist / p.radius;
			const life = 1 - (now - p.start) / p.duration;
			boost += t * life * p.strength;
		}
		return boost;
	}

	start() {
		if (this.running) return;
		this.running = true;
		this._raf = requestAnimationFrame(this._tick);
	}

	stop() {
		this.running = false;
		if (this._raf) cancelAnimationFrame(this._raf);
	}

	setReducedMotion(value) {
		this.reducedMotion = value;
		if (value) {
			this.stop();
			this._render(true);
		} else {
			this.start();
		}
	}

	_tick(now) {
		if (!this.running) return;
		this._raf = requestAnimationFrame(this._tick);
		if (now - this.lastFrame < this.frameInterval) return;
		this.lastFrame = now;
		this._update(now);
		this._render();
	}

	_update(now) {
		const { cols, rows, cellSize } = this;
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				const cell = this.cells[row * cols + col];
				const x = col * cellSize;
				const y = row * cellSize;
				if (now >= cell.nextChange) {
					cell.char = GLYPHS[(Math.random() * GLYPHS.length) | 0];
					if (Math.random() > 0.85) cell.colorIdx = cell.colorIdx === 0 ? 1 : 0;
					const speed = 900 + Math.random() * 3200;
					cell.nextChange = now + speed / Math.max(this.density, 0.15);
				}
				const quiet = this._quietFactor(x, y);
				const boost = this._pulseBoost(x, y, now);
				const target = Math.min(1, cell.baseAlpha * this.density * quiet + boost);
				cell.alpha += (target - cell.alpha) * 0.08;
			}
		}
	}

	_render(force = false) {
		const { ctx, cols, rows, cellSize, width, height, fontFamily } = this;
		ctx.clearRect(0, 0, width, height);
		ctx.font = `${Math.floor(cellSize * 0.62)}px ${fontFamily}`;
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				const cell = this.cells[row * cols + col];
				const alpha = force ? cell.baseAlpha * this.density : cell.alpha;
				if (alpha < 0.03) continue;
				const [r, g, b] = this.colorRgb[cell.colorIdx];
				ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
				const x = col * cellSize + cellSize / 2;
				const y = row * cellSize + cellSize / 2;
				ctx.fillText(cell.char, x, y);
			}
		}
	}

	destroy() {
		this.stop();
		window.removeEventListener('resize', this._onResize);
	}
}
