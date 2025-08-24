'use client';

export default function WishlistButton() {
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('Added to wishlist!');
  };

  return (
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        className="w-8 h-8 p-0 bg-white/90 hover:bg-white border-none shadow-md rounded-full flex items-center justify-center"
        onClick={handleWishlist}
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
}