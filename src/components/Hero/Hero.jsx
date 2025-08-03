import Threads from "./Threads";
import BlurText from "../ui/BlurText";
import TrueFocus from "../ui/TrueFocus";

const Hero = () => {
  return (
    <section className="min-h-screen relative">
      {/* Background Threads */}
      <div className="absolute inset-0 z-0">
        <Threads
          color={[255, 255, 255]}
          amplitude={1.2}
          distance={0.2}
          enableMouseInteraction={false}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center flex-col">
        <BlurText
          text="Nguyen Quang Tuan"
          className="font-bitcount text-5xl md:text-7xl font-light text-secondary mb-6"
          delay={120}
          direction="top"
          animateBy="characters"
        />

        <div className="mb-8 text-text-white font-dmsans">
          <TrueFocus
            sentence="Backend Developer DevOps"
            manualMode={true}
            blurAmount={3}
            borderColor="#64ffda"
            glowColor="rgba(100, 255, 218, 0.6)"
            animationDuration={0.4}
            pauseBetweenAnimations={2}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
