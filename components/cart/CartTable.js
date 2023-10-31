"use client"

import RemoveFromCart from "@/components/button/RemoveFromCart";
import Image from "next/image";
import CurrencyDisplay from "../helpers/CurrencyDisplay";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";
import { useRef } from "react";

export default function CartTable({ cart }) {
    if (cart.items.length == 0) return
    const items = cart.items

    return (
        <>
            <h1 className="text-xl border-b pb-4">Shopping Cart</h1>
            <ul className="list-none space-y-4 mt-4">
                {items.map((item, index) => {
                    return (
                        <CartItem key={index} item={item} index={index} />
                    )
                })}
            </ul>
        </>
    )
}

function CartItem({ item, index }) {
    const { data } = useSession()
    const user_id = data?.user.id
    const router = useRouter()
    const listRef = useRef()

    const changeQuantity = async (e) => {
        if (e > 0) {
            updateCart(e)
        } else {
            removeFromCart()
        }
    }

    const updateCart = async (e) => {
        await fetch(`/api/cart`, {
            method: 'PATCH',
            body: JSON.stringify({
                user_id,
                product_id: item.id,
                quantity: e
            })
        })
        router.refresh()
    }

    const removeFromCart = async () => {
        await fetch(`/api/cart`, {
            method: 'DELETE',
            body: JSON.stringify({
                user_id,
                product_id: item.id,
            })
        })
        removeList()
    }

    const removeList = async () => {
        listRef.current.remove()
        router.refresh()
    }

    return (
        <li key={item.id} className={`flex ${index > 0 ? 'border-t pt-4' : ''}`} ref={listRef}>
            <Image alt={item.post_title} src={item.thumbnail} width={200} height={0} />
            <div className="py-4 pl-4">
                <p className="text-2xl">{item.post_title}</p>
                <p className="mt-2"><strong><CurrencyDisplay price={item.price} /></strong> <small>M.R.P. <CurrencyDisplay className="line-through" price={item.regular_price} /></small></p>
                <div className="flex flex-wrap">
                    <Select defaultValue={item.quantity} onValueChange={changeQuantity}>
                        <SelectTrigger className="w-[100px] mt-4">
                            Qty: {item.quantity}
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(10).keys()].map((key) => {
                                return (
                                    <SelectItem key={key} value={key}>{key} {key === 0 ? '(delete)' : ''}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                    <Button onClick={removeFromCart} className="mt-4 ml-2 text-red-500" variant="link">Delete</Button>
                </div>
            </div>
        </li>
    )
}