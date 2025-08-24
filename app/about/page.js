import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Text Left, Image Right */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl lg:text-5xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-6">
                About <span className="font-serif font-semibold text-rose-600">Luxe</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Founded with a vision to redefine luxury fashion, Luxe represents the perfect harmony between timeless elegance and contemporary sophistication. We believe that true luxury lies not just in the finest materials, but in the artistry of craftsmanship and the story each piece tells.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Our curated collection features pieces from renowned designers and emerging talents who share our commitment to excellence. Every garment in our collection is selected for its exceptional quality, innovative design, and ability to transcend seasonal trends.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                From our atelier to your wardrobe, we ensure that every interaction with Luxe reflects our dedication to providing an unparalleled luxury shopping experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
                >
                  Explore Collection
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                  alt="Luxe Fashion Store Interior"
                  className="w-full h-[600px] object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide Section */}
      <section id="size-guide" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4">
              Size Guide
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find your perfect fit with our comprehensive sizing guide
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Women's Sizing */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">Women's Sizing</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 font-medium text-gray-900 dark:text-gray-100">Size</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-900 dark:text-gray-100">Bust (in)</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-900 dark:text-gray-100">Waist (in)</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-900 dark:text-gray-100">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">XS</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">32-33</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">24-25</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">34-35</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">S</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">34-35</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">26-27</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">36-37</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">M</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">36-37</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">28-29</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">38-39</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">L</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">38-40</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">30-32</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">40-42</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">XL</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">42-44</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">34-36</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">44-46</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Measurement Guide */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">How to Measure</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-rose-100 dark:bg-rose-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                    <span className="text-rose-600 dark:text-rose-400 text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Bust</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Measure around the fullest part of your chest</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-rose-100 dark:bg-rose-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                    <span className="text-rose-600 dark:text-rose-400 text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Waist</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Measure around your natural waistline</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-rose-100 dark:bg-rose-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                    <span className="text-rose-600 dark:text-rose-400 text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Hips</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Measure around the fullest part of your hips</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                <p className="text-sm text-rose-800 dark:text-rose-200">
                  <strong>Tip:</strong> For the most accurate measurements, have someone help you measure while wearing well-fitting undergarments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping & Returns Section */}
      <section id="shipping" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4">
              Shipping & Returns
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We make shopping with us as convenient as possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Shipping Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">Shipping</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Free shipping on orders over $200
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Express delivery available
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  International shipping to 50+ countries
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Tracking provided for all orders
                </li>
              </ul>
            </div>

            {/* Returns Policy */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="bg-green-100 dark:bg-green-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">Returns</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  30-day return window
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Items must be unworn with tags
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Free return shipping
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Full refund or exchange
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">Customer Care</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Personal styling consultation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  Size exchange guarantee
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                  VIP member benefits
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find answers to common questions about shopping with Luxe
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                How do I know if an item will fit me?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We provide detailed size charts for each product, and our customer service team is available to help with sizing questions. We also offer free exchanges if the size isn't quite right.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                What is your return policy?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 30-day return window for all items. Items must be unworn, with original tags attached, and in original packaging. We provide free return shipping and offer full refunds or exchanges.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                Do you offer international shipping?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Customs duties and taxes may apply and are the responsibility of the customer.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                How can I track my order?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website. You can also check your order status in your account dashboard.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                Do you offer personal styling services?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Our personal styling team is available to help you create the perfect wardrobe. Contact us to schedule a consultation, available both in-person and virtually.
              </p>
            </div>

            {/* FAQ Item 6 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Klarna for buy-now-pay-later options. All transactions are secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're here to help with any questions or concerns you may have
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-rose-100 dark:bg-rose-900 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Address</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Fashion Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-rose-100 dark:bg-rose-900 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      +1 (555) 123-4567<br />
                      Mon-Fri: 9AM-8PM EST<br />
                      Sat-Sun: 10AM-6PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-rose-100 dark:bg-rose-900 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      hello@luxefashion.com<br />
                      support@luxefashion.com<br />
                      press@luxefashion.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-100 dark:bg-gray-800 hover:bg-rose-100 dark:hover:bg-rose-900 p-3 rounded-full transition-colors duration-200">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-100 dark:bg-gray-800 hover:bg-rose-100 dark:hover:bg-rose-900 p-3 rounded-full transition-colors duration-200">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-100 dark:bg-gray-800 hover:bg-rose-100 dark:hover:bg-rose-900 p-3 rounded-full transition-colors duration-200">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-gray-100"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}