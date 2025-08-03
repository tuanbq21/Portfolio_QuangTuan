import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const PhotoModal = ({ photo, isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext }) => {
  if (!photo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-6xl w-full max-h-[95vh] bg-primary-light rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-secondary transition-colors z-20 bg-black/50 rounded-full p-2"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {hasPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-secondary transition-colors z-20 bg-black/50 rounded-full p-3"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
            )}

            {hasNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-secondary transition-colors z-20 bg-black/50 rounded-full p-3"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            )}

            <div className="flex flex-col lg:flex-row h-full">
              <div className="flex-1 flex items-center justify-center p-4">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="max-w-full max-h-[60vh] lg:max-h-[80vh] object-contain rounded-lg"
                />
              </div>
              
              <div className="lg:w-80 bg-primary-dark p-6 flex flex-col justify-center">
                <h2 className="text-white font-bitcount text-2xl lg:text-3xl mb-4">
                  {photo.title}
                </h2>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-secondary text-primary-dark px-3 py-1 rounded-full text-sm font-dmsans font-semibold">
                    {photo.category}
                  </span>
                  <span className="text-gray-400 font-dmsans text-sm">
                    {new Date(photo.date).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-300 font-dmsans leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PhotoModal.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired
};

export default PhotoModal;