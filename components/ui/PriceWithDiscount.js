'use client';

import PriceDisplay from './PriceDisplay';
import DiscountBadge from './DiscountBadge';

/**
 * Combined component that displays price with discount badge
 * Provides a complete pricing solution for products with discounts
 */
export default function PriceWithDiscount({ 
  originalPrice,
  discountedPrice,
  discountType = 'flat',
  discountValue = 0,
  showBadge = true,
  showSavings = true,
  badgeVariant = 'default',
  size = 'medium',
  layout = 'vertical', // 'vertical' | 'horizontal'
  className = ''
}) {
  const hasDiscount = discountedPrice && discountedPrice < originalPrice;

  if (!hasDiscount) {
    // No discount - show price only
    return (
      <div className={className}>
        <PriceDisplay 
          originalPrice={originalPrice}
          size={size}
          showSavings={false}
        />
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <PriceDisplay 
          originalPrice={originalPrice}
          discountedPrice={discountedPrice}
          discountType={discountType}
          discountValue={discountValue}
          showSavings={showSavings}
          size={size}
        />
        {showBadge && (
          <DiscountBadge 
            discountType={discountType}
            discountValue={discountValue}
            originalPrice={originalPrice}
            variant={badgeVariant}
            size={size === 'large' ? 'medium' : 'small'}
          />
        )}
      </div>
    );
  }

  // Vertical layout (default)
  return (
    <div className={`space-y-2 ${className}`}>
      {showBadge && (
        <div className="flex justify-start">
          <DiscountBadge 
            discountType={discountType}
            discountValue={discountValue}
            originalPrice={originalPrice}
            variant={badgeVariant}
            size={size === 'large' ? 'medium' : 'small'}
          />
        </div>
      )}
      <PriceDisplay 
        originalPrice={originalPrice}
        discountedPrice={discountedPrice}
        discountType={discountType}
        discountValue={discountValue}
        showSavings={showSavings}
        size={size}
      />
    </div>
  );
}