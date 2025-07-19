import React from 'react'
import './gas.css';
import logo from '../assets/asd.png';
import logos from '../assets/promo.png';
import logoq from '../assets/promo2.png';
import logow from '../assets/promo3.png';
import logop from '../assets/lyomk.png';
import logoj from '../assets/iphoe.jpg';
import logor from '../assets/sh.jpg';

const ExploreMore = () => {
    const categorie = [
        { title: "Clearance Sales", img: logo },
        { title: "Sneakers Deal", img: logor},
        { title: "Best Deals", img: logos },
        { title: "Computing and Gadget", img: logoj },
        { title: "Black Friday", img: logoq },
        { title: "5000 Naira Market", img: logop },
      ];
  return (
    <>
     <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Explore More</h2>
      <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
      <div className="categorie">
  {categorie.map((cat, index) => (
    <div key={index} className="category-card">
      <img src={cat.img} alt={cat.title} />
      <div className="category-overlay">
        <h3>{cat.title}</h3>
        <button>Shop Now 🛒</button>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
    </>
  )
}

export default ExploreMore