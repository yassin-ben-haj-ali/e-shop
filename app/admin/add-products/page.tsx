
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductsForm from "./AddProductsForm";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddProducts = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title="Oops! Access Denied" />
    }
    return (<div className="p-8">
        <Container>
            <FormWrap>
                <AddProductsForm />
            </FormWrap>
        </Container>
        Add Products Page
    </div>);
}

export default AddProducts;