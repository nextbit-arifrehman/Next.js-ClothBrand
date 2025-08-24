'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

export default function DiscountModal({ product, onClose }) {
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
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [existingDiscountId, setExistingDiscountId] = useState(null);

  useEffect(() => {
    // Check if product has existing discount
    if (product.discount && product.discount.isActive) {
      setIsEditing(true);
      setExistingDiscountId(product.discount.id);
      setFormData({
        discountType: product.discount.discountType,
        discountValue: product.discount.discountValue.toString(),
        startDate: product.discount.startDate ? new Date(product.discount.startDate).toISOString().split('T')[0] : '',
        endDate: product.discount.endDate ? new Date(product.discount.endDate).toISOString().split('T')[0] : ''
      });
    } else {
      // Set default start date to current date and time
      const now = new Date();
      const todayString = now.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, startDate: todayString }));
    }
  }, [product]);

  useEffect(() => {
    // Calculate preview price whenever form data changes
    calculatePreview();
  });

  const calculatePreview = () => {
    const value = parseFloat(formData.discountValue);
    if (!value || value <= 0) {
      setPreviewPrice(product.price);
      setSavings(0);
      setDiscountPercentage(0);
      return;
    }

    let newPrice, newSavings, newPercentage;

    if (formData.discountType === 'flat') {
      newPrice = Math.max(0, product.price - value);
      newSavings = product.price - newPrice;
      newPercentage = Math.round((newSavings / product.price) * 100);
    } else {
      newPercentage = value;
      newSavings = (product.price * value) / 100;
      newPrice = product.price - newSavings;
    }

    setPreviewPrice(Math.round(newPrice * 100) / 100);
    setSavings(Math.round(newSavings * 100) / 100);
    setDiscountPercentage(newPercentage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    const value = parseFloat(formData.discountValue);

    if (!value || value <= 0) {
      setError('Discount value must be greater than 0');
      return false;
    }

    if (formData.discountType === 'percentage' && value >= 100) {
      setError('Percentage discount must be less than 100%');
      return false;
    }

    if (formData.discountType === 'flat' && value >= product.price) {
      setError('Flat discount cannot be greater than or equal to product price');
      return false;
    }

    if (formData.endDate && formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      setError('End date must be after start date');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const discountData = {
        productId: product.id,
        discountType: formData.discountType,
        discountValue: parseFloat(formData.discountValue),
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null
      };

      let response;

      if (isEditing && existingDiscountId) {
        // Update existing discount
        response = await fetch(`/api/admin/discounts/${existingDiscountId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(discountData),
        });
      } else {
        // Create new discount (this will replace existing if any)
        response = await fetch('/api/admin/discounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(discountData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save discount');
      }

      onClose();
    } catch (error) {
      console.error('Error saving discount:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingDiscountId || !confirm('Are you sure you want to remove this discount?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/discounts/${existingDiscountId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete discount');
      }

      onClose();
    } catch (error) {
      console.error('Error deleting discount:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {isEditing ? 'Modify Discount' : 'Add Discount'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Product Info */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Image
                src={product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200'}
                alt={product.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg object-cover"
                sizes="48px"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Original Price: {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

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
                    className="mr-2"
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
                    className="mr-2"
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
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  min="0"
                  step={formData.discountType === 'percentage' ? '1' : '0.01'}
                  max={formData.discountType === 'percentage' ? '99' : product.price - 0.01}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder={formData.discountType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {formData.discountType === 'percentage' ? '%' : '$'}
                  </span>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Price Preview */}
            {formData.discountValue && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Price Preview</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
                    <span className="line-through">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Discounted Price:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {formatPrice(previewPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">You Save:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {formatPrice(savings)} ({discountPercentage}%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
              >
                {loading ? 'Saving...' : (isEditing ? 'Update Discount' : 'Create Discount')}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-md font-medium transition-colors duration-200"
                >
                  Remove
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors duration-200"
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