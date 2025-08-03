import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './TimelineLine.css';

const ExperienceItem = ({ isEven, title, organization, year, description, logo }) => {
  const contentLeft = (
    <div className="flex flex-col items-end text-right">
      <h3 className="text-2xl font-bold text-white font-dmsans">{title}</h3>
      <p className="text-secondary text-lg font-dmsans">{organization}</p>
      <p className="text-gray-400 font-dmsans">{year}</p>
      <div className="mt-4 w-12 h-12 rounded-full bg-[#112240] flex items-center justify-center text-secondary">
        {logo}
      </div>
    </div>
  );

  const contentRight = (
    <div className=" p-6 rounded-lg">
      <p className="text-gray-300 font-dmsans leading-relaxed">{description}</p>
    </div>
  );

  const infoContent = (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold text-white font-dmsans">{title}</h3>
      <p className="text-secondary text-lg font-dmsans">{organization}</p>
      <p className="text-gray-400 font-dmsans">{year}</p>
      <div className="mt-4 w-12 h-12 rounded-full bg-[#112240] flex items-center justify-center text-secondary">
        {logo}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-[1fr_2px_1fr] gap-8 mb-12 relative">
      {isEven ? (
        <>
          {contentLeft}
          <div className="w-full h-full" /> {/* Timeline space */}
          {contentRight}
        </>
      ) : (
        <>
          {contentRight}
          <div className="w-full h-full" /> {/* Timeline space */}
          {infoContent}
        </>
      )}
    </div>
  );
};

const MyExperience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const dotY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  const experiences = [
    {
      title: "Student Trainee",
      organization: "Datacom",
      year: "2015",
      description: "Attended a three-month workshop at DATACOM during my younger years, where we were taught about the fundamentals of MS Excel, the proficiency of keyboarding, and the main components of a computer system.",
      logo: "D"
    },
    {
      title: "External Scholar",
      organization: "Security Bank Corporation",
      year: "2022",
      description: "One of the external scholars of the Security Bank Corporation. Inside this, we are tasked with attending related seminars and maintaining grades on our academic standings.",
      logo: "S"
    },
  ];

  return (
    <section ref={containerRef} className="py-20 bg-primary-dark relative min-h-screen">
      <div className="max-w-7xl mx-auto px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-white font-dmsans mb-4">My Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline container */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full">
            <div className="timeline-line" />
            <motion.div 
              className="timeline-progress"
              style={{ 
                scaleY,
                transformOrigin: "top"
              }}
            />
            {/* Moving dot */}
            <motion.div 
              className="absolute w-4 h-4 -translate-x-1/2 bg-[#64ffda] rounded-full z-10"
              style={{
                left: "50%",
                top: dotY,
                boxShadow: "0 0 10px 4px rgba(100, 255, 218, 0.3), 0 0 20px 8px rgba(100, 255, 218, 0.2), 0 0 30px 12px rgba(100, 255, 218, 0.1)",
                filter: "brightness(1.2)",
                animation: "pulse 2s infinite"
              }}
            />
          </div>

          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <ExperienceItem
                  isEven={index % 2 === 0}
                  {...exp}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyExperience; 