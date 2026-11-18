/**
 * Frontend script for the GlaShutterSlider (Hero Slider) block.
 *
 * Shutter effect: every slide stays in the DOM. The outgoing slide lies on top
 * and is clipped away via clip-path (see style.scss), which reveals the next
 * slide underneath. A jump to any slide (pagination) is ONE single shutter.
 *
 * State machine: idle -> shutter running (is-animating) -> idle.
 * Input (arrows, dots, swipe, autoplay) is ignored while a shutter is running.
 *
 * Handles multiple instances of the block on a single page.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
import domReady from "@wordpress/dom-ready";

const DEFAULT_DURATION = 1500; // ms, fallback if --shutter-duration is missing
const DEFAULT_INTERVAL = 7000; // ms
const MIN_SWIPE_DISTANCE = 50; // px

/**
 * Reads the shutter duration (ms) from the CSS custom property --shutter-duration.
 * The value is set per block instance by render.php and mirrored in style.scss.
 * Supports "1500ms" and "1.5s".
 *
 * @param {HTMLElement} container
 * @returns {number}
 */
function readShutterDuration(container) {
	const raw = getComputedStyle(container)
		.getPropertyValue("--shutter-duration")
		.trim();
	const value = parseFloat(raw);
	if (!Number.isFinite(value) || value <= 0) return DEFAULT_DURATION;
	return raw.endsWith("ms") ? value : value * 1000;
}

/**
 * Initializes the slider logic for a specific block instance.
 * @param {HTMLElement} container The main block wrapper (.wp-block-gla-shutterslider).
 */
function initializeGlaShutterSlider(container) {
	// 1. Fetch instance-specific DOM elements (arrows/pagination/progress are optional)
	const sliderDom = container.querySelector(".slide-list");
	const prevDom = container.querySelector(".slide-prev");
	const nextDom = container.querySelector(".slide-next");
	const paginationDom = container.querySelector(".slide-pagination");
	const timeDom = container.querySelector(".slide-time");

	if (!sliderDom) {
		console.error("Hero Slider: .slide-list not found.", container);
		return;
	}

	const slides = Array.from(sliderDom.querySelectorAll(".slide-item"));
	const count = slides.length;
	if (count === 0) return;

	// 2. Settings from data attributes / CSS
	const isAutoplayEnabled = container.dataset.autoplay === "true" && count > 1;
	const interval = parseInt(container.dataset.interval, 10) || DEFAULT_INTERVAL;
	const isStopOnHoverEnabled = container.dataset.stopOnHover !== "false";
	const duration = readShutterDuration(container);

	// Progress bar only makes sense together with autoplay
	if (timeDom && !isAutoplayEnabled) timeDom.style.display = "none";

	// 3. State
	let current = 0; // slide that is shown (or is being clipped away)
	let target = null; // slide that is being revealed, null = idle
	let finishTimer = null;
	let autoTimer = null;
	let isHovering = false;
	let isDragging = false;
	let isInView = true; // updated by the IntersectionObserver below

	const dots = [];

	/**
	 * Neighbours behave like next/prev (incl. wrap-around), everything else by index.
	 * @param {number} to
	 * @returns {"next"|"prev"}
	 */
	function resolveDirection(to) {
		if (to === (current + 1) % count) return "next";
		if (to === (current - 1 + count) % count) return "prev";
		return to > current ? "next" : "prev";
	}

	/** Keeps keyboard focus and screen readers out of the hidden slides. */
	function syncInert() {
		slides.forEach((slide, i) => {
			slide.inert = i !== current;
		});
	}

	function setActiveDot(index) {
		dots.forEach((dot, i) => {
			dot.classList.toggle("active", i === index);
			if (i === index) dot.setAttribute("aria-current", "true");
			else dot.removeAttribute("aria-current");
		});
	}

	/**
	 * (Re)starts the autoplay countdown. No timer while paused or animating.
	 */
	function scheduleAutoplay() {
		clearTimeout(autoTimer);
		const isPaused =
			(isStopOnHoverEnabled && isHovering) || isDragging || !isInView;
		if (!isAutoplayEnabled || isPaused || target !== null) return;
		autoTimer = setTimeout(() => start("next"), interval);
	}

	/**
	 * Starts ONE shutter transition to the neighbour slide or to a given index.
	 * @param {"next"|"prev"} direction
	 * @param {number} [to]
	 */
	function start(direction, to) {
		if (target !== null || count < 2) return; // animation lock

		const next =
			to !== undefined
				? to
				: direction === "next"
					? (current + 1) % count
					: (current - 1 + count) % count;
		if (next === current || next < 0 || next >= count) return;

		clearTimeout(autoTimer);
		target = next;

		slides[current].classList.add("is-leaving", `leaving-${direction}`);
		slides[target].classList.add("is-target");
		container.classList.add("is-animating");
		setActiveDot(target);

		finishTimer = setTimeout(finish, duration);
	}

	/** Shutter finished: the target slide becomes the current one. */
	function finish() {
		const leaving = slides[current];
		leaving.classList.remove(
			"is-current",
			"is-leaving",
			"leaving-next",
			"leaving-prev",
		);

		slides[target].classList.remove("is-target");
		slides[target].classList.add("is-current");

		current = target;
		target = null;

		container.classList.remove("is-animating");
		syncInert();
		scheduleAutoplay();
	}

	// === PAGINATION (any dot = one single shutter) ===
	if (paginationDom) {
		paginationDom.innerHTML = "";
		for (let i = 0; i < count; i++) {
			const button = document.createElement("button");
			button.type = "button";
			button.setAttribute("aria-label", `Go to slide ${i + 1}`);
			button.addEventListener("click", () => {
				if (i !== current) start(resolveDirection(i), i);
			});
			paginationDom.appendChild(button);
			dots.push(button);
		}
	}

	// === ARROWS ===
	if (nextDom) nextDom.addEventListener("click", () => start("next"));
	if (prevDom) prevDom.addEventListener("click", () => start("prev"));

	// === HOVER PAUSE (mouse only, so touch devices never get stuck "hovering") ===
	container.addEventListener("pointerenter", (e) => {
		if (e.pointerType !== "mouse") return;
		isHovering = true;
		if (isStopOnHoverEnabled) clearTimeout(autoTimer);
	});

	container.addEventListener("pointerleave", (e) => {
		if (e.pointerType !== "mouse") return;
		isHovering = false;
		if (isStopOnHoverEnabled) scheduleAutoplay();
	});

	// === SWIPE (touch + mouse drag) via Pointer Events ===
	let dragStartX = null;

	container.addEventListener("pointerdown", (e) => {
		if (count < 2) return;
		if (e.pointerType === "mouse" && e.button !== 0) return;
		// Do not hijack clicks on links and buttons
		if (e.target.closest("a, button")) return;

		dragStartX = e.clientX;
		isDragging = true;
		clearTimeout(autoTimer);
		try {
			container.setPointerCapture(e.pointerId);
		} catch (err) {
			/* capture is only a convenience (drag keeps working outside the slider) */
		}
	});

	container.addEventListener("pointerup", (e) => {
		if (dragStartX === null) return;
		const distance = e.clientX - dragStartX;
		dragStartX = null;
		isDragging = false;

		if (Math.abs(distance) >= MIN_SWIPE_DISTANCE) {
			// ignored automatically while a shutter is running
			start(distance < 0 ? "next" : "prev");
		}
		scheduleAutoplay();
	});

	// Browser aborted the gesture (e.g. vertical scroll took over): resume autoplay
	container.addEventListener("pointercancel", () => {
		dragStartX = null;
		isDragging = false;
		scheduleAutoplay();
	});

	// === VISIBILITY: autoplay only runs while the slider is on screen ===
	// (several sliders on one page must not all keep rotating in the background)
	if (isAutoplayEnabled && "IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				isInView = entries[entries.length - 1].isIntersecting;
				if (isInView) scheduleAutoplay();
				else clearTimeout(autoTimer);
			},
			{ threshold: 0.1 },
		);
		observer.observe(container);
	}

	// === INITIALIZATION ===
	slides[0].classList.add("is-current");
	syncInert();
	setActiveDot(0);
	scheduleAutoplay();
}

/**
 * Sets --gla-scrollbar-width on <html>. style.scss subtracts it from 100vw,
 * so the full-width slider never causes horizontal scrolling when a classic
 * (non-overlay) scrollbar is visible.
 */
/* function updateScrollbarWidth() {
	const scrollbarWidth = Math.max(
		0,
		window.innerWidth - document.documentElement.clientWidth,
	);
	document.documentElement.style.setProperty(
		"--gla-scrollbar-width",
		`${scrollbarWidth}px`,
	);
} */ // 2026.11.18

/**
 * Parallax: one shared scroll listener (rAF-throttled) for all slider instances.
 * Writes --parallax-offset directly into the DOM, no re-render involved.
 * @param {HTMLElement[]} containers
 */
function initParallax(containers) {
	let ticking = false;

	const update = () => {
		ticking = false;
		const viewportHeight = window.innerHeight;

		containers.forEach((container) => {
			const rect = container.getBoundingClientRect();
			if (rect.top <= viewportHeight && rect.bottom >= 0) {
				const totalDistance = viewportHeight + rect.height;
				const currentProgress = (viewportHeight - rect.top) / totalDistance;
				const maxMovement = viewportHeight * 0.5; // corresponds to height: 150vh in CSS
				container.style.setProperty(
					"--parallax-offset",
					`${-(currentProgress * maxMovement)}px`,
				);
			}
		});
	};

	const requestUpdate = () => {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(update);
	};

	update();
	window.addEventListener("scroll", requestUpdate, { passive: true });
	window.addEventListener("resize", () => {
		// updateScrollbarWidth(); // 2026.11.18
		requestUpdate();
	});
}

/**
 * Global initialization on DOM ready.
 */
domReady(() => {
	const sliderContainers = Array.from(
		document.querySelectorAll(".wp-block-gla-shutterslider"),
	);
	if (sliderContainers.length === 0) return;

	// updateScrollbarWidth(); // 2026.11.18

	sliderContainers.forEach((container) => {
		// Avoid double initialization (useful for AJAX or caching plugins)
		if (container.hasAttribute("data-slider-initialized")) return;

		initializeGlaShutterSlider(container);
		container.setAttribute("data-slider-initialized", "true");

		// Fade the images in on the next animation frame
		window.requestAnimationFrame(() => container.classList.add("is-ready"));
	});

	initParallax(sliderContainers);
});
