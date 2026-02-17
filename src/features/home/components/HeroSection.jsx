import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          alt="Luxury Salon Interior"
          className="w-full h-full object-cover"
          data-alt="Interior of a luxury modern hair salon"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_of-L-sSMAmMZNDADp-_g6Xi0tR4UkrdehW8Q1T9C8p9q-w-R_GWdXKo6PQDR0xOhSAnPndiDSuveJkd4qsKIID8IT1-0G2alc9gWsUBgWa0aqPHTBz5HlfOKwtQf3I_qp64272t2rPSLxcC9ZitVWYlJtSRB_0JURCykKdcTmML46D9b5VGmH9S3-_yOhlue4oqnP39ktMb98_5BG1FpE23LaVzM34M-3biyNuCDEEBIroI2mKctvA2Xwo5AGzqowoVnwjMXbekv"
        />
      </div>

      {/* Content */}
      {/* <div className="relative z-20 text-center px-4 max-w-4xl">
        <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Redefine Your Elegance
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto  font-light leading-relaxed">
          Experience world-class grooming and relaxation tailored just for you in our boutique sanctuary.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
          <button className="bg-primary text-background-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/20">
            Book Appointment
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
            View Services
          </button>
        </div>
      </div> */}

<div className='relative z-20 text-center text-white max-w-4xl mx-auto px-4'>
<h1 className='text-5xl md:text-7xl mb-6' style={{ fontWeight: 700 }}>
  Redefine Your Elegance
</h1>
  
  <div className='flex justify-center'>
    <p className='text-white/90 text-lg md:text-xl max-w-2xl font-light leading-relaxed'>
      Experience world-class grooming and relaxation tailored just for you in our boutique sanctuary.
    </p>
  </div>
  
  <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>
    <button className='bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/30 min-w-[200px]'>
      Book Appointment
    </button>
    <button className='bg-transparent hover:bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all min-w-[200px]'>
      View Services
    </button>
  </div>
</div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <span className="material-symbols-outlined text-white text-3xl">keyboard_double_arrow_down</span>
      </div>
    </section>
  );
};

export default HeroSection;