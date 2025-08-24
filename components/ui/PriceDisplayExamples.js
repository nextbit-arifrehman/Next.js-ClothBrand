'use client';

import PriceDisplay from './PriceDisplay';
import DiscountBadge from './DiscountBadge';
import PriceWithDiscount from './PriceWithDiscount';

/**
 * Example component demonstrating usage of price display components
 * This can be used for testing and as a reference for implementation
 */
export default function PriceDisplayExamples() {
  const sampleProduct = {
    originalPrice: 199.99,
    discountedPrice: 149.99,
    discountType: 'percentage',
    discountValue: 25
  };

  const sampleFlatDiscount = {
    originalPrice: 100.00,
    discountedPrice: 80.00,
    discountType: 'flat',
    discountValue: 20
  };

  return (
    <div className="p-8 space-y-8 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Price Display Components Examples
      </h2>

      {/* PriceDisplay Examples */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          PriceDisplay Component
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              No Discount
            </h4>
            <PriceDisplay originalPrice={199.99} />
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              With Discount (Medium)
            </h4>
            <PriceDisplay 
              originalPrice={sampleProduct.originalPrice}
              discountedPrice={sampleProduct.discountedPrice}
              showSavings={true}
            />
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Large Size
            </h4>
            <PriceDisplay 
              originalPrice={sampleProduct.originalPrice}
              discountedPrice={sampleProduct.discountedPrice}
              size="large"
              showSavings={true}
            />
          </div>
        </div>
      </section>

      {/* DiscountBadge Examples */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          DiscountBadge Component
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Default
            </h4>
            <DiscountBadge 
              discountType="percentage"
              discountValue={25}
            />
          </div>

          <div className="p-4 border rounded-lg text-center">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Success
            </h4>
            <DiscountBadge 
              discountType="percentage"
              discountValue={30}
              variant="success"
            />
          </div>

          <div className="p-4 border rounded-lg text-center">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Outline
            </h4>
            <DiscountBadge 
              discountType="flat"
              discountValue={20}
              originalPrice={100}
              variant="outline"
            />
          </div>

          <div className="p-4 border rounded-lg text-center">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Large Size
            </h4>
            <DiscountBadge 
              discountType="percentage"
              discountValue={40}
              size="large"
              variant="warning"
            />
          </div>
        </div>
      </section>

      {/* PriceWithDiscount Examples */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          PriceWithDiscount Component (Combined)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Vertical Layout (Default)
            </h4>
            <PriceWithDiscount 
              originalPrice={sampleProduct.originalPrice}
              discountedPrice={sampleProduct.discountedPrice}
              discountType={sampleProduct.discountType}
              discountValue={sampleProduct.discountValue}
            />
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Horizontal Layout
            </h4>
            <PriceWithDiscount 
              originalPrice={sampleFlatDiscount.originalPrice}
              discountedPrice={sampleFlatDiscount.discountedPrice}
              discountType={sampleFlatDiscount.discountType}
              discountValue={sampleFlatDiscount.discountValue}
              layout="horizontal"
              badgeVariant="success"
            />
          </div>
        </div>
      </section>

      {/* Usage in Product Card Context */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Product Card Context Example
        </h3>
        
        <div className="max-w-sm p-4 border rounded-lg">
          <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Product Image</span>
          </div>
          
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Sample Product Name
          </h4>
          
          <PriceWithDiscount 
            originalPrice={299.99}
            discountedPrice={199.99}
            discountType="percentage"
            discountValue={33}
            showBadge={true}
            showSavings={true}
            badgeVariant="default"
            size="medium"
          />
          
          <button className="w-full mt-4 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
        </div>
      </section>
    </div>
  );
}