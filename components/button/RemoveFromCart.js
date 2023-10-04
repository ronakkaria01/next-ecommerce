"use client"
import Button from './Button';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const RemoveFromCart = ({ product_id }) => {

    const { data } = useSession()
    const user_id = data?.user.id
    const router = useRouter()

    const handleRemoveFromCart = async () => {
        try {
            const del = await fetch("/api/cart", {
                method: "DELETE",
                body: JSON.stringify({
                    user_id,
                    product_id,
                    quantity: 1
                })
            });
            router.refresh()
            console.log(await del.json())
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Button onClick={handleRemoveFromCart} label={"Remove From Cart"} />
    );
};

export default RemoveFromCart;
