import React, { useEffect, useRef, useState } from 'react';
import { animate, stagger, splitText } from 'animejs';

const animations = [
  // Animation 1: Bounce up and rotate (original example)
  (chars) =>
    animate(chars, {
      y: [
        { to: '-2.75rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
      ],
      rotate: { from: '-1turn', delay: 0 },
      delay: stagger(50),
      ease: 'inOutCirc',
      loopDelay: 1000,
      loop: true
    }),

  // Animation 2: Fade in with scale
  (chars) =>
    animate(chars, {
      opacity: [0, 1],
      scale: [0.5, 1],
      delay: stagger(100),
      easing: 'easeOutElastic(1, .8)',
      loop: true,
      loopDelay: 1200
    }),

  // Animation 3: Wave up and down
  (chars) =>
    animate(chars, {
      translateY: [
        { value: -20, duration: 300, easing: 'easeInOutSine' },
        { value: 20, duration: 300, easing: 'easeInOutSine' }
      ],
      delay: stagger(100),
      direction: 'alternate',
      loop: true
    }),

  // Animation 4: Color change and scale pulsate
  (chars) =>
    animate(chars, {
      color: [
        { value: '#ff66cc', duration: 400 },
        { value: '#66ccff', duration: 400 }
      ],
      scale: [
        { value: 1.2, duration: 400, easing: 'easeInOutSine' },
        { value: 1, duration: 400, easing: 'easeInOutSine' }
      ],
      delay: stagger(75),
      loop: true
    }),

  // Animation 5: Flip Y with fade
  (chars) =>
    animate(chars, {
      rotateY: [
        { value: 90, duration: 400 },
        { value: 0, duration: 400 }
      ],
      opacity: [
        { value: 0, duration: 400 },
        { value: 1, duration: 400 }
      ],
      delay: stagger(80),
      easing: 'easeInOutQuad',
      loop: true
    }),

  // Animation 6: Slide from left with skew
  (chars) =>
    animate(chars, {
      translateX: [-30, 0],
      skewX: [45, 0],
      opacity: [0, 1],
      delay: stagger(70),
      easing: 'easeOutExpo',
      loop: true,
      loopDelay: 1000
    }),

  // Animation 7: Letter scale up and down
  (chars) =>
    animate(chars, {
      scale: [
        { value: 1.5, duration: 600, easing: 'easeInOutSine' },
        { value: 1, duration: 600, easing: 'easeInOutSine' }
      ],
      delay: stagger(60),
      loop: true
    }),

  // Animation 8: Bounce Y with easing
  (chars) =>
    animate(chars, {
      translateY: [
        { value: -40, duration: 400, easing: 'easeOutBounce' },
        { value: 0, duration: 400 }
      ],
      delay: stagger(80),
      loop: true
    }),

  // Animation 9: Rotate with scaling and fade
  (chars) =>
    animate(chars, {
      rotate: [
        { value: 360, duration: 2000, easing: 'linear' }
      ],
      scale: [
        { value: 0.5, duration: 1000, easing: 'easeInOutSine' },
        { value: 1, duration: 1000, easing: 'easeInOutSine' }
      ],
      opacity: [
        { value: 0.5, duration: 1000 },
        { value: 1, duration: 1000 }
      ],
      delay: stagger(50),
      loop: true
    }),

  // Animation 10: Pop in with fade from bottom
  (chars) =>
    animate(chars, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(90),
      easing: 'easeOutBack',
      loop: true
    })
];

function AnimatedHeading() {
  const headingRef = useRef(null);
  const animationRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!headingRef.current) return;

    const { chars } = splitText(headingRef.current, { words: false, chars: true });

    if (animationRef.current) {
      animationRef.current.pause();
    }

    animationRef.current = animations[index](chars);

    const interval = setInterval(() => {
      animationRef.current.pause();
      setIndex((prev) => (prev + 1) % animations.length);
    }, 7000); // Switch animation every 7 seconds

    return () => {
      clearInterval(interval);
      if (animationRef.current) animationRef.current.pause();
    };
  }, [index]);

  return <h2 ref={headingRef} style={{ display: 'inline-block', cursor: 'default' }}>Animated Text</h2>;
}

export default AnimatedHeading;
