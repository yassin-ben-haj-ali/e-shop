"use client"

import { categories } from "@/utils/categories";
import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";
import Category from "./Category";

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === '/'

    if (!isMainPage) return null

    return (<div className="bg-white">
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-w-auto">
                {categories.map((item) => (
                    <Category
                        icon={item.icon}
                        label={item.label}
                        selected={category === item.label || (category === null && item.label === "All")}
                    />
                ))}
            </div>
        </Container>
    </div>);
}

export default Categories;