"use client"

import { useCart } from "@/hooks/useCart";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


const CheckoutClient = () => {
    const { cartProducts, handleSetPaymentIntent, paymentIntent } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState('')

    console.log("client_secret", clientSecret);
    console.log("payment_intent", paymentIntent)

    const router = useRouter();

    useEffect(() => {
        if (cartProducts) {
            setLoading(true);
            setError(false);

            fetch('/api/create-payment-intent', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        items: cartProducts,
                        payment_intent_id: paymentIntent
                    }

                )
            }).then((res) => {
                setLoading(false);
                if (res.status == 401) {
                    return router.push('/login')
                }
                return res.json()
            }).then((data) => {
                setClientSecret(data.paymentIntent.client_Secret);
                handleSetPaymentIntent(data.paymentIntent.id)
            }).catch(() => {
                setError(true);
                toast.error("Something went wrong");
            })

        }
    }, [cartProducts, paymentIntent]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
            labels: "floating",
        }
    }


    return (<div>

    </div>);
}

export default CheckoutClient;