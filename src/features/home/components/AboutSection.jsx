import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-24 bg-plum/5">
      <div className="max-w-[1200px] mx-auto px-6 space-y-32">
        {/* Experience Part */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-xl -z-10"></div>
              <img
                alt="About our Experience"
                className="w-full aspect-[4/3] object-cover rounded-xl shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi4-63za8-F-S2KhRZ5O6fcipdmFDBPo1PymPGW-e0gACv2VURPHW6cF4HsSAyQTbkYOq2rcEJKbA17LcR_WPdMqYrKK5YvuXC-ol-00BbgoOnYdUhX7Xu-ThU_P0lHIPaCJX9w8N6QCDV2aFjfdb0CFOsz4TMtXi4zCVvAbj4V5-gyVkSw4j1oY13drvWN7fvjQOSqwiGes8pCvWY6w-AVKi3B3ubJBT79FHJM0wFVgfa2TEClyRRYrv9RnVtxYe8QK4gkrk0Fwp5"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-4">The Experience</h3>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight text-earthy-brown">Elevated Atmosphere for the Modern Client</h2>
            <p className="text-lg text-earthy-brown/80 mb-6 leading-relaxed">
              Step into a realm where time slows down. At Luxe Salon, we believe that beauty is an experience, not just a result. Our space is meticulously designed to provide a serene escape from the urban rush, featuring soft lighting, curated scents, and bespoke seating.
            </p>
            <p className="text-lg text-earthy-brown/80 leading-relaxed">
              Every visit begins with a personal consultation. We take the time to understand your lifestyle and preferences, ensuring every cut, color, and treatment is perfectly aligned with who you are.
            </p>
          </div>
        </div>

        {/* Expertise Part */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h3 className="text-terracotta font-bold tracking-widest uppercase text-sm mb-4">The Expertise</h3>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight text-earthy-brown">Master Craftsmanship & Premium Products</h2>
            <p className="text-lg text-earthy-brown/80 mb-6 leading-relaxed">
              Our team consists of internationally trained stylists and therapists who are masters of their craft. We stay ahead of global trends while maintaining a focus on timeless techniques that enhance your natural features.
            </p>
            <p className="text-lg text-earthy-brown/80 leading-relaxed">
              We exclusively use award-winning, ethically sourced products that are as kind to the environment as they are to your skin and hair. Luxury, for us, means zero compromise on quality or integrity.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary rounded-xl -z-10"></div>
              <img
                alt="Our Expertise"
                className="w-full aspect-[4/3] object-cover rounded-xl shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2ywGAPd9BD6zatNByfkZY-_jScYLg6B6qc_ylhUlHUvDRk9-XXfJbeQ2HIHtGRHVIOPB_oGxgjRIL5kpW6hwYGH5hbjZzh-lxu_yGwmuOMj2yvaHob3d7ATVA2wK_lUhpidUYzUEd9nGvt0o0oo5QClf8KNZxApLV1t3bRk1ncZtcJXLufxVbCOmSVTpYGolMJ5Yf6GdA3bggbRaSjPvcyN5S0cb42sgGN_Z3hwluYg3LlOCtd3N4vERPZr94koztcHPdFHh7LzmW"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
