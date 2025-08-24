import { render, screen } from '@testing-library/react';
import PriceDisplay from '../PriceDisplay';

// Mock the formatPrice function
jest.mock('@/lib/utils', () => ({
  formatPrice: (price) => `$${price.toFixed(2)}`
}));

describe('PriceDisplay', () => {
  test('renders original price only when no discount', () => {
    render(<PriceDisplay originalPrice={100} />);
    
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.queryByText(/Save/)).not.toBeInTheDocument();
  });

  test('renders discounted price with original price crossed out', () => {
    render(
      <PriceDisplay 
        originalPrice={100} 
        discountedPrice={80} 
        showSavings={true}
      />
    );
    
    expect(screen.getByText('$80.00')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText(/Save \$20\.00 \(20% off\)/)).toBeInTheDocument();
  });

  test('hides savings when showSavings is false', () => {
    render(
      <PriceDisplay 
        originalPrice={100} 
        discountedPrice={80} 
        showSavings={false}
      />
    );
    
    expect(screen.getByText('$80.00')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.queryByText(/Save/)).not.toBeInTheDocument();
  });

  test('applies correct size classes', () => {
    const { container } = render(
      <PriceDisplay 
        originalPrice={100} 
        discountedPrice={80} 
        size="large"
      />
    );
    
    const discountedPrice = screen.getByText('$80.00');
    expect(discountedPrice).toHaveClass('text-2xl');
  });
});