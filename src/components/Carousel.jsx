import React from "react";
import Carousel from "react-multi-carousel";
import joko from '../assets/promo2.png';
import jokod from '../assets/promo.png';
import jokox from '../assets/promo3.png';
import "react-multi-carousel/lib/styles.css";

const ThreeImageCarousel = () => {
  const images = [
    {joko},
    {jokod},
    {jokox},
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="py-10 px-4 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Hot Promotions</h2>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        arrows={true}
        showDots={true}
        containerClass="carousel-container"
      >
        {images.map((img, idx) => (
          <div key={idx} className="p-2">
            <img
              src={img.joko || img.jokod || img.jokox}
              alt={`Promo ${idx + 1}`}
              className="rounded-xl w-full h-64 object-cover shadow-md"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default ThreeImageCarousel;
