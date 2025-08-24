import Link from 'next/link';
import Image from 'next/image';
import { ProductModel } from '@/lib/models';
import { formatPrice } from '@/lib/utils';

export default async function DiscountSection() {
  let discountedProducts = [];
  
  try {
    discountedProducts = await ProductModel.findDiscounted(8);
  } catch (error) {
    console.error('Error fetching discounted products:', error);
    discountedProducts = [];
  }

  // Don't render the section if there are no discounted products
  if (!discountedProducts || discountedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-6">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h2 className="text-4xl font-light tracking-wide mb-4 text-gray-900 dark:text-gray-100">
            Limited Time Offers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Don&apos;t miss out on these exclusive discounts. Premium fashion at unbeatable prices, but only for a limited time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {discountedProducts.map((product) => {
            // Calculate discount pricing inline
            const originalPrice = product.price;
            const discount = product.discount;
            
            let discountedPrice, savings, discountPercentage;
            
            if (discount.discountType === 'flat') {
              discountedPrice = Math.max(0, originalPrice - discount.discountValue);
              savings = originalPrice - discountedPrice;
              discountPercentage = Math.round((savings / originalPrice) * 100);
            } else if (discount.discountType === 'percentage') {
              discountPercentage = discount.discountValue;
              savings = (originalPrice * discountPercentage) / 100;
              discountedPrice = originalPrice - savings;
            }

            // Round to 2 decimal places
            discountedPrice = Math.round(discountedPrice * 100) / 100;
            savings = Math.round(savings * 100) / 100;

            const defaultImage = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200';
            const productImage = product.images && product.images[0] ? product.images[0] : (product.image || defaultImage);

            return (
              <div key={product.id} className="group cursor-pointer">
                <Link href={`/products/${product.id}`}>
                  <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4 rounded-lg">
                    <Image
                      src={productImage}
                      alt={product.name}
                      width={400}
                      height={533}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded">
                        {discount.discountType === 'percentage' 
                          ? `${discountPercentage}% OFF`
                          : `$${discount.discountValue} OFF`}
                      </span>
                    </div>

                    {/* Limited Time Indicator */}
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block bg-black/70 text-white px-2 py-1 text-xs rounded backdrop-blur-sm">
                        Limited Time
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="space-y-3">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-medium mb-2 group-hover:text-rose-600 transition-colors duration-200 text-gray-900 dark:text-gray-100 cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mb-2">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 capitalize">
                      {product.category || 'Luxury Fashion'}
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-light text-gray-900 dark:text-gray-100">
                        {formatPrice(discountedPrice)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {formatPrice(originalPrice)}
                      </span>
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Save {formatPrice(savings)} ({discountPercentage}% off)
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-2">
                    <Link href={`/products/${product.id}`}>
                      <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 text-sm font-medium tracking-wide transition-all duration-300 rounded">
                        SHOP NOW - SAVE {discountPercentage}%
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/products?filter=discounted"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            VIEW ALL DEALS
          </Link>
        </div>
      </div>
    </section>
  );
}