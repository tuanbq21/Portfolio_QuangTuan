import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './RotatingCursor.css';

const RotatingCursor = ({
  size = 30,
  dotSize = 12,
  cornerSize = 8,
  color = 'white',
  rotationSpeed = 2,
  hoverScale = 1.5,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      // Only update if not hovering over elements with class 'no-cursor'
      if (!e.target.closest('.no-cursor')) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const updateHoverState = (e) => {
      const hoverable = e.target.closest('button, a, input, [data-cursor-hover]');
      const noCursor = e.target.closest('.no-cursor');
      setIsHovered(!!hoverable && !noCursor);
    };

    // Add cursor-none class to body
    document.body.classList.add('use-custom-cursor');

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      document.body.classList.remove('use-custom-cursor');
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  const scale = isHovered ? hoverScale : 1;
  const cursorSize = size * scale;

  return (
    <div
      className={`rotating-cursor ${isHovered ? 'hover' : ''}`}
      style={{
        transform: `translate(${position.x - cursorSize / 2}px, ${
          position.y - cursorSize / 2
        }px)`,
        width: cursorSize,
        height: cursorSize,
      }}
    >
      <div
        className="cursor-dot"
        style={{
          width: dotSize * scale,
          height: dotSize * scale,
          backgroundColor: color,
        }}
      />
      <div
        className="cursor-corners"
        style={{
          animationDuration: `${rotationSpeed}s`,
        }}
      >
        {['tl', 'tr', 'bl', 'br'].map((pos) => (
          <div
            key={pos}
            className={`cursor-corner cursor-corner-${pos}`}
            style={{
              width: cornerSize * scale,
              height: cornerSize * scale,
              borderColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

RotatingCursor.propTypes = {
  size: PropTypes.number,
  dotSize: PropTypes.number,
  cornerSize: PropTypes.number,
  color: PropTypes.string,
  rotationSpeed: PropTypes.number,
  hoverScale: PropTypes.number,
};

export default RotatingCursor; 