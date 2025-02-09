'use client';

import { useState } from 'react';
import { PaymentMethod, BillingAddress } from '@/types/profile';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (in a real app, use your publishable key)
const stripePromise = loadStripe('your_publishable_key');

interface Props {
  paymentMethods: PaymentMethod[];
  billingAddress?: BillingAddress;
}

export default function PaymentSettings({ paymentMethods, billingAddress }: Props) {
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(billingAddress || {
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const handleSetDefault = async (methodId: string) => {
    try {
      // API call to set default payment method would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to set default payment method:', error);
    }
  };

  const handleRemoveMethod = async (methodId: string) => {
    try {
      // API call to remove payment method would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to remove payment method:', error);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call to update billing address would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEditingAddress(false);
    } catch (error) {
      console.error('Failed to update billing address:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Payment Methods</h3>
          <button
            onClick={() => setShowAddCard(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Payment Method
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {method.type === 'card' && method.card && (
                  <>
                    {/* Card Icon based on brand */}
                    <div className="w-10 h-6 bg-gray-200 rounded" />
                    <div>
                      <p className="font-medium">
                        {method.card.brand.charAt(0).toUpperCase() +
                          method.card.brand.slice(1)}{' '}
                        ending in {method.card.last4}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires {method.card.expiryMonth}/{method.card.expiryYear}
                      </p>
                    </div>
                  </>
                )}

                {method.type === 'paypal' && method.paypal && (
                  <>
                    {/* PayPal Icon */}
                    <div className="w-10 h-6 bg-gray-200 rounded" />
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-gray-500">
                        {method.paypal.email}
                      </p>
                    </div>
                  </>
                )}

                {method.isDefault && (
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Default
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleRemoveMethod(method.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {paymentMethods.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No payment methods added
            </p>
          )}
        </div>

        {/* Add Card Form */}
        {showAddCard && (
          <div className="mt-6 p-6 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">Add New Card</h4>
              <button
                onClick={() => setShowAddCard(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>

            <Elements stripe={stripePromise}>
              {/* Stripe Card Element would go here */}
              <div className="h-12 bg-gray-100 rounded-md mb-4" />

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add Card
              </button>
            </Elements>
          </div>
        )}
      </div>

      {/* Billing Address */}
      <div>
        <h3 className="text-lg font-medium mb-4">Billing Address</h3>

        {editingAddress ? (
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={addressForm.name}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="line1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="line1"
                  value={addressForm.line1}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, line1: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="line2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="line2"
                  value={addressForm.line2}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, line2: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={addressForm.city}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, city: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  id="state"
                  value={addressForm.state}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, state: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={addressForm.postalCode}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, postalCode: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  value={addressForm.country}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, country: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEditingAddress(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Address
              </button>
            </div>
          </form>
        ) : (
          <div>
            {billingAddress ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <p>{billingAddress.name}</p>
                <p>{billingAddress.line1}</p>
                {billingAddress.line2 && <p>{billingAddress.line2}</p>}
                <p>
                  {billingAddress.city}, {billingAddress.state}{' '}
                  {billingAddress.postalCode}
                </p>
                <p>{billingAddress.country}</p>

                <button
                  onClick={() => setEditingAddress(true)}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Edit Address
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingAddress(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Billing Address
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
