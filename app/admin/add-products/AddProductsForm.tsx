"use client"
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddProductsForm = () => {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            brand: "",
            category: "",
            inStock: false,
            images: [],
            price: ""
        }
    })

    return (<>
        <Heading title="Add Product Form" center />
        <Input id="name" label="Name" type="text" disabled={loading} register={register} errors={errors} required />
        <Input id="price" label="Price" type="number" disabled={loading} register={register} errors={errors} required />
        <Input id="brand" label="Brand" type="text" disabled={loading} register={register} errors={errors} required />
        <TextArea id="description" label="description" disabled={loading} register={register} errors={errors} required />
    </>);
}

export default AddProductsForm;