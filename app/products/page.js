import Link from 'next/link';
import { ProductModel } from '@/lib/models';
import ProductCard from '@/components/product/ProductCard';

// Fetch products with discount information on the server
async function getProducts(category = null) {
  try {
    // Get products with discount information, optionally filtered by category
    const filter = category ? { category } : {};
    const productsWithDiscounts = await ProductModel.findWithDiscounts(filter);
    
    // Sort products to show discounted ones first
    const sortedProducts = productsWithDiscounts.sort((a, b) => {
      const aHasDiscount = a.discount && a.discount.isActive;
      const bHasDiscount = b.discount && b.discount.isActive;
      
      if (aHasDiscount && !bHasDiscount) return -1;
      if (!aHasDiscount && bHasDiscount) return 1;
      return 0;
    });
    
    return sortedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage({ searchParams }) {
  const category = searchParams?.category;
  const products = await getProducts(category);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : 'Luxury Collection'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {category 
              ? `Explore our ${category} collection featuring premium pieces crafted with attention to detail.`
              : 'Discover our curated collection of premium fashion pieces that embody sophistication and modern luxury.'
            }
          </p>
          <p className="text-sm text-rose-600 dark:text-rose-400 mt-4 font-medium">
            ✨ Special offers shown first
          </p>
          {category && (
            <div className="mt-4">
              <Link
                href="/products"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-200"
              >
                ← View All Products
              </Link>
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">👗</div>
            <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">No products available</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Check back soon for new arrivals and exciting collections.
            </p>
            <Link
              href="/dashboard/add-product"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}