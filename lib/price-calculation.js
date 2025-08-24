import { ProductModel, DiscountModel } from './models.js';

/**
 * Price Calculation Service
 * Handles all discount-related price calculations
 */
export class PriceCalculationService {
  /**
   * Calculate price for a single product with discount applied
   * @param {string} productId - The product ID
   * @returns {Object} Price calculation result
   */
  static async calculatePrice(productId) {
    try {
      // Get product base price
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Check for active discount
      const discount = await DiscountModel.findActiveByProductId(productId);
      
      const originalPrice = parseFloat(product.price);
      let discountedPrice = originalPrice;
      let savings = 0;
      let discountPercentage = 0;

      if (discount) {
        if (discount.discountType === 'flat') {
          discountedPrice = Math.max(0, originalPrice - parseFloat(discount.discountValue));
          savings = originalPrice - discountedPrice;
          discountPercentage = Math.round((savings / originalPrice) * 100);
        } else if (discount.discountType === 'percentage') {
          const discountAmount = (originalPrice * parseFloat(discount.discountValue)) / 100;
          discountedPrice = originalPrice - discountAmount;
          savings = discountAmount;
          discountPercentage = parseFloat(discount.discountValue);
        }
      }

      return {
        originalPrice,
        discountedPrice: Math.round(discountedPrice * 100) / 100, // Round to 2 decimal places
        savings: Math.round(savings * 100) / 100,
        discountPercentage: Math.round(discountPercentage),
        hasDiscount: discount !== null,
        discount: discount
      };
    } catch (error) {
      console.error('Error calculating price:', error);
      // Fallback to original price if calculation fails
      const product = await ProductModel.findById(productId);
      const originalPrice = product ? parseFloat(product.price) : 0;
      
      return {
        originalPrice,
        discountedPrice: originalPrice,
        savings: 0,
        discountPercentage: 0,
        hasDiscount: false,
        discount: null,
        error: error.message
      };
    }
  }

  /**
   * Calculate total for shopping cart with all applicable discounts
   * @param {Array} cartItems - Array of cart items with productId and quantity
   * @returns {Object} Cart total calculation result
   */
  static async calculateCartTotal(cartItems) {
    try {
      let subtotal = 0;
      let discountedSubtotal = 0;
      let totalSavings = 0;
      const itemCalculations = [];

      for (const item of cartItems) {
        const priceCalc = await this.calculatePrice(item.productId);
        const quantity = parseInt(item.quantity) || 1;
        
        const itemOriginalTotal = priceCalc.originalPrice * quantity;
        const itemDiscountedTotal = priceCalc.discountedPrice * quantity;
        const itemSavings = priceCalc.savings * quantity;

        subtotal += itemOriginalTotal;
        discountedSubtotal += itemDiscountedTotal;
        totalSavings += itemSavings;

        itemCalculations.push({
          productId: item.productId,
          quantity,
          originalPrice: priceCalc.originalPrice,
          discountedPrice: priceCalc.discountedPrice,
          originalTotal: Math.round(itemOriginalTotal * 100) / 100,
          discountedTotal: Math.round(itemDiscountedTotal * 100) / 100,
          savings: Math.round(itemSavings * 100) / 100,
          hasDiscount: priceCalc.hasDiscount,
          discount: priceCalc.discount
        });
      }

      return {
        subtotal: Math.round(subtotal * 100) / 100,
        discountedSubtotal: Math.round(discountedSubtotal * 100) / 100,
        totalSavings: Math.round(totalSavings * 100) / 100,
        itemCount: cartItems.length,
        items: itemCalculations
      };
    } catch (error) {
      console.error('Error calculating cart total:', error);
      throw new Error('Failed to calculate cart total');
    }
  }

  /**
   * Calculate discount preview for admin interface
   * @param {number} originalPrice - Original product price
   * @param {string} discountType - 'flat' or 'percentage'
   * @param {number} discountValue - Discount amount or percentage
   * @returns {Object} Discount preview calculation
   */
  static calculateDiscountPreview(originalPrice, discountType, discountValue) {
    try {
      const price = parseFloat(originalPrice);
      const value = parseFloat(discountValue);
      
      if (isNaN(price) || isNaN(value) || price <= 0 || value <= 0) {
        return {
          originalPrice: price,
          discountedPrice: price,
          savings: 0,
          discountPercentage: 0,
          isValid: false,
          error: 'Invalid price or discount value'
        };
      }

      let discountedPrice = price;
      let savings = 0;
      let discountPercentage = 0;
      let isValid = true;
      let error = null;

      if (discountType === 'flat') {
        if (value >= price) {
          isValid = false;
          error = 'Flat discount cannot be greater than or equal to product price';
        } else {
          discountedPrice = price - value;
          savings = value;
          discountPercentage = Math.round((savings / price) * 100);
        }
      } else if (discountType === 'percentage') {
        if (value >= 100) {
          isValid = false;
          error = 'Percentage discount must be less than 100%';
        } else {
          savings = (price * value) / 100;
          discountedPrice = price - savings;
          discountPercentage = value;
        }
      } else {
        isValid = false;
        error = 'Invalid discount type';
      }

      return {
        originalPrice: price,
        discountedPrice: Math.round(discountedPrice * 100) / 100,
        savings: Math.round(savings * 100) / 100,
        discountPercentage: Math.round(discountPercentage),
        isValid,
        error
      };
    } catch (error) {
      return {
        originalPrice: parseFloat(originalPrice) || 0,
        discountedPrice: parseFloat(originalPrice) || 0,
        savings: 0,
        discountPercentage: 0,
        isValid: false,
        error: 'Calculation error'
      };
    }
  }
}