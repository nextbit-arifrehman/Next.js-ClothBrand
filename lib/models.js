import clientPromise from './db.js';
import { ObjectId } from 'mongodb';

// Database name
const DB_NAME = 'nextjs-ecommerce';

// Get database instance
export async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

// Product model functions
export const ProductModel = {
  // Get all products
  async findAll() {
    const db = await getDb();
    const products = await db.collection('products').find({}).toArray();
    return products.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: undefined
    }));
  },

  // Get product by ID
  async findById(id) {
    try {
      const db = await getDb();
      const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
      if (!product) return null;
      
      return {
        ...product,
        id: product._id.toString(),
        _id: undefined
      };
    } catch (error) {
      // Handle invalid ObjectId format
      if (error.name === 'BSONError') {
        return null;
      }
      throw error;
    }
  },

  // Create new product
  async create(productData) {
    const db = await getDb();
    const now = new Date();
    
    const product = {
      ...productData,
      createdAt: now,
      updatedAt: now
    };

    const result = await db.collection('products').insertOne(product);
    
    return {
      ...product,
      id: result.insertedId.toString(),
      _id: undefined
    };
  },

  // Update product
  async update(id, updateData) {
    const db = await getDb();
    const now = new Date();
    
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...updateData,
          updatedAt: now
        }
      }
    );

    if (result.matchedCount === 0) return null;
    
    return await this.findById(id);
  },

  // Delete product
  async delete(id) {
    const db = await getDb();
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },

  // Get featured products
  async findFeatured(limit = 6) {
    const db = await getDb();
    const products = await db.collection('products')
      .find({ featured: true })
      .limit(limit)
      .toArray();
    
    return products.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: undefined
    }));
  },

  // Get products by category
  async findByCategory(category, limit = null) {
    const db = await getDb();
    let query = db.collection('products').find({ category });
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const products = await query.toArray();
    return products.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: undefined
    }));
  },

  // Get all categories
  async getCategories() {
    const db = await getDb();
    const categories = await db.collection('products').distinct('category');
    return categories.filter(Boolean); // Remove null/undefined values
  },

  // Search products
  async search(searchTerm, filters = {}) {
    const db = await getDb();
    let query = {};
    
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = parseFloat(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = parseFloat(filters.maxPrice);
    }
    
    if (filters.inStock) {
      query.inStock = true;
    }
    
    const products = await db.collection('products').find(query).toArray();
    return products.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: undefined
    }));
  },

  // Get products with discount information
  async findWithDiscounts(filters = {}) {
    const db = await getDb();
    const now = new Date();
    
    let matchStage = {};
    if (filters.category) {
      matchStage.category = filters.category;
    }
    if (filters.inStock) {
      matchStage.inStock = true;
    }
    
    const products = await db.collection('products').aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: 'discounts',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$productId', '$$productId'] },
                    { $eq: ['$isActive', true] },
                    {
                      $or: [
                        {
                          $and: [
                            { $lte: ['$startDate', now] },
                            { $gte: ['$endDate', now] }
                          ]
                        },
                        {
                          $and: [
                            { $lte: ['$startDate', now] },
                            { $eq: ['$endDate', null] }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            }
          ],
          as: 'discount'
        }
      },
      {
        $addFields: {
          discount: { $arrayElemAt: ['$discount', 0] }
        }
      }
    ]).toArray();
    
    return products.map(product => ({
      ...product,
      id: product._id.toString(),
      discount: product.discount ? {
        ...product.discount,
        id: product.discount._id.toString(),
        productId: product.discount.productId.toString(),
        _id: undefined
      } : null,
      _id: undefined
    }));
  },

  // Get only products that have active discounts (for homepage)
  async findDiscounted(limit = 8) {
    const db = await getDb();
    const now = new Date();
    
    const products = await db.collection('products').aggregate([
      {
        $lookup: {
          from: 'discounts',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$productId', '$$productId'] },
                    { $eq: ['$isActive', true] },
                    {
                      $or: [
                        {
                          $and: [
                            { $lte: ['$startDate', now] },
                            { $gte: ['$endDate', now] }
                          ]
                        },
                        {
                          $and: [
                            { $lte: ['$startDate', now] },
                            { $eq: ['$endDate', null] }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            }
          ],
          as: 'discount'
        }
      },
      {
        $match: {
          'discount.0': { $exists: true }
        }
      },
      {
        $addFields: {
          discount: { $arrayElemAt: ['$discount', 0] }
        }
      },
      {
        $limit: limit
      }
    ]).toArray();
    
    return products.map(product => ({
      ...product,
      id: product._id.toString(),
      discount: {
        ...product.discount,
        id: product.discount._id.toString(),
        productId: product.discount.productId.toString(),
        _id: undefined
      },
      _id: undefined
    }));
  },

  // Helper method to calculate discounted price for a single product
  async calculateDiscountedPrice(productId) {
    const db = await getDb();
    const now = new Date();
    
    // Get product with discount information
    const result = await db.collection('products').aggregate([
      { $match: { _id: new ObjectId(productId) } },
      {
        $lookup: {
          from: 'discounts',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$productId', '$$productId'] },
                    { $eq: ['$isActive', true] },
                    {
                      $or: [
                        {
                          $and: [
                            { $lte: ['$startDate', now] },
                            { $gte: ['$endDate', now] }
                          ]
                        },
                        {
                          $and: [
                            { $lte: ['$startDate', now] },
                            { $eq: ['$endDate', null] }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            }
          ],
          as: 'discount'
        }
      },
      {
        $addFields: {
          discount: { $arrayElemAt: ['$discount', 0] }
        }
      }
    ]).toArray();
    
    if (result.length === 0) return null;
    
    const product = result[0];
    const originalPrice = product.price;
    
    if (!product.discount) {
      return {
        originalPrice,
        discountedPrice: originalPrice,
        savings: 0,
        discountPercentage: 0,
        hasDiscount: false
      };
    }
    
    const discount = product.discount;
    let discountedPrice;
    let savings;
    let discountPercentage;
    
    if (discount.discountType === 'flat') {
      discountedPrice = Math.max(0, originalPrice - discount.discountValue);
      savings = originalPrice - discountedPrice;
      discountPercentage = Math.round((savings / originalPrice) * 100);
    } else if (discount.discountType === 'percentage') {
      discountPercentage = discount.discountValue;
      savings = (originalPrice * discountPercentage) / 100;
      discountedPrice = originalPrice - savings;
    }
    
    return {
      originalPrice,
      discountedPrice: Math.round(discountedPrice * 100) / 100, // Round to 2 decimal places
      savings: Math.round(savings * 100) / 100,
      discountPercentage,
      hasDiscount: true,
      discount: {
        id: discount._id.toString(),
        type: discount.discountType,
        value: discount.discountValue
      }
    };
  }
};

// Discount model functions
export const DiscountModel = {
  // Create new discount
  async create(discountData) {
    const db = await getDb();
    const now = new Date();
    
    // Validation rules
    const validationErrors = await this.validateDiscountData(discountData);
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
    }
    
    // Check for existing active discount on the same product and replace it
    const existingDiscount = await this.findActiveByProductId(discountData.productId);
    if (existingDiscount) {
      // Delete the existing discount before creating the new one
      await this.delete(existingDiscount.id);
    }
    
    const discount = {
      ...discountData,
      productId: new ObjectId(discountData.productId),
      isActive: true,
      createdAt: now,
      updatedAt: now
    };

    const result = await db.collection('discounts').insertOne(discount);
    
    return {
      ...discount,
      id: result.insertedId.toString(),
      productId: discount.productId.toString(),
      _id: undefined
    };
  },

  // Get active discount for a specific product
  async findActiveByProductId(productId) {
    const db = await getDb();
    const now = new Date();
    
    const discount = await db.collection('discounts').findOne({
      productId: new ObjectId(productId),
      isActive: true,
      $or: [
        { startDate: { $lte: now }, endDate: { $gte: now } },
        { startDate: { $lte: now }, endDate: null }
      ]
    });
    
    if (!discount) return null;
    
    return {
      ...discount,
      id: discount._id.toString(),
      productId: discount.productId.toString(),
      _id: undefined
    };
  },

  // Get all discounts with product information
  async findAllWithProducts() {
    const db = await getDb();
    
    const discounts = await db.collection('discounts').aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $sort: { createdAt: -1 }
      }
    ]).toArray();
    
    return discounts.map(discount => ({
      ...discount,
      id: discount._id.toString(),
      productId: discount.productId.toString(),
      product: {
        ...discount.product,
        id: discount.product._id.toString(),
        _id: undefined
      },
      _id: undefined
    }));
  },

  // Get discount by ID
  async findById(id) {
    const db = await getDb();
    const discount = await db.collection('discounts').findOne({ _id: new ObjectId(id) });
    
    if (!discount) return null;
    
    return {
      ...discount,
      id: discount._id.toString(),
      productId: discount.productId.toString(),
      _id: undefined
    };
  },

  // Update discount
  async update(id, updateData) {
    const db = await getDb();
    const now = new Date();
    
    // Get existing discount for validation context
    const existingDiscount = await this.findById(id);
    if (!existingDiscount) {
      throw new Error('Discount not found');
    }
    
    // Merge existing data with update data for validation
    const mergedData = { ...existingDiscount, ...updateData };
    
    // Validation rules for update
    const validationErrors = await this.validateDiscountData(mergedData, id);
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
    }
    
    // If updating productId, check for existing active discount and replace it
    if (updateData.productId) {
      const existingActiveDiscount = await this.findActiveByProductId(updateData.productId);
      if (existingActiveDiscount && existingActiveDiscount.id !== id) {
        // Delete the existing discount before updating this one
        await this.delete(existingActiveDiscount.id);
      }
      updateData.productId = new ObjectId(updateData.productId);
    }
    
    const result = await db.collection('discounts').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...updateData,
          updatedAt: now
        }
      }
    );

    if (result.matchedCount === 0) return null;
    
    return await this.findById(id);
  },

  // Delete discount
  async delete(id) {
    const db = await getDb();
    const result = await db.collection('discounts').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },

  // Get all active discounts
  async findActive() {
    const db = await getDb();
    const now = new Date();
    
    const discounts = await db.collection('discounts').find({
      isActive: true,
      $or: [
        { startDate: { $lte: now }, endDate: { $gte: now } },
        { startDate: { $lte: now }, endDate: null }
      ]
    }).toArray();
    
    return discounts.map(discount => ({
      ...discount,
      id: discount._id.toString(),
      productId: discount.productId.toString(),
      _id: undefined
    }));
  },

  // Validation rules for discount data
  async validateDiscountData(discountData, excludeId = null) {
    const errors = [];
    const now = new Date();
    
    // Required fields validation
    if (!discountData.productId) {
      errors.push('Product ID is required');
    }
    
    if (!discountData.discountType || !['flat', 'percentage'].includes(discountData.discountType)) {
      errors.push('Discount type must be either "flat" or "percentage"');
    }
    
    if (discountData.discountValue === undefined || discountData.discountValue === null) {
      errors.push('Discount value is required');
    }
    
    // Discount value validation
    if (typeof discountData.discountValue === 'number') {
      if (discountData.discountValue <= 0) {
        errors.push('Discount value must be greater than 0');
      }
      
      if (discountData.discountType === 'percentage') {
        if (discountData.discountValue >= 100) {
          errors.push('Percentage discount must be less than 100%');
        }
      }
      
      if (discountData.discountType === 'flat' && discountData.productId) {
        // Check if flat discount doesn't exceed product price
        try {
          const product = await ProductModel.findById(discountData.productId);
          if (product && discountData.discountValue >= product.price) {
            errors.push('Flat discount cannot be greater than or equal to product price');
          }
        } catch (error) {
          errors.push('Invalid product ID');
        }
      }
    }
    
    // Date validation
    if (discountData.startDate) {
      const startDate = new Date(discountData.startDate);
      if (isNaN(startDate.getTime())) {
        errors.push('Invalid start date');
      } else if (!excludeId && startDate < new Date(now.getTime() - 24 * 60 * 60 * 1000)) { // Allow start date to be today
        errors.push('Start date cannot be more than 1 day in the past');
      }
    }
    
    if (discountData.endDate) {
      const endDate = new Date(discountData.endDate);
      if (isNaN(endDate.getTime())) {
        errors.push('Invalid end date');
      }
      
      if (discountData.startDate) {
        const startDate = new Date(discountData.startDate);
        if (endDate <= startDate) {
          errors.push('End date must be after start date');
        }
      }
    }
    
    return errors;
  },

  // Create database indexes for efficient queries
  async createIndexes() {
    const db = await getDb();
    
    try {
      // Index for finding active discounts by product
      await db.collection('discounts').createIndex(
        { productId: 1, isActive: 1, startDate: 1, endDate: 1 },
        { name: 'discount_product_active_dates' }
      );
      
      // Index for finding discounts by date range
      await db.collection('discounts').createIndex(
        { startDate: 1, endDate: 1, isActive: 1 },
        { name: 'discount_dates_active' }
      );
      
      // Index for general discount queries
      await db.collection('discounts').createIndex(
        { isActive: 1, createdAt: -1 },
        { name: 'discount_active_created' }
      );
      
      console.log('Discount indexes created successfully');
      return true;
    } catch (error) {
      console.error('Error creating discount indexes:', error);
      return false;
    }
  }
};

// User model functions (for NextAuth integration)
export const UserModel = {
  // Find user by email
  async findByEmail(email) {
    const db = await getDb();
    const user = await db.collection('users').findOne({ email });
    if (!user) return null;
    
    return {
      ...user,
      id: user._id.toString(),
      _id: undefined
    };
  },

  // Create new user
  async create(userData) {
    const db = await getDb();
    const now = new Date();
    
    const user = {
      ...userData,
      createdAt: now,
      updatedAt: now
    };

    const result = await db.collection('users').insertOne(user);
    
    return {
      ...user,
      id: result.insertedId.toString(),
      _id: undefined
    };
  },

  // Update user
  async update(id, updateData) {
    const db = await getDb();
    const now = new Date();
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...updateData,
          updatedAt: now
        }
      }
    );

    if (result.matchedCount === 0) return null;
    
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    return {
      ...user,
      id: user._id.toString(),
      _id: undefined
    };
  }
};