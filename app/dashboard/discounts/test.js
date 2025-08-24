export default function TestDiscountsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Discount Management - Test Page
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is a test page to verify routing is working correctly.
          </p>
          <div className="space-y-2">
            <p><strong>Route:</strong> /dashboard/discounts</p>
            <p><strong>Status:</strong> ✅ Page is loading correctly</p>
            <p><strong>Next Step:</strong> The main discount management functionality should work now</p>
          </div>
        </div>
      </div>
    </div>
  );
}