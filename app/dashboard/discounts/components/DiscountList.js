'use client';

import { useState } from 'react';
import DiscountModal from './DiscountModal';
import Image from 'next/image';

export default function DiscountList({ products, onDiscountUpdate }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleManageDiscount = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleDiscountSaved = () => {
    handleCloseModal();
    onDiscountUpdate();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const calculateDiscountedPrice = (originalPrice, discount) => {
    if (!discount) return originalPrice;

    if (discount.discountType === 'flat') {
      return Math.max(0, originalPrice - discount.discountValue);
    } else if (discount.discountType === 'percentage') {
      return originalPrice - (originalPrice * discount.discountValue / 100);
    }

    return originalPrice;
  };

  const getDiscountDisplay = (discount) => {
    if (!discount) return null;

    if (discount.discountType === 'flat') {
      return `-${formatPrice(discount.discountValue)}`;
    } else if (discount.discountType === 'percentage') {
      return `-${discount.discountValue}%`;
    }

    return null;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No products found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add some products to your collection to manage discounts.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Product Discount Management
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Click &quot;Manage Discount&quot; to set up promotional pricing for any product.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Original Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Final Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => {
              const hasDiscount = product.discount && product.discount.isActive;
              const discountedPrice = hasDiscount ? calculateDiscountedPrice(product.price, product.discount) : product.price;
              const savings = hasDiscount ? product.price - discountedPrice : 0;

              return (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            className="h-10 w-10 rounded-lg object-cover"
                            src={product.images[0]}
                            alt={product.name}
                            width={40}
                            height={40}
                            sizes="40px"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product.brand} • {product.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {formatPrice(product.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hasDiscount ? (
                      <div className="text-sm">
                        <div className="text-red-600 dark:text-red-400 font-medium">
                          {getDiscountDisplay(product.discount)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Save {formatPrice(savings)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        No discount
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatPrice(discountedPrice)}
                    </div>
                    {hasDiscount && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hasDiscount ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active Discount
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        No Discount
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleManageDiscount(product)}
                      className="text-rose-600 hover:text-rose-900 dark:text-rose-400 dark:hover:text-rose-300 font-medium"
                    >
                      Manage Discount
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Discount Modal */}
      {isModalOpen && selectedProduct && (
        <DiscountModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onSave={handleDiscountSaved}
        />
      )}
    </>
  );
}