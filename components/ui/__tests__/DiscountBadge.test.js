import { render, screen } from '@testing-library/react';
import DiscountBadge from '../DiscountBadge';

describe('DiscountBadge', () => {
  test('renders percentage discount correctly', () => {
    render(
      <DiscountBadge 
        discountType="percentage" 
        discountValue={25} 
      />
    );
    
    expect(screen.getByText('25% OFF')).toBeInTheDocument();
  });

  test('renders flat discount as percentage when original price provided', () => {
    render(
      <DiscountBadge 
        discountType="flat" 
        discountValue={20} 
        originalPrice={100}
      />
    );
    
    expect(screen.getByText('20% OFF')).toBeInTheDocument();
  });

  test('does not render when discount value is 0', () => {
    const { container } = render(
      <DiscountBadge 
        discountType="percentage" 
        discountValue={0} 
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('applies correct variant classes', () => {
    render(
      <DiscountBadge 
        discountType="percentage" 
        discountValue={25} 
        variant="success"
      />
    );
    
    const badge = screen.getByText('25% OFF');
    expect(badge).toHaveClass('bg-green-500', 'text-white');
  });

  test('applies correct size classes', () => {
    render(
      <DiscountBadge 
        discountType="percentage" 
        discountValue={25} 
        size="large"
      />
    );
    
    const badge = screen.getByText('25% OFF');
    expect(badge).toHaveClass('px-4', 'py-2', 'text-base');
  });
});