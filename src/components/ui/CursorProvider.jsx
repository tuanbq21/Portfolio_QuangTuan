import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RotatingCursor from './RotatingCursor';

const CursorContext = createContext();

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

const CursorProvider = ({ children, excludeSelectors = [] }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleMouseEnter = (e) => {
    // Check if the element or its parents match any exclude selectors
    const shouldExclude = excludeSelectors.some(selector => 
      e.target.matches(selector) || e.target.closest(selector)
    );
    setIsVisible(!shouldExclude);
  };

  return (
    <CursorContext.Provider value={{ isVisible, setIsVisible }}>
      <div onMouseOver={handleMouseEnter}>
        {isVisible && (
          <RotatingCursor
            size={30}
            dotSize={12}
            cornerSize={8}
            color="var(--secondary)"
            rotationSpeed={1.5}
            hoverScale={1.3}
          />
        )}
        {children}
      </div>
    </CursorContext.Provider>
  );
};

CursorProvider.propTypes = {
  children: PropTypes.node.isRequired,
  excludeSelectors: PropTypes.arrayOf(PropTypes.string),
};

export default CursorProvider; 