import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PhotoGrid from './PhotoGrid';
import PhotoModal from './PhotoModal';
import { mockPhotos } from '../../data/photos';
import LightRays from '../ui/LightRays';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(mockPhotos.map(photo => photo.category))];
    return ['All', ...uniqueCategories];
  }, []);

  // Filter photos by category
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') {
      return mockPhotos;
    }
    return mockPhotos.filter(photo => photo.category === selectedCategory);
  }, [selectedCategory]);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const handlePrevious = () => {
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    }
  };

  const currentIndex = selectedPhoto ? filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < filteredPhotos.length - 1;

  return (
    <div className="min-h-screen relative pt-20 pb-12">
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#64ffda"
          raysSpeed={1.2}
          lightSpread={0.6}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.05}
          distortion={0.02}
          fadeDistance={0.8}
          saturation={0.9}
        />
      </div>
      <div className="absolute inset-0 bg-primary-dark/40"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 mt-[45px]"
        >
          <h1 className="text-4xl md:text-5xl font-bitcount text-secondary mb-4">
            Photo Gallery
          </h1>
          <p className="text-gray-300 font-dmsans text-lg max-w-2xl mx-auto">
            A collection of moments captured through my lens. Each image tells a story, 
            from urban landscapes to natural wonders.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-dmsans transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-secondary text-primary-dark font-semibold'
                  : 'bg-primary-light text-white hover:bg-secondary hover:text-primary-dark'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Photo Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-gray-400 font-dmsans">
            Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Photo Grid */}
        <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
      </div>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    </div>
  );
};

export default PhotoGallery;