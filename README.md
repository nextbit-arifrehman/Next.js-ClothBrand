# Next Brand - Luxury E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js 15, featuring a sophisticated luxury fashion marketplace with comprehensive admin management capabilities.

🌐 **Live Site**: [https://next-brand-blgxxsglj-arif-rehmans-projects.vercel.app](https://next-brand-blgxxsglj-arif-rehmans-projects.vercel.app)

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Google OAuth credentials

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd next-brand

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your MongoDB URI, NextAuth secret, and Google OAuth credentials

# Run development server
npm run dev
```

### Environment Variables
Create a `.env.local` file with:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## ✨ Featured User Perspectives

### 👤 **Customer Experience**
- **Seamless Shopping Journey**: Browse curated luxury collections with advanced filtering and search capabilities
- **Personalized Dashboard**: Track orders, manage wishlist, and update profile information with ease
- **Secure Authentication**: Google OAuth integration for quick and secure account access
- **Responsive Design**: Optimized shopping experience across all devices with dark/light mode support

### 🛡️ **Admin Management**
- **Product Management**: Add, edit, and organize products with rich media support and category management
- **Discount System**: Create and manage promotional campaigns with flexible discount rules and scheduling
- **Analytics Dashboard**: Monitor sales performance, track inventory, and manage featured products
- **Order Management**: Process orders, update statuses, and handle customer communications efficiently

### 🎨 **Developer Experience**
- **Modern Architecture**: Built with Next.js 15 App Router for optimal performance and SEO
- **Type Safety**: Comprehensive error handling and validation throughout the application
- **Scalable Database**: MongoDB integration with optimized queries and aggregation pipelines
- **Deployment Ready**: Configured for seamless Vercel deployment with environment management

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features and hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **Clsx** - Conditional className utility

### **Backend & Database**
- **MongoDB** - NoSQL database with aggregation pipelines
- **NextAuth.js** - Authentication with Google OAuth
- **API Routes** - RESTful API endpoints with Next.js

### **Development & Deployment**
- **ESLint** - Code linting and formatting
- **Vercel** - Deployment and hosting platform
- **Environment Variables** - Secure configuration management

### **Key Features**
- Server-side rendering (SSR) and static generation (SSG)
- Dynamic routing with parameter handling
- Image optimization and remote pattern support
- Responsive design with dark mode support
- Real-time data fetching and caching

## 🗺️ Route Summary

### **Public Routes**
- `/` - Homepage with featured products and collections
- `/products` - Product catalog with filtering and search
- `/products/[id]` - Individual product details page
- `/collections` - Category overview page
- `/collections/[category]` - Category-specific product listings
- `/about` - About page
- `/contact` - Contact information
- `/faq` - Frequently asked questions
- `/shipping` - Shipping information
- `/returns` - Return policy
- `/size-guide` - Size guide
- `/login` - Authentication page

### **Protected Routes (Requires Authentication)**
- `/dashboard` - User dashboard overview
- `/dashboard/profile` - User profile management
- `/dashboard/orders` - Order history and tracking
- `/dashboard/wishlist` - Saved products
- `/dashboard/add-product` - Add new products (Admin)
- `/dashboard/discounts` - Manage discounts (Admin)
- `/dashboard/featured` - Manage featured products (Admin)

### **API Routes**
- `/api/auth/[...nextauth]` - NextAuth.js authentication
- `/api/products` - Product CRUD operations
- `/api/products/[id]` - Individual product operations
- `/api/products/category/[category]` - Category-based products
- `/api/products/featured` - Featured products
- `/api/products/discounted` - Discounted products
- `/api/categories` - Product categories
- `/api/admin/discounts` - Discount management
- `/api/admin/discounts/[id]` - Individual discount operations