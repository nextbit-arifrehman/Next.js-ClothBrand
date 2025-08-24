'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function DiscountModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    discountType: 'percentage',
    discountValue: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewPrice, setPreviewPrice] = useState(product.price);
  const [savings, setSavings] = useState(0);

  // Initialize form with existing discount data if available
  useEffect(() => {
    if (product.discount && product.discount.isActive) {
      const discount = product.discount;
      setFormData({
        discountType: discount.discountType,
        discountValue: discount.discountValue.toString(),
        startDate: discount.startDate ? new Date(discount.startDate).toISOString().slice(0, 16) : '',
        endDate: discount.endDate ? new Date(discount.endDate).toISOString().slice(0, 16) : ''
      });
    } else {
      // Set default start date to now
      const now = new Date();
      setFormData(prev => ({
        ...prev,
        startDate: now.toISOString().slice(0, 16)
      }));
    }
  }, [product]);

  // Calculate preview price whenever form data changes
  useEffect(() => {
    calculatePreviewPrice();
  });

  const calculatePreviewPrice = () => {
    const discountValue = parseFloat(formData.discountValue);

    if (!discountValue || discountValue <= 0) {
      setPreviewPrice(product.price);
      setSavings(0);
      return;
    }

    let newPrice = product.price;
    let newSavings = 0;

    if (formData.discountType === 'flat') {
      newPrice = Math.max(0, product.price - discountValue);
      newSavings = product.price - newPrice;
    } else if (formData.discountType === 'percentage') {
      if (discountValue < 100) {
        newSavings = (product.price * discountValue) / 100;
        newPrice = product.price - newSavings;
      }
    }

    setPreviewPrice(newPrice);
    setSavings(newSavings);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    const discountValue = parseFloat(formData.discountValue);

    if (!discountValue || discountValue <= 0) {
      return 'Discount value must be greater than 0';
    }

    if (formData.discountType === 'percentage' && discountValue >= 100) {
      return 'Percentage discount must be less than 100%';
    }

    if (formData.discountType === 'flat' && discountValue >= product.price) {
      return 'Flat discount cannot be greater than or equal to product price';
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (endDate <= startDate) {
        return 'End date must be after start date';
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const discountData = {
        productId: product.id,
        discountType: formData.discountType,
        discountValue: parseFloat(formData.discountValue),
        startDate: formData.startDate ? new Date(formData.startDate) : new Date(),
        endDate: formData.endDate ? new Date(formData.endDate) : null
      };

      const method = product.discount && product.discount.isActive ? 'PUT' : 'POST';
      const url = product.discount && product.discount.isActive
        ? `/api/admin/discounts/${product.discount.id}`
        : '/api/admin/discounts';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discountData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save discount');
      }

      onSave();
    } catch (error) {
      console.error('Error saving discount:', error);
      setError(error.message || 'Failed to save discount. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDiscount = async () => {
    if (!product.discount || !product.discount.isActive) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/discounts/${product.discount.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove discount');
      }

      onSave();
    } catch (error) {
      console.error('Error removing discount:', error);
      setError(error.message || 'Failed to remove discount. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Manage Discount
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Product Info */}
          <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              {product.images && product.images.length > 0 ? (
                <Image
                  className="h-12 w-12 rounded-lg object-cover"
                  src={product.images[0]}
                  alt={product.name}
                  width={48}
                  height={48}
                  sizes="48px"
                />
              ) : (
                <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {product.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Original Price: {formatPrice(product.price)}
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Discount Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discount Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="discountType"
                    value="percentage"
                    checked={formData.discountType === 'percentage'}
                    onChange={handleInputChange}
                    className="mr-2 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Percentage</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="discountType"
                    value="flat"
                    checked={formData.discountType === 'flat'}
                    onChange={handleInputChange}
                    className="mr-2 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Flat Amount</span>
                </label>
              </div>
            </div>

            {/* Discount Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discount Value
              </label>
              <div className="relative">
                {formData.discountType === 'flat' && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                  </div>
                )}
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  step={formData.discountType === 'flat' ? '0.01' : '1'}
                  min="0"
                  max={formData.discountType === 'percentage' ? '99' : undefined}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${formData.discountType === 'flat' ? 'pl-7' : ''
                    }`}
                  placeholder={formData.discountType === 'percentage' ? '10' : '10.00'}
                />
                {formData.discountType === 'percentage' && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date (Optional)
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Price Preview */}
            {formData.discountValue && parseFloat(formData.discountValue) > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                  Price Preview
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
                    <span className="line-through text-gray-500">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                    <span className="text-red-600 dark:text-red-400">
                      -{formData.discountType === 'percentage' ? `${formData.discountValue}%` : formatPrice(parseFloat(formData.discountValue))}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium border-t border-green-200 dark:border-green-700 pt-1">
                    <span className="text-green-800 dark:text-green-200">Final Price:</span>
                    <span className="text-green-800 dark:text-green-200">{formatPrice(previewPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">You Save:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">{formatPrice(savings)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (product.discount && product.discount.isActive ? 'Update Discount' : 'Apply Discount')}
              </button>

              {product.discount && product.discount.isActive && (
                <button
                  type="button"
                  onClick={handleRemoveDiscount}
                  disabled={loading}
                  className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  Remove
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}