"use client"
import Button from './Button';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const AddToCart = ({ product_id }) => {

    const { data } = useSession()
    const user_id = data?.user.id
    const router = useRouter()

    const handleAddToCart = async () => {
        try {
            const added = await fetch("/api/cart", {
                method: "POST",
                body: JSON.stringify({
                    user_id,
                    product_id,
                    quantity: 1
                })
            });
            router.refresh()
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Button onClick={handleAddToCart} label={"Add To Cart"} />
    );
};

export default AddToCart;
