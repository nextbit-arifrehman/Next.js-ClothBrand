'use client';

export default function DiscountBadge({ 
  discountPercentage, 
  discountType = 'percentage',
  discountValue,
  className = "",
  variant = 'default' // 'default', 'large', 'small'
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold text-white bg-red-500 rounded";
  
  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    default: "px-3 py-1 text-sm",
    large: "px-4 py-2 text-base"
  };

  const displayText = discountType === 'percentage' 
    ? `${discountPercentage}% OFF`
    : `$${discountValue} OFF`;

  return (
    <span className={`${baseClasses} ${sizeClasses[variant]} ${className}`}>
      {displayText}
    </span>
  );
}