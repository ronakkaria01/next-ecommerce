import RemoveFromCart from "@/components/button/RemoveFromCart";
import Header from "@/components/header/header";
import { getPostsByIDs } from "@/db/controller/posts.controller";
import { cookies } from "next/headers"
import Image from "next/image";
import CurrencyDisplay from "../helpers/CurrencyDisplay";

export const revalidate = 'force-cache'

const THead = ({ title }) => {
    return (
        <th className="p-4 text-left">{title}</th>
    )
}

const TData = ({ title }) => {
    return (
        <td className="p-4 text-left">{title}</td>
    )
}

export default async function CartTable() {
    const store = cookies()
    let cart = []
    let ids = []
    if (store.has('cart')) {
        cart = JSON.parse(store.get('cart').value)
    }
    cart.forEach(item => {
        ids.push(item.product_id)
    })
    const products = await getPostsByIDs(ids)
    return (
        <>
            <table className="w-full">
                <thead className="bg-slate-100">
                    <tr>
                        <th></th>
                        <THead title={"Thumbnail"} />
                        <THead title={"Name"} />
                        <THead title={"Price"} />
                        <THead title={"Quantity"} />
                        <THead title={"Subtotal"} />
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        const quantity = cart.find(item => item.product_id === product.id).quantity
                        let rowClasses = index > 0 ? 'border-t-2' : ''
                        rowClasses += " border-slate-300"
                        return (
                            <tr key={product.id} className={rowClasses}>
                                <td className="text-center py-4">
                                    <RemoveFromCart product_id={product.id} />
                                </td>
                                <td className="w-[100px] py-4">
                                    <Image className="block mx-auto" alt={product.post_title} src={product.thumbnail} width={100} height={0} />
                                </td>
                                <TData title={product.post_title} />
                                <TData title={<CurrencyDisplay price={product.discount_price} />} />
                                <TData title={quantity} />
                                <TData title={<CurrencyDisplay price={quantity * product.discount_price} />} />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}