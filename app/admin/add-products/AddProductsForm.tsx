"use client"
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { categories } from "@/utils/categories";
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

    const category = watch("category");

    const setCustomValue = (id: string, value: string) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    return (<>
        <Heading title="Add Product Form" center />
        <Input id="name" label="Name" type="text" disabled={loading} register={register} errors={errors} required />
        <Input id="price" label="Price" type="number" disabled={loading} register={register} errors={errors} required />
        <Input id="brand" label="Brand" type="text" disabled={loading} register={register} errors={errors} required />
        <TextArea id="description" label="description" disabled={loading} register={register} errors={errors} required />
        <CustomCheckBox id="inStock" register={register} label="This Product Is In Stock" />
        <div className="w-full font-medium">
            <div className="mb-2 font-semibold">Select a Category</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => {
                    if (item.label === "All") {
                        return null
                    }
                    return <div key={item.label} className="col-span">

                        <CategoryInput selected={category === item.label} label={item.label} icon={item.icon} onClick={(category) => { setCustomValue("category", category) }} />
                    </div>
                })}
            </div>
        </div>
    </>);
}

export default AddProductsForm;