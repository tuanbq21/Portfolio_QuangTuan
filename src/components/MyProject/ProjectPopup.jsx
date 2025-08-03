import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const ProjectPopup = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const progressRef = useRef(null);

  useEffect(() => {
    // Save the current scroll position and body overflow
    const scrollY = window.scrollY;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Prevent scrolling while maintaining the cursor
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px'; // Prevent layout shift from scrollbar disappearing
    
    // Cleanup function
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '0px';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(nextImage, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, project.screenshots.length]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8 mt-16">
        <div className="absolute inset-0 z-0">
          
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-[#0a192f]/80 backdrop-blur-sm w-full max-w-4xl max-h-[80vh] overflow-y-auto relative rounded-lg z-10 custom-scrollbar"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="sticky top-4 float-right right-4 text-white/60 hover:text-white transition-colors z-10 bg-[#0a192f] rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8 bg-primary-dark">  
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white font-dmsans">{project.title}</h2>
            </div>

            {/* Tech Stack Icons */}
            <div className="flex justify-center gap-6 mb-8">
              <div className="bg-neutral-900 px-6 py-4 rounded-lg">
                <h3 className="text-[#8892b0] text-sm mb-4 text-center">Frontend</h3>
                <div className="flex justify-center gap-6">
                  {project.techDetails
                    .filter(tech => tech.category === 'frontend')
                    .map((tech, index) => (
                      <HoverCard key={index}>
                        <HoverCardTrigger asChild>
                          <motion.div 
                            className="w-10 h-10 cursor-pointer transition-transform duration-200 ease-out"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img 
                              src={tech.logo} 
                              alt={tech.name}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-fit bg-[#1a1a1a] border-neutral-700">
                          <div className="flex flex-col gap-2">
                            <span className="text-white font-medium">{tech.name}</span>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                </div>
              </div>

              <div className="bg-neutral-900 px-6 py-4 rounded-lg">
                <h3 className="text-[#8892b0] text-sm mb-4 text-center">Backend</h3>
                <div className="flex justify-center gap-6">
                  {project.techDetails
                    .filter(tech => tech.category === 'backend')
                    .map((tech, index) => (
                      <HoverCard key={index}>
                        <HoverCardTrigger asChild>
                          <motion.div 
                            className="w-10 h-10 cursor-pointer transition-transform duration-200 ease-out"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img 
                              src={tech.logo} 
                              alt={tech.name}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-fit bg-[#1a1a1a] border-neutral-700">
                          <div className="flex flex-col gap-2">
                            <span className="text-white font-medium">{tech.name}</span>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-[#8892b0] leading-relaxed mb-8 font-dmsans">
              {project.description}
            </div>

            {/* Project Screenshots Carousel */}
            <div 
              className="relative h-[300px] mb-8 rounded-lg overflow-hidden group"
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {project.screenshots.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: currentImageIndex === index ? 1 : 0,
                    transition: { duration: 0.5 }
                  }}
                  className="absolute inset-0"
                  style={{ display: currentImageIndex === index ? 'block' : 'none' }}
                >
                  <img 
                    src={img} 
                    alt={`${project.title} screenshot ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
              
              {/* Navigation Buttons */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/80 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/80 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${((currentImageIndex + 1) / project.screenshots.length) * 100}%`
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-white text-black rounded-md font-medium hover:bg-white/90 transition-colors"
                >
                  Visit website
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-[#1a1a1a] text-white rounded-md font-medium hover:bg-[#2a2a2a] transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Github
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectPopup; 