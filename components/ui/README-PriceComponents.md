# Price Display Components

This directory contains reusable components for displaying product prices with discount functionality.

## Components

### PriceDisplay
A flexible component for showing original and discounted prices with savings information.

**Props:**
- `originalPrice` (number, required) - The original product price
- `discountedPrice` (number, optional) - The discounted price
- `discountType` (string) - 'flat' or 'percentage' (default: 'flat')
- `discountValue` (number) - The discount amount or percentage (default: 0)
- `showSavings` (boolean) - Whether to show savings information (default: true)
- `size` (string) - 'small', 'medium', or 'large' (default: 'medium')
- `className` (string) - Additional CSS classes

**Usage:**
```jsx
import { PriceDisplay } from '@/components/ui';

// No discount
<PriceDisplay originalPrice={199.99} />

// With discount
<PriceDisplay 
  originalPrice={199.99}
  discountedPrice={149.99}
  showSavings={true}
  size="large"
/>
```

### DiscountBadge
A visual indicator component for displaying discount percentages or amounts.

**Props:**
- `discountType` (string) - 'percentage' or 'flat' (default: 'percentage')
- `discountValue` (number) - The discount amount or percentage (default: 0)
- `originalPrice` (number) - Original price for calculating percentage from flat discount (default: 0)
- `variant` (string) - 'default', 'success', 'warning', 'info', 'outline', 'subtle' (default: 'default')
- `size` (string) - 'small', 'medium', or 'large' (default: 'medium')
- `className` (string) - Additional CSS classes

**Usage:**
```jsx
import { DiscountBadge } from '@/components/ui';

// Percentage discount
<DiscountBadge 
  discountType="percentage"
  discountValue={25}
  variant="default"
/>

// Flat discount (shows as percentage)
<DiscountBadge 
  discountType="flat"
  discountValue={20}
  originalPrice={100}
  variant="success"
/>
```

### PriceWithDiscount
A combined component that displays both price information and discount badge together.

**Props:**
- `originalPrice` (number, required) - The original product price
- `discountedPrice` (number, optional) - The discounted price
- `discountType` (string) - 'flat' or 'percentage' (default: 'flat')
- `discountValue` (number) - The discount amount or percentage (default: 0)
- `showBadge` (boolean) - Whether to show discount badge (default: true)
- `showSavings` (boolean) - Whether to show savings information (default: true)
- `badgeVariant` (string) - Badge variant (default: 'default')
- `size` (string) - Component size (default: 'medium')
- `layout` (string) - 'vertical' or 'horizontal' (default: 'vertical')
- `className` (string) - Additional CSS classes

**Usage:**
```jsx
import { PriceWithDiscount } from '@/components/ui';

// Complete price display with discount
<PriceWithDiscount 
  originalPrice={299.99}
  discountedPrice={199.99}
  discountType="percentage"
  discountValue={33}
  layout="vertical"
  badgeVariant="default"
/>
```

## Utility Functions

The following utility functions are available in `@/lib/utils`:

### calculateDiscountedPrice(originalPrice, discountType, discountValue)
Calculates the discounted price based on discount type and value.

### calculateSavings(originalPrice, discountedPrice)
Returns savings information including amount, percentage, and hasDiscount flag.

### formatDiscountText(discountType, discountValue, originalPrice)
Formats discount information for display (e.g., "25% OFF").

## Examples

See `PriceDisplayExamples.js` for comprehensive usage examples and visual demonstrations of all components.

## Requirements Fulfilled

This implementation fulfills the following requirements:

- **Requirement 3.1**: Consistent discount pricing display throughout the application
- **Requirement 3.3**: Clear indication of savings amount or percentage  
- **Requirement 2.4**: Visual discount indicators for promotional displays

## Integration

These components are designed to be easily integrated into:
- Product cards
- Product detail pages
- Shopping cart items
- Homepage discount sections
- Admin discount management interfaces

All components support dark mode and are fully responsive.