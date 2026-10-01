let intervalId;

function format(date) {
	const hh = String(date.getHours()).padStart(2, '0');
	const mm = String(date.getMinutes()).padStart(2, '0');
	const ss = String(date.getSeconds()).padStart(2, '0');
	return `${hh}:${mm}:${ss} MAD`;
}

export function initClock() {
	const el = document.getElementById('clock-time');
	if (!el) return;

	clearInterval(intervalId);
	const tick = () => {
		el.textContent = format(new Date());
	};
	tick();
	intervalId = setInterval(tick, 1000);
}
