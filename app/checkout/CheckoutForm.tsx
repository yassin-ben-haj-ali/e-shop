"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
    clientSecret: string,
    handleSetPaymentSuccess: (value: boolean) => void

}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handleSetPaymentSuccess }) => {


    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart()
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const formattedPrice = formatPrice(cartTotalAmount);
    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (!clientSecret) {
            return;
        }
        handleSetPaymentSuccess(false);
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        setLoading(false);
        stripe.confirmPayment({
            elements, redirect: 'if_required'
        }).then((result) => {
            if (!result.error) {
                handleClearCart()
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null)
            }
            setLoading(false)
        })
    }
    return (<form onSubmit={handleSubmit} id='payment-form'>
        <div className="mb-6">
            <Heading title="Enter your details to complete checkout" />
        </div>
        <h2 className="font-semibold mt-4 mb-2">Payment Informations</h2>
        <AddressElement options={{ mode: 'shipping', allowedCountries: ["US", "KE"] }} />
        <h2 className="font-semibold mt-4 mb-2">Payment Informations</h2>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <div className="py-4 text-center text-slate-700 text-4xl font-bold">
            Total:{formattedPrice}
        </div>
        <Button label={loading ? "Processing" : "Pay now"} disabled={loading || !stripe || !elements} onClick={() => { }} />
    </form>);
}

export default CheckoutForm;