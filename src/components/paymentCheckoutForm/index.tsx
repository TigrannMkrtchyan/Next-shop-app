import { useState } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentCheckoutFormProps } from './type';

import styles from './index.module.scss';

const PaymentCheckoutForm: React.FC<PaymentCheckoutFormProps> = ({
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    } else {
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <PaymentElement id='payment-element' />
      <button
        disabled={isProcessing || !stripe || !elements}
        id='submit'
        className={styles.button}
      >
        <span id='button-text'>
          {isProcessing ? 'Processing ... ' : 'Pay now'}
        </span>
      </button>
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
};

export default PaymentCheckoutForm;
