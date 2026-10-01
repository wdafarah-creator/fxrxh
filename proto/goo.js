/* ==================================================================
   FXRXH — liquid type
   Dependency-free. No GSAP, no canvas, no WebGL.

   Each word gets its own SVG goo filter: a heavy Gaussian blur plus a
   colour matrix that slams the alpha contrast back up. Blurred glyphs
   bleed into each other and read as liquid; animating the blur to zero
   resolves them into the typeface.

   Paste into Webflow: Site Settings → Custom Code → Footer, in <script>.
   ================================================================== */

(function () {
	'use strict';

	var CONFIG = {
		selector: '[data-goo]',
		blurRatio: 0.09, // start blur as a fraction of font size
		duration: 900, // ms for one word to resolve
		stagger: 90 // ms between words
	};

	// Alpha contrast. The -9 offset crushes the soft edges the blur
	// created, so what is left has hard boundaries — the "goo".
	var MATRIX = '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9';

	var uid = 0;
	var svg = null;

	function defs() {
		if (svg) return svg.firstChild;
		svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('aria-hidden', 'true');
		svg.setAttribute('width', '0');
		svg.setAttribute('height', '0');
		svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
		svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
		document.body.appendChild(svg);
		return svg.firstChild;
	}

	function makeFilter(startBlur) {
		var NS = 'http://www.w3.org/2000/svg';
		var id = 'goo-' + uid++;
		var f = document.createElementNS(NS, 'filter');
		f.setAttribute('id', id);
		// Roomy region so the blur is not clipped at the glyph edges.
		f.setAttribute('x', '-25%');
		f.setAttribute('y', '-25%');
		f.setAttribute('width', '150%');
		f.setAttribute('height', '150%');
		f.setAttribute('color-interpolation-filters', 'sRGB');

		var blur = document.createElementNS(NS, 'feGaussianBlur');
		blur.setAttribute('in', 'SourceGraphic');
		blur.setAttribute('stdDeviation', startBlur);
		blur.setAttribute('result', 'blur');

		var matrix = document.createElementNS(NS, 'feColorMatrix');
		matrix.setAttribute('in', 'blur');
		matrix.setAttribute('type', 'matrix');
		matrix.setAttribute('values', MATRIX);

		f.appendChild(blur);
		f.appendChild(matrix);
		defs().appendChild(f);

		return { id: id, blur: blur };
	}

	function splitWords(el) {
		var words = el.textContent.trim().split(/\s+/);
		el.textContent = '';
		return words.map(function (w, i) {
			var span = document.createElement('span');
			span.className = 'word';
			span.textContent = w;
			el.appendChild(span);
			if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
			return span;
		});
	}

	function easeOutCubic(t) {
		return 1 - Math.pow(1 - t, 3);
	}

	function resolve(word, filter, startBlur, delay) {
		var began = null;
		var done = false;

		function finish() {
			if (done) return;
			done = true;
			filter.blur.setAttribute('stdDeviation', '0');
			// Drop the filter entirely once resolved — no point paying for
			// a no-op filter on every repaint.
			word.style.filter = '';
		}

		function step(now) {
			if (done) return;
			if (began === null) began = now;
			var elapsed = now - began - delay;

			if (elapsed < 0) return requestAnimationFrame(step);

			var t = Math.min(1, elapsed / CONFIG.duration);
			var value = startBlur * (1 - easeOutCubic(t));
			filter.blur.setAttribute('stdDeviation', value.toFixed(2));

			if (t < 1) return requestAnimationFrame(step);

			finish();
		}

		// rAF is paused in background tabs, which would otherwise leave the
		// word stuck as an unreadable blob. Guarantee it resolves.
		setTimeout(finish, delay + CONFIG.duration + 500);

		requestAnimationFrame(step);
	}

	function run(el) {
		if (el.dataset.gooDone) return;
		el.dataset.gooDone = '1';

		var size = parseFloat(getComputedStyle(el).fontSize) || 100;
		var startBlur = size * CONFIG.blurRatio;

		splitWords(el).forEach(function (word, i) {
			var filter = makeFilter(startBlur);
			word.style.filter = 'url(#' + filter.id + ')';
			resolve(word, filter, startBlur, i * CONFIG.stagger);
		});
	}

	function init() {
		var targets = [].slice.call(document.querySelectorAll(CONFIG.selector));
		if (!targets.length) return;

		// Motion off: leave the type crisp and skip the whole thing.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		if (!('IntersectionObserver' in window)) {
			targets.forEach(run);
			return;
		}

		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					run(entry.target);
					io.unobserve(entry.target);
				});
			},
			{ rootMargin: '0px 0px -10% 0px' }
		);

		targets.forEach(function (t) {
			io.observe(t);
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
