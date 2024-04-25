"use client";

import { Product } from "@prisma/client";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";

interface ManageProductsClientProps {
    products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {
    let rows: any = [];

    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images

            }
        })
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "name", headerName: "Name", width: 220 },
        {
            field: "price", headerName: "Price(USD)", width: 100, renderCell: (params) => {
                return (<div className="font-bold text-slate-800">{params.row.price}</div>)
            }
        },
        { field: "category", headerName: "Category", width: 100 },
        { field: "brand", headerName: "Brand", width: 100 },
        {
            field: "inStock", headerName: "inStock", width: 120, renderCell: (params) => {
                return (<div>{params.row.inStock === true ? "in Stock" : "out of stock"}</div>)
            }
        },
        {
            field: "action", headerName: "Actions", width: 200, renderCell: (params) => {
                return (<div>Actions</div>)
            }
        },



    ]

    return (<div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading title="Manage Products" center />
        </div>
        <div style={{ height: 600, width: "100%" }}>

            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>

    </div>);
}

export default ManageProductsClient;