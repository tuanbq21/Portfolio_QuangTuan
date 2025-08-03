import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useLazyLoading } from '../../hooks/useLazyLoading';

const PhotoCard = ({ photo, onClick, index }) => {
  const { imgRef, isLoaded, isInView, handleImageLoad } = useLazyLoading();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-primary-light"
      onClick={() => onClick(photo)}
    >
      <div ref={imgRef} className="aspect-square overflow-hidden relative">
        {/* Loading Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-light via-gray-700 to-primary-light animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          </div>
        )}
        
        {/* Actual Image */}
        {isInView && (
          <motion.img
            src={photo.src}
            alt={photo.title}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
      
      {/* Hover Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4"
      >
        <h3 className="text-white font-dmsans font-semibold text-lg mb-1">
          {photo.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-secondary text-sm font-dmsans">
            {photo.category}
          </span>
          <span className="text-gray-300 text-xs font-dmsans">
            {new Date(photo.date).toLocaleDateString()}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default PhotoCard;