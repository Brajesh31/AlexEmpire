import React from 'react'
import './gas.css';


const Newsletter = () => {
  return (
    <>
       <section className="bg-gray-100 py-16 px-4 text-center rounded-xl shadow-sm newsletter-section">
  <h2 className="text-3xl font-bold text-gray-800">Subscribe to Our Newsletter</h2>
  <p className="text-gray-600 mt-4 max-w-xl mx-auto text-base">
    Get the latest updates, exclusive deals, and trending products delivered straight to your inbox.
  </p>
  <form className="mt-8 flex justify-center items-center max-w-md mx-auto">
    <input
      type="email"
      placeholder="Enter your email"
      className=" px-5 py-3 w-100 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
    />
    <button className="bg-black text-white px-6 py-3 rounded-r-full hover:bg-gray-800 transition duration-300">
      Subscribe
    </button>
  </form>
</section>

    </>
  )
}

export default Newsletter