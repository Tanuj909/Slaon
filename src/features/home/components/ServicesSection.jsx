"use client";

import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: "Signature Haircuts",
      description: "Precision styling tailored to your face shape and personal aesthetic.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7k78Sa38enYew9CCUcsZRAYjGuOhJ82EnWPyz1YNoUCFmB3ZbSRmpcx3yX2XYdwlnGtachFjmsY8RDn7ROKgrTVTcFhd9e1dXZlX0C91A5OPbKmjIICtp21PCHWFrmS4V1u1h_ng2601ImYYXpPisHyFauDI2Uc1qzlcHIRsn7w52REeXwKTjTcenq2lnbvUFahtl64mmD5TOaTC8BkatMVaSthbrv7wwvWW_Nxe1IH2F4iO9RaCbjp8b4sw3I1frCiYddQSDdp"
    },
    {
      title: "Luxury Skin Care",
      description: "Revitalizing facials and treatments using premium organic elixirs.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1IXVoviff2vw-vfbnEth3cRVJbetSWlpORQGs3h5LjLLD9H5OdOEei1FUdQTUx9HFAf_MxM0Lrgpda-Z_epKsSlJcRRIs7TB4H1V0C1r1lj0rJjgoot-9crr5L57tchCg-2Z4duk8w9AR97Qs-4NeiUD5JfFfoYyOwa2ZEHDqHI-8SJv56It59aYjrDxFqIsmUHwqPZkgz_qcsqDXuKvSoWfMhqqy8Vnavtk1btUXMAb_CqVj7tLvht43W98PU1-beQy4dfEZIRu9"
    },
    {
      title: "Artistic Manicures",
      description: "Custom nail art and therapeutic hand care for every occasion.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdblC_ad2bLjbNG1gzwDGiwBgnmnDTCAgGOKwuSqEUmyOYpGuolnD0WzzmcKtE1Em6Mcv7NtmPzmprSV80ruWKJ6GbHU7m-3K6zMc7I9oS8H1SLDb8rnZOSQlXxe4D_steWmcj_l9dTGc7byOoXU0WO3JtSqWXd1-bJ1vOAkxuhgyK4M9hCf05IeQi06ReZBzJImNKTCSEdXkPAK3lu_a0tOjMvhLWHXJE47-VY2FYGrVTw04JK6IqB2RSncxzG95UJtUq057UkIi5"
    },
    {
      title: "Bridal Packages",
      description: "Complete transformation services for your most special day.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZwatrTnvnmq9fKbDCD54TxCGWmSdF8uG7JHsAv0tsf_y3mGeYufo8SXtIpO5SGh5ZdtVgEvAvpcofmIXhg8ePC2wo6M5VSUlq5LDaZDwcuFsbofUOH--p6xj8SwLQYhQHiGmOllpVgvnClOpKg14NyUI5yuRUD3iJPUSkg-SnqU2y0z1bsZbaP25NgGW7wYH5jmHzl_5tQmksd7ezywNc_n6PnQhu8DraI5qkvvtgaDvi3GdA0mqj-nYxXuwNKtpY9G7YxDel5-Br"
    }
  ];

  return (
    <section className="py-24 px-6 max-w-[1200px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-earthy-brown font-display">Our Premium Services</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-3"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="service-card group relative h-[450px] overflow-hidden rounded-2xl cursor-pointer">
            <img
              alt={service.title}
              className="service-image absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={service.image}
              data-alt={service.description}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full block">
              <h3 className="text-creamy text-2xl font-bold mb-2 font-display drop-shadow-md transform translate-y-0 transition-transform duration-300 group-hover:-translate-y-2">{service.title}</h3>
              <p className="text-creamy/90 text-sm mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 font-display">
                {service.description}
              </p>
              <button className="bg-primary text-creamy px-6 py-2 rounded-full text-sm font-bold opacity-0 transform translate-y-4 transition-all duration-300 delay-100 group-hover:opacity-100 group-hover:translate-y-0 font-display hover:bg-white hover:text-primary">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;