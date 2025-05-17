import { FC } from 'react';

interface HeroSectionProps {
  // Optional props to customize the component if needed
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

const HeroSection: FC<HeroSectionProps> = ({
  title = "Reduce Your Carbon Footprint Together",
  subtitle = "Join our community of eco-conscious individuals making a difference for our planet. Small changes today create a sustainable tomorrow.",
  buttonText = "Join Our Community"
  
}) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-md">
          {subtitle}
        </p>
        <a 
          href="/community" 
          className="inline-block px-6 py-3 bg-green-600 text-white font-bold rounded-full transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-lg"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default HeroSection;