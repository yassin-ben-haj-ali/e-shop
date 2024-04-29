import prisma from "@/libs/prismadb";


export default async function getProductById(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                reviews: {
                    include: {
                        User: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            },
        })
        if (!product) return null;
        return product
    } catch (err: any) {
        throw new Error(err);
    }
}