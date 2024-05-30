import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from './AuthProvider';
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Premium = () => {
    const [isPremium, setIsPremium] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`https://job-quest-server-alpha.vercel.app/premium?email=${user.email}`)
        .then(res => {
            if (res.data.email) {
                setIsPremium(true);
            }
        })
    }, [user]);
    return (
        <div>
            {
                !isPremium && 
                <Elements stripe={stripePromise}>
                    <CheckoutForm setIsPremium={setIsPremium} />
                </Elements>
            }
            {
                isPremium && 
                <p className="text-center text-2xl">You are subscribed to premium</p>

            }
        </div>
    );
};

export default Premium;