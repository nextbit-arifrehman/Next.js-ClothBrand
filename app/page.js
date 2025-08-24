import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { ProductModel } from '@/lib/models';
import ProductCard from '@/components/product/ProductCard';
import HeroButtons from '@/components/ui/HeroButtons';
import StoryButton from '@/components/ui/StoryButton';
import DiscountSection from '@/components/sections/DiscountSection';

// Fetch featured products for the landing page
async function getFeaturedProducts() {
  try {
    return await ProductModel.findFeatured(6);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// Fetch discounted products to exclude from featured
async function getDiscountedProductIds() {
  try {
    const discountedProducts = await ProductModel.findDiscounted(20);
    return discountedProducts.map(p => p.id);
  } catch (error) {
    console.error('Error fetching discounted products for exclusion:', error);
    return [];
  }
}

export default async function Home() {
  const [featuredProducts, discountedProductIds] = await Promise.all([
    getFeaturedProducts(),
    getDiscountedProductIds()
  ]);

  // Filter out discounted products from featured products to prevent duplication
  const filteredFeaturedProducts = featuredProducts.filter(
    product => !discountedProductIds.includes(product.id)
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-6 leading-tight">
            Redefining<br />
            <span className="font-semibold font-serif">Elegance</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto opacity-90">
            Discover our curated collection of premium fashion pieces that embody sophistication and modern luxury.
          </p>
          <HeroButtons />
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wide mb-4 text-gray-900 dark:text-gray-100">Featured Collection</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Handpicked pieces that represent the pinnacle of contemporary fashion and timeless design.
            </p>
          </div>

          {filteredFeaturedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredFeaturedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 max-w-md mx-auto mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Collection Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We're curating our luxury fashion collection. Check back soon for exclusive pieces!
                </p>
                {/* <Link
                  // href="/api/seed"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  Add Sample Collection
                </Link> */}
              </div>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/products"
              className="border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-300"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Preview Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wide mb-4 text-gray-900 dark:text-gray-100">Shop by Collection</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our carefully curated collections, each telling a unique story of style and sophistication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Link href="/collections/dresses" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                  alt="Dresses Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-light tracking-wide mb-2">Dresses</h3>
                  <p className="text-sm opacity-90">Elegant & Timeless</p>
                </div>
              </div>
            </Link>

            <Link href="/collections/accessories" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                  alt="Accessories Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-light tracking-wide mb-2">Accessories</h3>
                  <p className="text-sm opacity-90">Complete Your Look</p>
                </div>
              </div>
            </Link>

            <Link href="/collections/jewelry" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                  alt="Jewelry Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-light tracking-wide mb-2">Jewelry</h3>
                  <p className="text-sm opacity-90">Exquisite Details</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/collections"
              className="border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-300"
            >
              VIEW ALL COLLECTIONS
            </Link>
          </div>
        </div>
      </section>

      {/* Discount Offers Section */}
      <DiscountSection />

      {/* Category Products Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category products will be displayed here */}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-rose-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-light tracking-wide mb-6 text-gray-900 dark:text-gray-100">
                Crafting Tomorrow's Heritage
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                At LUXE, we believe fashion is more than clothing—it's an expression of identity, a statement of values, and a bridge between tradition and innovation.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                From our atelier to your wardrobe, every garment tells a story of meticulous craftsmanship, sustainable practices, and an unwavering commitment to quality.
              </p>
              <StoryButton />
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                alt="Fashion brand lifestyle photography"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Choose Luxe?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We&apos;re committed to providing the finest luxury fashion experience with premium quality and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-rose-100 dark:bg-rose-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every piece is carefully selected from renowned designers and crafted with the finest materials for lasting elegance.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-rose-100 dark:bg-rose-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Express Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive your luxury fashion pieces quickly with our premium shipping service and elegant packaging.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-rose-100 dark:bg-rose-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Personal Styling
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our fashion experts are here to help you curate the perfect wardrobe that reflects your unique style.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}