import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setMessage('Stripe not ready');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage('Card details not found.');
      setLoading(false);
      return;
    }

    try {
      const { data: clientSecret } = await axios.post(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
        amount: 1000,
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setMessage('Payment successful 🎉');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setMessage('Payment failed. See console.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="form-control mb-3" />
      <button className="btn btn-primary" disabled={!stripe || !elements || loading}>
        {loading ? 'Processing...' : 'Pay $10.00'}
      </button>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </form>
  );
}
