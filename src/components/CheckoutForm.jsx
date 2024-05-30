import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import loginImg from '../assets/login.png';
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import swal from "sweetalert";
import { PropTypes } from 'prop-types';

const CheckoutForm = ({setIsPremium}) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const price = 20;
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.post('https://job-quest-server-alpha.vercel.app/create-payment-intent', { price: price })
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
    }, [])
  
    const handleSubmit = async (event) => {
      // Block native form submission.
        event.preventDefault();
  
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
  
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
  
        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                }
            }
        });

        if (confirmError) {
            console.log('confirmError', confirmError);
            setError(confirmError.message);
        } else {
            console.log('paymentIntent', paymentIntent);
            setError('');

            if (paymentIntent.status === 'succeeded') {
                const res = await axios.post('https://job-quest-server-alpha.vercel.app/create-premium', { email: user.email });
                if (res.data.insertedId) {
                    swal("Subscribed successfully!", {
                        icon: "success",
                    });
                    setIsPremium(true);
                }
            }
        }
    };
  
    return (
        <div className="hero min-h-screen bg-[#E7F6F2] dark:bg-[#2C3333] rounded-2xl">
            <Helmet>
                <title>JobQuest | Premium</title>
            </Helmet>
            <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <img src={loginImg} alt="" className="w-full" />
                </div>
                <div className="card shrink-0 w-full max-w-lg bg-base-200 shadow-2xl dark:bg-[#222831]">
                    <h2 className="text-center text-3xl font-bold mt-5 dark:text-[#E7F6F2]">Subscribe to Premium</h2>
                    <form onSubmit={handleSubmit} className="p-5">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                        <button type="submit" className="btn bg-[#2C3333] text-[#E7F6F2] mt-5" disabled={!stripe || !clientSecret}>
                            Subscribe
                        </button>
                    </form>
                    <p className="text-red-500 pl-5 pb-5">{error}</p>
                </div>
            </div>
        </div>
    );
  };

CheckoutForm.propTypes = {
    setIsPremium: PropTypes.func.isRequired,
};

export default CheckoutForm;