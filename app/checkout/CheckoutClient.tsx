"use client"

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

    return (<div>

    </div>);
}

export default CheckoutClient;