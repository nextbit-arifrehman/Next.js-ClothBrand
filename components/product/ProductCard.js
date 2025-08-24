'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const defaultImage = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200';
  const productImage = product.images && product.images[0] ? product.images[0] : (product.image || defaultImage);

  // Calculate discount pricing if available
  const hasDiscount = product.discount && product.discount.isActive;
  let discountedPrice = product.price;
  let savings = 0;
  let discountPercentage = 0;

  // Debug logging (remove in production)
  if (product.name === 'Silk Evening Gown' || product.name === 'Italian Leather Heels') {
    console.log(`ProductCard Debug - ${product.name}:`, {
      hasDiscount,
      discount: product.discount,
      price: product.price
    });
  }

  if (hasDiscount) {
    const discount = product.discount;
    if (discount.discountType === 'flat') {
      discountedPrice = Math.max(0, product.price - discount.discountValue);
      savings = product.price - discountedPrice;
      discountPercentage = Math.round((savings / product.price) * 100);
    } else if (discount.discountType === 'percentage') {
      discountPercentage = discount.discountValue;
      savings = (product.price * discountPercentage) / 100;
      discountedPrice = product.price - savings;
    }
    
    // Round to 2 decimal places
    discountedPrice = Math.round(discountedPrice * 100) / 100;
    savings = Math.round(savings * 100) / 100;
  }

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
          
          {/* Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            {hasDiscount && (
              <span className="inline-block bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                {product.discount.discountType === 'percentage' 
                  ? `${discountPercentage}% OFF`
                  : `${product.discount.discountValue} OFF`}
              </span>
            )}
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
            {hasDiscount ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-light text-gray-900 dark:text-gray-100">
                    {formatPrice(discountedPrice)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Save {formatPrice(savings)} ({discountPercentage}% off)
                </p>
              </div>
            ) : (
              <p className="text-xl font-light text-gray-900 dark:text-gray-100">
                {formatPrice(product.price)}
              </p>
            )}
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

        {/* Material & Origin */}
        <div className="flex flex-wrap gap-2 text-xs">
          {product.material && (
            <span className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
              {product.material}
            </span>
          )}
          {product.origin && (
            <span className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
              Made in {product.origin}
            </span>
          )}
        </div>

        {/* Available Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Sizes:</span>
            {product.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                +{product.sizes.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Available Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Colors:</span>
            {product.colors.slice(0, 5).map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
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
            <button className={`w-full py-2 px-4 text-sm font-medium tracking-wide transition-all duration-300 rounded ${
              hasDiscount 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white'
            }`}>
              {hasDiscount ? `SHOP NOW - SAVE ${discountPercentage}%` : 'VIEW DETAILS'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}