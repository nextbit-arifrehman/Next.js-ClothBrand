import { redirect } from 'next/navigation';

export default function CategoryPage({ params }) {
  // Redirect to products page with category filter
  redirect(`/products?category=${params.category}`);
}

// Generate static params for all categories
export async function generateStaticParams() {
  return [
    { category: 'accessories' },
    { category: 'basics' },
    { category: 'dresses' },
    { category: 'footwear' },
    { category: 'jewelry' },
    { category: 'outerwear' }
  ];
}