import React, { useEffect, useState } from 'react';
import { usePayment } from '../../../services/payment/paymentContext';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Modal from '../modal';
import PaymentCheckoutForm from '../paymentCheckoutForm';
import { PaymentModalProps } from './type';

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onCancel,
  onSuccess,
}) => {
  const paymentService = usePayment();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState('');

  const fetch = async () => {
    const publishableKey = await paymentService.getConfig();
    const paymentIntent = await paymentService.getPaymentIntent();

    if (
      publishableKey.success &&
      paymentIntent.success &&
      publishableKey.data &&
      paymentIntent.data
    ) {
      setStripePromise(loadStripe(publishableKey.data));
      setClientSecret(paymentIntent.data);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Modal open={isOpen} onCancel={onCancel}>
      <div>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentCheckoutForm onSuccess={onSuccess} />
          </Elements>
        )}
      </div>
    </Modal>
  );
};

export default PaymentModal;
