import { cartResponse, defaultResponse as response, sendResponse } from "@/utils/defaults"
import { models } from "@/db/models"
import { cleanPost } from "@/utils/functions"

export async function POST(req, res) {

    let cart = []
    try {
        if (req.cookies.has('cart')) {
            cart = JSON.parse(req.cookies.get('cart').value)
        }
        const { product_id, quantity, user_id } = await req.json()
        if (!product_id || !quantity || isNaN(quantity) || quantity <= 0) {
            response.status = 400
            response.message = "Invalid request. Please provide a valid product_id and quantity."
            response.errors = "Invalid request. Please provide a valid product_id and quantity."
            return cartResponse(response, cart)
        }

        let product = await models.posts.findOne({
            where: {
                post_type: 'product',
                id: product_id
            },
            include: [
                {
                    model: models.post_meta,
                    attributes: ['meta_key', 'meta_value'],
                }
            ]
        })
        product = cleanPost(product)

        if (!product) {
            response.status = 404
            response.message = "Product not found"
            response.errors = "Product not found"
            return cartResponse(response, cart)
        }

        const cartHasProduct = cart.some(item => item.product_id === product_id)
        if (cartHasProduct) {
            const index = cart.findIndex(obj => obj.product_id === product_id)

            if (index !== -1) {
                cart[index].quantity += quantity
            }
        } else {
            cart.push({
                product_id,
                quantity
            })
        }
        response.message = "Product added to the cart successfully"
        response.data = {
            cart: cart
        }
    } catch (err) {
        response.status = 500
        response.message = "Invalid request. Some error occured, please try again later."
        response.errors = "Invalid request. Some error occured, please try again later."
    }

    return cartResponse(response, cart)
}

export async function DELETE(req, res) {
    let cart = []
    try {
        if (req.cookies.has('cart')) {
            cart = JSON.parse(req.cookies.get('cart').value)
        }

        const { product_id, user_id } = await req.json()
        if (!product_id) {
            response.status = 400
            response.message = "Invalid request. Please provide a valid product_id."
            response.errors = "Invalid request. Please provide a valid product_id."
            return cartResponse(response, cart)
        }

        let product = await models.posts.findOne({
            where: {
                post_type: 'product',
                id: product_id
            },
            include: [
                {
                    model: models.post_meta,
                    attributes: ['meta_key', 'meta_value'],
                }
            ]
        })
        product = cleanPost(product)
        if (!product) {
            response.status = 404
            response.message = "Product not found"
            response.errors = "Product not found"
            return cartResponse(response, cart)
        }

        const cartHasProduct = cart.some(item => item.product_id === product_id)
        if (cartHasProduct) {
            const index = cart.findIndex(obj => obj.product_id === product_id)

            if (index !== -1) {
                cart = cart.filter(item => {
                    return item.product_id !== product_id
                })
            }
            response.message = "Product removed from cart successfully"
            response.data = {
                cart: cart
            }
            return cartResponse(response, cart)
        }
    } catch (err) {
        response.status = 500
        response.message = "Invalid request. Some error occured, please try again later."
        response.errors = "Invalid request. Some error occured, please try again later."
    }
}