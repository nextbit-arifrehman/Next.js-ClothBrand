import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductModel } from '@/lib/models';
import { formatPrice } from '@/lib/utils';
import ProductImages from '@/components/product/ProductImages';
import PriceDisplay from '@/components/ui/PriceDisplay';
import DiscountBadge from '@/components/ui/DiscountBadge';

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await ProductModel.findAll();
    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Fetch product details with discount information
async function getProduct(id) {
  try {
    const product = await ProductModel.findById(id);
    if (!product) return null;
    
    // Get discount pricing information
    const discountInfo = await ProductModel.calculateDiscountedPrice(id);
    
    return {
      ...product,
      discountInfo
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch related products (same category)
async function getRelatedProducts(category, currentProductId) {
  try {
    const products = await ProductModel.findByCategory(category, 4);
    return products.filter(product => product.id !== currentProductId);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);
  const defaultImage = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200';
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image || defaultImage];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-rose-600 dark:text-gray-400 dark:hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link
                  href="/products"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-rose-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Products
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 truncate">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <ProductImages productImages={productImages} productName={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              {product.brand && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  {product.brand}
                </p>
              )}
              <h1 className="text-3xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                {product.discountInfo && product.discountInfo.hasDiscount ? (
                  <div className="flex items-center gap-3">
                    <PriceDisplay 
                      originalPrice={product.discountInfo.originalPrice}
                      discountedPrice={product.discountInfo.discountedPrice}
                      savings={product.discountInfo.savings}
                      discountPercentage={product.discountInfo.discountPercentage}
                      hasDiscount={true}
                      size="large"
                      showSavings={true}
                    />
                    <DiscountBadge 
                      discountPercentage={product.discountInfo.discountPercentage}
                      discountType={product.discountInfo.discount.type}
                      discountValue={product.discountInfo.discount.value}
                      variant="large"
                    />
                  </div>
                ) : (
                  <p className="text-3xl font-light text-gray-900 dark:text-gray-100">
                    {formatPrice(product.price)}
                  </p>
                )}
                {product.featured && (
                  <span className="inline-block bg-rose-600 text-white px-3 py-1 text-xs rounded-full">
                    Featured
                  </span>
                )}
              </div>
              {product.category && (
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  Category: {product.category}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.stockQuantity && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({product.stockQuantity} available)
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-rose-500 hover:text-rose-600 cursor-pointer transition-colors"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              {product.material && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Material:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{product.material}</span>
                </div>
              )}
              {product.care && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Care:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{product.care}</span>
                </div>
              )}
              {product.origin && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Origin:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{product.origin}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <button
                disabled={!product.inStock}
                className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 font-medium tracking-wide hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </button>
              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 font-medium tracking-wide hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                ADD TO WISHLIST
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4">
                You Might Also Like
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                More pieces from our {product.category} collection
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="group">
                  <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4 rounded-lg">
                    <img
                      src={relatedProduct.images?.[0] || relatedProduct.image || defaultImage}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-rose-600 transition-colors duration-200 text-gray-900 dark:text-gray-100">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-xl font-light text-gray-900 dark:text-gray-100">
                    {formatPrice(relatedProduct.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Navigation */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}