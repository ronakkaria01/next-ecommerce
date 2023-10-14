import { getPostsByIDs } from "@/db/controller/posts.controller";
import { cookies } from "next/headers";

export function convertToSlug(title) {
    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

export function cleanPosts(data) {
    let cleaned = []
    data.forEach(item => {
        cleaned.push(cleanPost(item))
    });
    return cleaned
}

export function cleanPost(post) {
    return extract_meta_data(post, 'post_meta')
}

export function extract_meta_data(data, meta_data_key) {
    data = data.toJSON()
    const meta = data[meta_data_key]
    delete data[meta_data_key]
    meta.forEach(item => {
        data[item.meta_key] = item.meta_value
    });
    return data
}

export function getTaxRate() {
    // 1 = 100% tax
    return 0.1
}

export function getFlatDeliveryRate() {
    return 1.99
}

export function checkIsFlatDelivery() {
    return false
}

export function getCart() {
    const store = cookies()
    let cart = []
    if (store.has('cart')) {
        cart = JSON.parse(store.get('cart').value)
    }
    return cart
}

export async function generateCartSummary() {
    const cart = getCart()
    let returnCart = {
        items: [],
    }
    let ids = []
    cart.forEach(item => {
        ids.push(item.product_id)
    })
    const products = await getPostsByIDs(ids)
    if (products.length == 0) return returnCart
    let _subtotal = 0.00
    let _total = 0.00
    let _totalTaxes = 0.00
    let _delivery = 0.00
    const taxRate = getTaxRate()
    const flatDelivery = getFlatDeliveryRate()
    const isFlatDelivery = checkIsFlatDelivery()
    const mergedArray = products.map(product => {
        product.delivery = 1
        const price = parseFloat(product.discount_price ?? product.regular_price)
        const delivery = product.delivery
        const cartItem = cart.find(item => item.product_id === product.id)
        const subtotal = parseFloat(cartItem.quantity * price)
        const taxAmount = subtotal * taxRate
        const deliveryAmount = isFlatDelivery ? 0 : delivery
        const total = subtotal + taxAmount + deliveryAmount
        _subtotal += subtotal
        _total += total
        _totalTaxes += taxAmount
        _delivery += deliveryAmount
        return {
            ...product,
            quantity: cartItem ? cartItem.quantity : 0,
            subtotal,
            total,
            taxAmount,
            price,
            deliveryAmount
        }
    })
    if (isFlatDelivery) {
        _total += flatDelivery
    }
    returnCart.items = mergedArray
    returnCart.total = _total.toFixed(2)
    returnCart.subtotal = _subtotal.toFixed(2)
    returnCart.taxes = _totalTaxes.toFixed(2)
    returnCart.delivery = isFlatDelivery ? flatDelivery : _delivery
    return returnCart
}