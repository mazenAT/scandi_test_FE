
import React, { useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { gql, useMutation } from '@apollo/client';

const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      createdAt
      items {
        productId
        quantity
        attributes {
          id
          value
        }
      }
    }
  }
`;

const CartOverlay: React.FC = () => {
  const { state, closeCart, updateQuantity, updateAttribute, getTotalItems, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const [createOrder, { loading, error, data }] = useMutation(CREATE_ORDER);
  const [success, setSuccess] = React.useState(false);

  // Preselect first value for each attribute if not set
  useEffect(() => {
    state.items.forEach((item, index) => {
      if (item.attributes && item.selectedAttributes) {
        item.attributes.forEach((attr: any) => {
          const attrNameKebab = (attr.name || '').toLowerCase().replace(/\s+/g, '-');
          const selected = item.selectedAttributes.find((a: any) => a.id === attrNameKebab);
          if (!selected && attr.items && attr.items.length > 0) {
            updateAttribute(index, attrNameKebab, attr.items[0].value);
          }
        });
      }
    });
    // eslint-disable-next-line
  }, [state.items]);

  if (!state.isOpen) return null;

  const handlePlaceOrder = async () => {
    const products = state.items.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      attributes: [
        ...(item.selectedSize ? [{ id: 'size', value: item.selectedSize }] : []),
        ...(item.selectedColor ? [{ id: 'color', value: item.selectedColor }] : [])
      ]
    }));
    try {
      await createOrder({ variables: { input: { products } } });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        closeCart();
        window.location.reload(); // Optionally reload to clear cart and update UI
      }, 1500);
    } catch (e) {
      // error handled below
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={closeCart}
        data-testid="cart-backdrop"
      />
      {/* Cart Panel */}
      <div 
        className="fixed right-4 top-20 w-80 max-h-96 bg-white z-50 shadow-xl rounded-lg border"
        data-testid="cart-overlay"
      >
        <div className="flex flex-col h-full max-h-96">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">My Bag</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{state.items.length} items</span>
              <button
                onClick={closeCart}
                className="p-1 hover:bg-gray-100 rounded"
                data-testid="close-cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-3">
                {state.items.map((item, index) => {
                  console.log('Cart item attributes:', item.attributes);
                  return (
                    <div 
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex space-x-3"
                      data-testid={`cart-item-${index}`}
                    >
                      <img
                        src={item.gallery?.[0]}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                        data-testid={`cart-item-image-${index}`}
                      />
                      <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-medium leading-tight" data-testid={`cart-item-name-${index}`}>{item.name}</h3>
                        <div className="text-xs text-gray-500">
                          {Array.isArray(item.attributes) && item.selectedAttributes && item.attributes.map((attr: any) => {
                            const attrNameKebab = (attr.name || '').toLowerCase().replace(/\s+/g, '-');
                            const selected = item.selectedAttributes.find((a: any) => a.id === attrNameKebab)?.value;
                            return (
                              <div key={attrNameKebab} data-testid={`cart-item-attribute-${attrNameKebab}`} className="flex items-center mb-1">
                                <span className="mr-2 font-medium">{attr.name.toUpperCase()}:</span>
                                <div className="flex space-x-1">
                                  {attr.items.map((option: any) => (
                                    attrNameKebab === 'color' ? (
                                      <button
                                        key={option.value}
                                        onClick={() => updateAttribute(index, attrNameKebab, option.value)}
                                        className={`w-8 h-8 rounded border-2 ${selected === option.value ? 'border-black' : 'border-gray-300'}`}
                                        style={{ backgroundColor: option.value }}
                                        title={option.displayValue}
                                        data-testid={`cart-item-attribute-${attrNameKebab}-${option.value}${selected === option.value ? '-selected' : ''}`}
                                      />
                                    ) : (
                                      <button
                                        key={option.value}
                                        onClick={() => updateAttribute(index, attrNameKebab, option.value)}
                                        className={`px-4 py-2 border text-sm font-medium rounded ${selected === option.value ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'}`}
                                        data-testid={`cart-item-attribute-${attrNameKebab}-${option.value}${selected === option.value ? '-selected' : ''}`}
                                      >
                                        {option.displayValue}
                                      </button>
                                    )
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                              className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-xs" 
                              data-testid="cart-item-amount-decrease"
                            >
                              <Minus className="w-2 h-2" />
                            </button>
                            <span className="text-sm px-2" data-testid="cart-item-amount">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                              className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-xs" 
                              data-testid="cart-item-amount-increase"
                            >
                              <Plus className="w-2 h-2" />
                            </button>
                          </div>
                          <span className="text-sm font-medium" data-testid={`cart-item-price-${index}`}>
                            {item.prices?.[0]?.currency.symbol}{(item.prices?.[0]?.amount * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="font-medium" data-testid="cart-total">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={state.items.length === 0 || loading || success}
                className={`w-full py-2 px-4 text-sm font-medium rounded ${state.items.length > 0 ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} transition-colors`}
                data-testid="place-order-button"
              >
                {loading ? 'Placing Order...' : success ? 'Order Placed!' : 'PLACE ORDER'}
              </button>
              {error && <div className="text-red-500 text-sm mt-2">Error placing order. Please try again.</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartOverlay;
