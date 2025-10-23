import { gsap } from "gsap";

export function init3dPerspectiveHover() {
  // alleen pointer-capable hover devices
  const canHover = window.matchMedia?.(
    "(hover: hover) and (pointer: fine)"
  ).matches;
  if (!canHover) return () => {};

  const nodeList = document.querySelectorAll("[data-3d-hover-target]");
  if (!nodeList.length) return () => {};

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
    return () => {};

  const DEFAULT_MAX_DEG = 20;
  const EASE = "power3.out";
  const DURATION = 0.45;

  let desktopMode = window.innerWidth >= 1200;
  function onResizeMode() {
    desktopMode = window.innerWidth >= 1200;
    measureAll(); // herbereken rects bij resize
  }
  window.addEventListener("resize", onResizeMode);

  // build targets with layers
  const targets = Array.from(nodeList).map((el) => {
    const maxAttr = parseFloat(el.getAttribute("data-max-rotate"));
    const maxRotate = Number.isFinite(maxAttr) ? maxAttr : DEFAULT_MAX_DEG;

    // collect layers and parse depth values
    const layerNodes = Array.from(el.querySelectorAll("[data-3d-layer-depth]"));
    const layers = layerNodes.map((layerEl) => {
      const raw = (layerEl.getAttribute("data-3d-layer-depth") || "0").trim();
      const numeric = parseFloat(raw) || 0;
      // if user specified a unit (px, vw, %) keep it, otherwise default to vw for visible depth
      const hasUnit = /[a-z%]+$/i.test(raw);
      const translateZValue = hasUnit ? raw : `${numeric}vw`;
      // set initial translateZ (CSS) so element visually pops
      layerEl.style.transform = `translateZ(${translateZValue})`;
      layerEl.style.willChange = "transform";
      return { el: layerEl, depthNum: numeric };
    });

    const setRotationX = gsap.quickSetter(el, "rotationX", "deg");
    const setRotationY = gsap.quickSetter(el, "rotationY", "deg");

    return {
      el,
      maxRotate,
      rect: el.getBoundingClientRect(),
      proxy: { rx: 0, ry: 0 },
      setRotationX,
      setRotationY,
      layers,
      isHovering: false, // state for scaling/hover-class
    };
  });

  // measure rects
  function measureAll() {
    targets.forEach((t) => {
      t.rect = t.el.getBoundingClientRect();
    });
  }

  // shared mouse
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let frameScheduled = false;

  function onPointerMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!frameScheduled) {
      frameScheduled = true;
      requestAnimationFrame(updateAll);
    }
  }

  function updateAll() {
    frameScheduled = false;
    for (const t of targets) {
      const { el, rect, maxRotate, proxy, setRotationX, setRotationY, layers } =
        t;

      // pointer inside this card?
      const isOver =
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom;

      // logic: desktop -> cards react when pointer is over them (normal hover).
      // carousel (mobile/tablet) -> only the card that has .active and pointer is over it should react.
      const shouldReact = desktopMode
        ? isOver
        : isOver && el.classList.contains("active");

      // if not reacting, gently reset rotation & inner layers
      if (!shouldReact) {
        // only animate reset if previously hovering to avoid jitter
        if (t.isHovering) {
          t.isHovering = false;
          el.classList.remove("is-hovering");
          // reset rotation proxy
          gsap.to(proxy, {
            rx: 0,
            ry: 0,
            duration: DURATION,
            ease: EASE,
            onUpdate: () => {
              setRotationX(proxy.rx);
              setRotationY(proxy.ry);
            },
          });
          // reset scale
          gsap.to(el, { scale: 1, duration: 0.32, ease: EASE });
          // reset inner layer translations
          layers.forEach((layer) => {
            gsap.to(layer.el, {
              x: 0,
              y: 0,
              duration: DURATION,
              ease: EASE,
              overwrite: true,
            });
          });
        }
        continue;
      }

      // at this point: shouldReact === true
      // set hovering state once
      if (!t.isHovering) {
        t.isHovering = true;
        el.classList.add("is-hovering");
        gsap.to(el, { scale: 1.04, duration: 0.22, ease: EASE });
      }

      // compute normalized rotation based on this card center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = Math.max(
        -1,
        Math.min(1, (mouseX - centerX) / (rect.width / 2 || 1))
      );
      const normY = Math.max(
        -1,
        Math.min(1, (mouseY - centerY) / (rect.height / 2 || 1))
      );

      const rotationY = normX * maxRotate;
      const rotationX = -normY * maxRotate;

      gsap.to(proxy, {
        rx: rotationX,
        ry: rotationY,
        duration: DURATION,
        ease: EASE,
        overwrite: true,
        onUpdate: () => {
          setRotationX(proxy.rx);
          setRotationY(proxy.ry);
        },
      });

      // parallax inner layers: use their numeric depth (depthNum) with a damping factor so movement stays subtle
      layers.forEach((layer) => {
        const factor = Math.max(1, layer.depthNum || 1); // avoid zero
        gsap.to(layer.el, {
          x: (normX * factor * rect.width) / 20, // tweak divisor to control strength
          y: (normY * factor * rect.height) / 30,
          duration: DURATION,
          ease: EASE,
          overwrite: true,
        });
      });
    }
  }

  // listeners to keep rects correct
  function onScroll() {
    requestAnimationFrame(measureAll);
  }

  measureAll();
  document.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("resize", onResizeMode, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  // cleanup
  function destroy() {
    document.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", onResizeMode);
    window.removeEventListener("scroll", onScroll);
  }

  return destroy;
}
