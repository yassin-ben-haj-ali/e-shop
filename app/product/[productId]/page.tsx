import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";
import getProductById from "@/app/actions/getProductById";
import NullData from "@/app/components/NullData";

interface IParams {
    productId: string
}

const Product = async ({ params }: { params: IParams }) => {
    const product = await getProductById(params.productId)

    if (!product) {
        return <NullData title="Oops! product with the given id does not exist" />
    }

    return <div className="p-8">
        <Container>
            <ProductDetails product={product} />
            <div className="flex flex-col mt-20 gap-4">
                <div>Add Rating</div>
                <ListRating product={product} />
            </div>
        </Container>
    </div>;
}

export default Product;