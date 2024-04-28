import prisma from "@/libs/prismadb";


interface IParams {
    orderId?: string
}

export default async function getOrderById(params: IParams) {
    try {

        const { orderId } = params
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })
        if (!order) return null;
        return order;
    } catch (err: any) {
        throw new Error(err);
    }
}