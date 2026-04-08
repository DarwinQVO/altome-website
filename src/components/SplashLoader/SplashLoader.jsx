import { useEffect, useRef, useState } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import './SplashLoader.css';

const SplashLoader = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const logoRef = useRef(null);
  const letters = "ALTOMÉ".split("");

  useEffect(() => {
    // Safety timeout: Unlock site even if animation stalls
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (onComplete) onComplete();
    }, 5000);

    const tl = createTimeline({
      easing: 'easeOutQuart'
    });

    // 1. Formation in center
    tl.add('.splash-letter', {
      opacity: [0, 1],
      translateY: [20, 0],
      filter: ['blur(10px)', 'blur(0px)'],
      delay: stagger(100),
      duration: 1200,
    });

    // 2. Pause and Scale
    tl.add('.splash-logo', {
      scale: [1, 1.1, 1],
      duration: 800,
    }, '+=200');

    // 3. Move to corner
    tl.add('.splash-logo', {
      translateX: '-40vw',
      translateY: '-40vh',
      scale: 0.5,
      opacity: 0,
      duration: 1000,
    }, '-=800');

    // 4. Fade out container and complete
    tl.add('.splash-container', {
      opacity: [1, 0],
      duration: 800,
      easing: 'easeInOutQuad',
      onComplete: () => {
        setIsAnimating(false);
        if (onComplete) onComplete();
      }
    }, '+=500');

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div className="splash-container">
      <div className="splash-logo" ref={logoRef}>
        {letters.map((l, i) => (
          <span key={i} className="splash-letter">{l}</span>
        ))}
      </div>
    </div>
  );
};

export default SplashLoader;
