"use client"


import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { safeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
    product: Product & {
        reviews: Review[]
    };

    user: (safeUser & {
        Order: Order[]
    }) | null

}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0
        }
    })


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)

        setLoading(true);
        if (data.rating === 0) {
            setLoading(false)
            return toast.error("No rating selected");
        }
        const ratingData = { ...data, userId: user?.id, product: product };
        axios.post("/api/rating", ratingData).then(() => {
            toast.success("Rating submitted")
            router.refresh();
            reset()
        }).catch(() =>
            toast.error("Something went wrong")
        ).finally(() => setLoading(false))

    }


    if (!user || !product) return null;


    const deliveredOrder = user?.Order.some(order => order.products.find(item =>
        (item.id === product.id) && order.deliveryStatus === "delivered"
    ));

    const userReview = product?.reviews.find((review: Review) => {
        return review.userId == user.id
    })


    if (userReview || !deliveredOrder) return null;

    return (<div className="flex flex-col gap-2 max-w-[500px]">
        <Heading title="Rate this product" />
        <Rating onChange={(event, newValue) => {
            setCustomValue("rating", newValue);
        }}
        />
        <Input id="comment" label="Comment" disabled={loading} register={register} errors={errors} required />
        <Button label={loading ? "Loading" : "Rate product"} onClick={handleSubmit(onSubmit)} />
    </div>);
}

export default AddRating;