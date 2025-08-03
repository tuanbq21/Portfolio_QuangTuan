import { Suspense, lazy } from 'react';
import Hero from '../../components/Hero/Hero';
import AboutMe from '../../components/AboutMe/AboutMe';
import MyExperience from '../../components/MyExperience/MyExperience';
import MyProjects from '../../components/MyProject/MyProject';

// Lazy load components
const HeroComponent = lazy(() => import('../../components/Hero/Hero'));
const AboutMeComponent = lazy(() => import('../../components/AboutMe/AboutMe'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <HeroComponent />
        <Suspense fallback={<LoadingFallback />}>
          <AboutMeComponent />
        </Suspense>
      </Suspense>
      <MyExperience />
      <MyProjects />
    </main>
  );
};

export default Home; 