'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PriceDisplay from '@/components/ui/PriceDisplay';
import DiscountBadge from '@/components/ui/DiscountBadge';

export default function DiscountedProductCard({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const defaultImage = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200';
  const productImage = product.images && product.images[0] ? product.images[0] : (product.image || defaultImage);

  // Calculate discount pricing
  const originalPrice = product.price;
  const discount = product.discount;
  
  let discountedPrice, savings, discountPercentage;
  
  if (discount.discountType === 'flat') {
    discountedPrice = Math.max(0, originalPrice - discount.discountValue);
    savings = originalPrice - discountedPrice;
    discountPercentage = Math.round((savings / originalPrice) * 100);
  } else if (discount.discountType === 'percentage') {
    discountPercentage = discount.discountValue;
    savings = (originalPrice * discountPercentage) / 100;
    discountedPrice = originalPrice - savings;
  }

  // Round to 2 decimal places
  discountedPrice = Math.round(discountedPrice * 100) / 100;
  savings = Math.round(savings * 100) / 100;

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  }, [product.id]);

  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
    }
  };

  return (
    <div className="group cursor-pointer luxe-card-hover">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4 rounded-lg">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Discount Badge */}
          <div className="absolute top-4 left-4">
            <DiscountBadge 
              discountPercentage={discountPercentage}
              discountType={discount.discountType}
              discountValue={discount.discountValue}
              variant="default"
            />
          </div>

          {/* Additional Badges */}
          <div className="absolute top-4 left-4 space-y-2 mt-8">
            {product.featured && (
              <span className="inline-block bg-rose-600 text-white px-2 py-1 text-xs rounded">
                Featured
              </span>
            )}
            {!product.inStock && (
              <span className="inline-block bg-red-500 text-white px-2 py-1 text-xs rounded">
                Out of Stock
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className={`w-8 h-8 p-0 border-none shadow-md rounded flex items-center justify-center transition-colors duration-200 ${
                isInWishlist 
                  ? 'bg-pink-500 hover:bg-pink-600 text-white' 
                  : 'bg-white/90 hover:bg-white text-gray-700'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWishlistToggle();
              }}
              title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg 
                className="w-4 h-4" 
                fill={isInWishlist ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Limited Time Indicator */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block bg-black/70 text-white px-2 py-1 text-xs rounded backdrop-blur-sm">
              Limited Time
            </span>
          </div>
        </div>
      </Link>

      <div className="space-y-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-medium mb-2 group-hover:text-rose-600 transition-colors duration-200 text-gray-900 dark:text-gray-100 cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 capitalize">
              {product.category || 'Luxury Fashion'}
            </p>
            <PriceDisplay 
              originalPrice={originalPrice}
              discountedPrice={discountedPrice}
              savings={savings}
              discountPercentage={discountPercentage}
              hasDiscount={true}
              showSavings={true}
            />
          </div>
          
          {product.brand && (
            <span className="inline-block border border-gray-300 dark:border-gray-600 px-2 py-1 text-xs rounded text-gray-700 dark:text-gray-300">
              {product.brand}
            </span>
          )}
        </div>

        {/* Product Description */}
        {product.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-xs ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.stockQuantity && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.stockQuantity} available)
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <div className="pt-2">
          <Link href={`/products/${product.id}`}>
            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 text-sm font-medium tracking-wide transition-all duration-300 rounded">
              SHOP NOW - SAVE {discountPercentage}%
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}