'use client';

import Link from 'next/link';

export default function HeroButtons() {
  const handleLookbook = () => {
    alert('Lookbook coming soon!');
  };

  return (
    <div className="space-x-4">
      <Link href="/products">
        <button className="bg-white text-gray-900 px-8 py-3 text-sm font-medium tracking-wide hover:bg-rose-100 hover:text-rose-800 transition-all duration-300 transform hover:scale-105">
          EXPLORE COLLECTION
        </button>
      </Link>
      <button 
        onClick={handleLookbook}
        className="border border-white text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300"
      >
        VIEW LOOKBOOK
      </button>
    </div>
  );
}