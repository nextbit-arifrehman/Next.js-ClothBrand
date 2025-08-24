'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedProducts() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);

  useEffect(() => {
    if (session) {
      fetchProducts();
    }
  }, [session]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (productId, currentFeaturedStatus) => {
    setUpdating(productId);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featured: !currentFeaturedStatus
        }),
      });

      if (response.ok) {
        // Update the local state
        setProducts(products.map(product => 
          product.id === productId 
            ? { ...product, featured: !currentFeaturedStatus }
            : product
        ));
      } else {
        alert('Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      </div>
    );
  }

  const featuredProducts = products.filter(product => product.featured);
  const nonFeaturedProducts = products.filter(product => !product.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-rose-600 hover:text-rose-700 text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-2">
            Featured Products Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage which products appear as featured on your homepage
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="text-2xl font-light text-yellow-600 dark:text-yellow-400 mb-1">
                {featuredProducts.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Featured Products</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="text-2xl font-light text-gray-600 dark:text-gray-400 mb-1">
                {nonFeaturedProducts.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Regular Products</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="text-2xl font-light text-blue-600 dark:text-blue-400 mb-1">
                {products.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Products</div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">
            Currently Featured Products
          </h2>
          {featuredProducts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No Featured Products
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select products below to feature them on your homepage
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'}
                      alt={product.name}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {product.category} • ${product.price}
                    </p>
                    <button
                      onClick={() => toggleFeatured(product.id, product.featured)}
                      disabled={updating === product.id}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updating === product.id ? 'Updating...' : 'Remove from Featured'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Products Section */}
        <div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">
            All Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative">
                  <Image
                    src={product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'}
                    alt={product.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {product.featured && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-yellow-500 text-white px-2 py-1 text-xs rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {product.category} • ${product.price}
                  </p>
                  <button
                    onClick={() => toggleFeatured(product.id, product.featured)}
                    disabled={updating === product.id}
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      product.featured
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    }`}
                  >
                    {updating === product.id 
                      ? 'Updating...' 
                      : product.featured 
                        ? 'Remove from Featured' 
                        : 'Add to Featured'
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}