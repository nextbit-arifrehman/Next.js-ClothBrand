import { clsx } from 'clsx';

// Utility function to combine class names
export function cn(...inputs) {
  return clsx(inputs);
}

// Format price to currency
export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// Format date
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

// Validate email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate random ID (fallback for when ObjectId is not available)
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Truncate text
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

// Calculate discounted price
export function calculateDiscountedPrice(originalPrice, discountType, discountValue) {
  if (!originalPrice || !discountValue || discountValue <= 0) {
    return originalPrice;
  }

  let discountedPrice;
  
  if (discountType === 'percentage') {
    // Percentage discount
    const discountAmount = (originalPrice * discountValue) / 100;
    discountedPrice = originalPrice - discountAmount;
  } else {
    // Flat amount discount
    discountedPrice = originalPrice - discountValue;
  }

  // Ensure price doesn't go below 0
  return Math.max(0, discountedPrice);
}

// Calculate savings information
export function calculateSavings(originalPrice, discountedPrice) {
  if (!originalPrice || !discountedPrice || discountedPrice >= originalPrice) {
    return {
      amount: 0,
      percentage: 0,
      hasDiscount: false
    };
  }

  const amount = originalPrice - discountedPrice;
  const percentage = Math.round((amount / originalPrice) * 100);

  return {
    amount,
    percentage,
    hasDiscount: true
  };
}

// Format discount display text
export function formatDiscountText(discountType, discountValue, originalPrice = 0) {
  if (!discountValue || discountValue <= 0) {
    return '';
  }

  if (discountType === 'percentage') {
    return `${Math.round(discountValue)}% OFF`;
  } else {
    // For flat discounts, show as percentage if original price is available
    if (originalPrice > 0) {
      const percentage = Math.round((discountValue / originalPrice) * 100);
      return `${percentage}% OFF`;
    }
    return `${formatPrice(discountValue)} OFF`;
  }
}

// Validate product data
export function validateProductData(data) {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Product name is required';
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Product description is required';
  }

  if (!data.price || isNaN(data.price) || data.price <= 0) {
    errors.price = 'Valid price is required';
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.category = 'Category is required';
  }

  if (!data.brand || data.brand.trim().length === 0) {
    errors.brand = 'Brand is required';
  }

  if (!data.stockQuantity || isNaN(data.stockQuantity) || data.stockQuantity < 0) {
    errors.stockQuantity = 'Valid stock quantity is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}