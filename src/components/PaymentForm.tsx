
import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface PaymentFormProps {
    amount: number;
    onSuccess: (paymentIntent: any) => void;
}

const PaymentForm = ({ amount, onSuccess }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/payment-success',
            },
            redirect: 'if_required'
        });

        if (error) {
            setMessage(error.message || 'An unexpected error occurred.');
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage('Payment Status: ' + paymentIntent.status);
            onSuccess(paymentIntent);
        } else {
            setMessage('Unexpected state.');
        }

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                <span id="button-text">
                    {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
                </span>
            </button>
            {message && <div id="payment-message" style={{ color: 'red', marginTop: '0.5rem' }}>{message}</div>}
        </form>
    );
};

export default PaymentForm;
