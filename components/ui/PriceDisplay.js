'use client';

import { formatPrice } from '@/lib/utils';

export default function PriceDisplay({ 
  originalPrice, 
  discountedPrice, 
  savings, 
  discountPercentage, 
  hasDiscount = false,
  className = "",
  showSavings = true,
  size = "default" // "small", "default", "large"
}) {
  const sizeClasses = {
    small: {
      price: "text-lg",
      originalPrice: "text-sm",
      savings: "text-xs"
    },
    default: {
      price: "text-xl",
      originalPrice: "text-sm",
      savings: "text-sm"
    },
    large: {
      price: "text-3xl",
      originalPrice: "text-lg",
      savings: "text-base"
    }
  };

  const currentSize = sizeClasses[size] || sizeClasses.default;

  if (!hasDiscount) {
    return (
      <div className={`price-display ${className}`}>
        <span className={`${currentSize.price} font-light text-gray-900 dark:text-gray-100`}>
          {formatPrice(originalPrice)}
        </span>
      </div>
    );
  }

  return (
    <div className={`price-display ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`${currentSize.price} font-light text-gray-900 dark:text-gray-100`}>
          {formatPrice(discountedPrice)}
        </span>
        <span className={`${currentSize.originalPrice} text-gray-500 dark:text-gray-400 line-through`}>
          {formatPrice(originalPrice)}
        </span>
      </div>
      {showSavings && (
        <div className={`${currentSize.savings} text-green-600 dark:text-green-400 font-medium`}>
          Save {formatPrice(savings)} ({discountPercentage}% off)
        </div>
      )}
    </div>
  );
}