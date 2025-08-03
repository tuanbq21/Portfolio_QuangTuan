import { motion } from 'framer-motion';
import { useState } from 'react';
import TiltedCard from '../ui/TiltedCard';
import ProjectPopup from './ProjectPopup';

const techLogos = {
  "React": "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  "CSS": "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
  "MongoDB": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
  "Node": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
  "Python": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  "Next.js": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
  "Tailwind": "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg",
  "Framer": "https://www.vectorlogo.zone/logos/framer/framer-icon.svg",
  "TypeScript": "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  "Docker": "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg"
};

const projects = [
  {
    title: "AI Dockerfile Optimizer",
    role: "Full Stack Developer",
    techStack: ["React", "TypeScript", "Python", "Docker"],
    image: "/tuandot.jpg",
    description: "AI-docker-file-optimizer helps optimize Dockerfiles for smaller, more efficient images. Simply paste your Dockerfile, and the app analyzes it for best practices and size optimization tips. It then provides a refactored, optimized version of the Dockerfile. Deployed on Vercel, it ensures fast and easy access to Dockerfile optimization.",
    techDetails: [
      { name: "React", logo: techLogos["React"], category: "frontend" },
      { name: "TypeScript", logo: techLogos["TypeScript"], category: "frontend" },
      { name: "Python", logo: techLogos["Python"], category: "backend" },
      { name: "Docker", logo: techLogos["Docker"], category: "backend" }
    ],
    screenshots: [
      "/tuandot.jpg",
      "/tuandot.jpg",
      "/tuandot.jpg"
    ],
    demoLink: "https://ai-dockerfile-optimizer.com",
    githubLink: "https://github.com/yourusername/ai-dockerfile-optimizer"
  },
  {
    title: "GDSC PLM Website",
    role: "Web Developer",
    techStack: ["Next.js", "Tailwind", "Framer"],
    image: "/tuandot.jpg",
    description: "Official website for Google Developer Student Clubs PLM chapter, showcasing our community's projects and events. The site features a modern design with smooth animations and responsive layouts, making it accessible across all devices.",
    techDetails: [
      { name: "Next.js", logo: techLogos["Next.js"], category: "frontend" },
      { name: "Tailwind", logo: techLogos["Tailwind"], category: "frontend" },
      { name: "Framer", logo: techLogos["Framer"], category: "frontend" }
    ],
    screenshots: [
      "/gdsc-screen1.jpg",
      "/gdsc-screen2.jpg",
      "/gdsc-screen3.jpg"
    ],
    demoLink: "https://gdsc-plm.org",
    githubLink: "https://github.com/gdsc-plm/website"
  }
];

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className="absolute inset-0 border-2 border-white/20 rounded-[15px] transform group-hover:border-[#64ffda] transition-colors duration-300"></div>
      <div className="p-3">
        <TiltedCard
          imageSrc={project.image}
          altText={project.title}
          captionText={project.title}
          containerHeight="400px"
          containerWidth="100%"
          imageHeight="400px"
          imageWidth="100%"
          scaleOnHover={1.05}
          rotateAmplitude={8}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={true}
          overlayContent={
            <div className="text-white p-6 w-full">
              <h3 className="text-2xl font-bold font-dmsans mb-2">{project.title}</h3>
              <p className="text-secondary font-dmsans mb-4">{project.role}</p>
              <div className="flex gap-3 flex-wrap">
                {project.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 p-1.5 rounded-full flex items-center justify-center transition-colors duration-300"
                    title={tech}
                  >
                    <img 
                      src={techLogos[tech]} 
                      alt={tech} 
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

const MyProject = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="pb-20 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-white font-dmsans mb-4">My Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectCard 
                project={project} 
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectPopup 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default MyProject; 
 