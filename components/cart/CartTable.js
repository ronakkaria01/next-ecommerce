import RemoveFromCart from "@/components/button/RemoveFromCart";
import { getPostsByIDs } from "@/db/controller/posts.controller";
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

export default async function CartTable({ cart }) {
    if (cart.items.length == 0) return
    const items = cart.items
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
                    {items.map((item, index) => {
                        let rowClasses = index > 0 ? 'border-t-2' : ''
                        rowClasses += " border-slate-300"
                        return (
                            <tr key={item.id} className={rowClasses}>
                                <td className="text-center py-4">
                                    <RemoveFromCart product_id={item.id} />
                                </td>
                                <td className="w-[100px] py-4">
                                    <Image className="block mx-auto" alt={item.post_title} src={item.thumbnail} width={100} height={0} style={{ width: "auto", height: "auto" }} />
                                </td>
                                <TData title={item.post_title} />
                                <TData title={<CurrencyDisplay price={item.price} />} />
                                <TData title={item.quantity} />
                                <TData title={<CurrencyDisplay price={item.subtotal} />} />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}