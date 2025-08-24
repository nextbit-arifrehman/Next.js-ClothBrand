'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded focus:ring-rose-500 focus:border-rose-500"
      />
      <button
        type="submit"
        className="w-full bg-rose-600 text-white py-2 hover:bg-rose-700 transition-colors duration-300 font-medium tracking-wide rounded"
      >
        SUBSCRIBE
      </button>
    </form>
  );
}