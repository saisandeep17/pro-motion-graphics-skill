import gsap from 'gsap';

export function buildMasterTimeline(fps = 60, durationInSeconds = 10) {
  const tl = gsap.timeline({
    paused: true,
    defaults: {
      ease: 'power3.out',
    },
  });

  // 1. Grid line expansion
  tl.to('.grid-line.v', {
    scaleY: 1,
    duration: 0.8,
    stagger: 0.04,
    ease: 'power4.out',
  }, 0)
  .to('.grid-line.h', {
    scaleX: 1,
    duration: 0.8,
    stagger: 0.04,
    ease: 'power4.out',
  }, 0.2);

  // 2. Eyebrow appearance
  tl.fromTo('.metadata-eyebrow', {
    opacity: 0,
    y: 10,
  }, {
    opacity: 1,
    y: 0,
    duration: 0.5,
  }, 0.4);

  // 3. Kinetic Headline baseline rise
  tl.to('.line', {
    y: '0%',
    duration: 0.85,
    ease: 'power4.out',
    stagger: 0.08,
  }, 0.5);

  // 4. Metric Card & Tabular Counter
  tl.to('.metric-card', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, 1.2);

  const counterObj = { val: 0 };
  const counterEl = document.getElementById('counter');

  tl.to(counterObj, {
    val: 99.9,
    duration: 1.5,
    ease: 'power2.out',
    onUpdate: () => {
      if (counterEl) {
        counterEl.textContent = counterObj.val.toFixed(1);
      }
    },
  }, 1.4);

  return tl;
}

