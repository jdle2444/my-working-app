import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container mt-5">
        <h2>Stripe Payment</h2>
        <CheckoutForm />
      </div>
    </Elements>
  );
}
