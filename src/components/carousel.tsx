'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const logos = [
  { id: 1, src: '/350.png', alt: '350_org' },
  { id: 2, src: '/climate_trace.png', alt: 'climate_trace' },
  { id: 3, src: '/science_based_target.png', alt: 'science_based_target' },
  { id: 4, src: '/carbon_trust.png', alt: 'carbon_trust' },
  { id: 5, src: '/client_earth.png', alt: 'client_earth' },
  { id: 6, src: '/climate_action_team.png', alt: 'climate_action_team' },
 
];

const allLogos = [...logos, ...logos];

const LogoCarousel = () => {
  const carouselRef = useRef(null);

  return (
    <section className='py-20 bg-black overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4'>
        <motion.h2
          className='text-3xl md:text-4xl font-bold text-white mb-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Powering the Carbon-Free Future
        </motion.h2>

        {/* Top Scroll Row */}
        <div className='relative mb-12' ref={carouselRef}>
          <motion.div
            className='flex gap-2 items-center'
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {allLogos.map((logo, index) => (
              <motion.div
                key={`top-${logo.id}-${index}`}
                className='flex-shrink-0 h-32 w-48 rounded-xl  flex items-center justify-center p-4'
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className='max-h-full max-w-full object-contain'
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Scroll Row (Reverse Direction) */}

        <div className='relative'>
          <motion.div
            className='flex gap-2 items-center'
            animate={{ x: ['-100%', '0%'] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {allLogos.reverse().map((logo, index) => (
              <motion.div
                key={`bottom-${logo.id}-${index}`}
                className='flex-shrink-0 h-32 w-48 rounded-xl  flex items-center justify-center p-4'
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className='max-h-full max-w-full object-contain'
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.p
          className='text-gray-400 text-center mt-16 text-base max-w-2xl mx-auto'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Building a safer, greener Pakistan with the support of world-renowned climate and sustainability organizations.
        </motion.p>
      </div>
    </section>
  );
};

export default LogoCarousel;
