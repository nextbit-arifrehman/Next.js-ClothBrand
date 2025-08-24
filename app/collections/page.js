import Link from 'next/link';
import { ProductModel } from '@/lib/models';
import ProductCard from '@/components/product/ProductCard';

// Fetch categories and their products with discount information
async function getCollections() {
  try {
    const categories = await ProductModel.getCategories();
    const collections = await Promise.all(
      categories.map(async (category) => {
        // Get products with discount information for this category
        const productsWithDiscounts = await ProductModel.findWithDiscounts({ category });
        
        // Sort products to show discounted ones first
        const sortedProducts = productsWithDiscounts.sort((a, b) => {
          const aHasDiscount = a.discount && a.discount.isActive;
          const bHasDiscount = b.discount && b.discount.isActive;
          
          if (aHasDiscount && !bHasDiscount) return -1;
          if (!aHasDiscount && bHasDiscount) return 1;
          return 0;
        });
        
        // Limit to 6 products per category
        const products = sortedProducts.slice(0, 6);
        
        return {
          name: category,
          displayName: category.charAt(0).toUpperCase() + category.slice(1),
          products,
          totalCount: productsWithDiscounts.length
        };
      })
    );
    return collections.filter(collection => collection.products.length > 0);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4">
            Our Collections
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our carefully curated collections, each telling a unique story of style, craftsmanship, and luxury.
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">👗</div>
            <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">No collections available</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Check back soon for new collections and exciting fashion pieces.
            </p>
            <Link
              href="/dashboard/add-product"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              Add Products
            </Link>
          </div>
        ) : (
          <div className="space-y-20">
            {collections.map((collection) => (
              <div key={collection.name} className="collection-section">
                {/* Collection Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-2">
                      {collection.displayName}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {collection.totalCount} {collection.totalCount === 1 ? 'piece' : 'pieces'} available
                    </p>
                  </div>
                  <Link
                    href={`/collections/${collection.name}`}
                    className="text-rose-600 hover:text-rose-700 font-medium text-sm tracking-wide transition-colors duration-200"
                  >
                    VIEW ALL →
                  </Link>
                </div>

                {/* Collection Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                  {collection.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Collection Description */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {getCollectionDescription(collection.name)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-16 text-center">
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

// Helper function to get collection descriptions
function getCollectionDescription(category) {
  const descriptions = {
    dresses: "Elegant dresses for every occasion, from casual day wear to sophisticated evening attire.",
    accessories: "Carefully selected accessories to complement and elevate your personal style.",
    outerwear: "Premium outerwear pieces that combine functionality with timeless design.",
    footwear: "Luxury footwear crafted with attention to detail and superior comfort.",
    jewelry: "Exquisite jewelry pieces that add the perfect finishing touch to any ensemble.",
    basics: "Essential wardrobe staples reimagined with luxury materials and impeccable craftsmanship."
  };
  
  return descriptions[category] || "Discover our curated selection of premium fashion pieces.";
}