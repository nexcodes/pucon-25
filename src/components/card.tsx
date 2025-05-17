'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Leaf, Users, Home, Globe } from 'lucide-react';

import '@/app/(root)/_styles/card.css';

const features = [
  {
    title: 'Personal Carbon Tracking',
    icon: <Home className="h-5 w-5" />,
    description:
      'Monitor and reduce your environmental impact with our intuitive tracking tools and personalized recommendations.',
    background: '/card1.jpg',
    color: 'from-green-600/70',
    link: '/personal-space',
    secondaryIcon: <Leaf className="h-4 w-4" />,
  },
  {
    title: 'Community Initiatives',
    icon: <Users className="h-5 w-5" />,
    description:
      'Join local environmental projects and connect with eco-conscious individuals making a difference.',
    background: '/card2.jpg',
    color: 'from-emerald-500/70',
    link: '/community',
    secondaryIcon: <Globe className="h-4 w-4" />,
  }
];

const EcoFeatureCards = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative py-16 px-4">
      {/* Background gradient that starts from dark green and fades to pure black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-600 to-black z-0"></div>
      
      {/* Subtle decorative elements */}
      <div className="absolute top-40 left-20 w-48 h-48 bg-green-500/5 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-400/5 rounded-full blur-[100px] opacity-30"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-white">
          Sustainable Living Solutions
        </h2>
        
        <p className="text-center text-green-300 mb-12 max-w-2xl mx-auto">
          Take control of your environmental impact with our tools and community engagement.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card relative h-[360px] rounded-lg overflow-hidden shadow-md group hover:-translate-y-1 transition-all duration-300 ease-out ${
                isClient ? 'animate-fadeInUp' : ''
              }`}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 z-0 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{
                  backgroundImage: `url(${feature.background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${feature.color} to-black opacity-90 group-hover:opacity-85 transition-opacity duration-300`}
              />

              {/* Main Icon */}
              <div className="feature-icon absolute top-6 right-6 text-white z-10 bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-md shadow-sm">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="feature-content absolute inset-0 flex flex-col justify-end p-6 z-10">
                {/* Title with subtle animated underline */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <div className="feature-underline h-0.5 bg-gradient-to-r from-green-300 to-green-400 w-12 group-hover:w-16 transition-all duration-300"></div>
                </div>

                {/* Description */}
                <p className="text-gray-100 mt-4 font-light text-sm leading-relaxed opacity-90">
                  {feature.description}
                </p>

                {/* Learn More Button */}
                <div className="mt-5">
                  {feature.link && (
                    <Link
                      href={feature.link}
                      className="inline-flex items-center px-4 py-2 bg-green-600/80 hover:bg-green-700 text-white text-sm font-medium rounded shadow-sm hover:shadow transition-all duration-300"
                    >
                      Learn more
                      <svg 
                        className="ml-1.5 w-3.5 h-3.5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Black fade gradient at the bottom for seamless transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default EcoFeatureCards;