import { motion } from 'framer-motion';
import ProfileCard from '../ProfileCard/ProfileCard';
import StarBorder from '../StarBorder/StarBorder';
import { skills } from '../../data/skills';

const AboutMe = () => {
  return (
    <section id="about" className="py-20 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-dmsans font-bold text-white mb-4 mr-36 text-end">What I Do</h2>
          
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="space-y-8 p-8 hover:scale-105 transition-transform duration-300 ease-out relative">
              {/* Top-left corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-secondary"></div>
              {/* Bottom-right corner */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-secondary"></div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white font-dmsans">DEVELOP</h3>
                <p className="text-lg text-gray-400 font-dmsans">
                  Started creating mobile applications using Flutter, FlutterFlow, and
                  Firebase and eventually switched to Web Development using NextJS,
                  React, and Tailwind
                </p>
              </div>

              <div className="space-y-6">
                {skills.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <StarBorder
                      as="div"
                      color="#64ffda"
                      speed="4s"
                      className="w-full font-dmsans" 
                    >
                      <h4 className="text-xl font-semibold font-dmsans">{category.title}</h4>
                    </StarBorder>
                    <div className="flex flex-wrap gap-3">
                      {category.items.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-4 py-2 font-dmsans rounded-full border border-gray-700 text-gray-300 bg-[#1a1a1a] hover:border-secondary hover:scale-110 transition-all duration-300"   
                          title={`Level: ${skill.level}`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-full w-full flex items-center justify-center"
          >
            <div className="h-full w-full aspect-[0.718]">
              <ProfileCard
                handle="tuandot"
                status="Available for Projects"
                contactText="Contact Me"
                avatarUrl="/tuandot.jpg"
                miniAvatarUrl="/tuandot.jpg"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log('Contact clicked')}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe; 