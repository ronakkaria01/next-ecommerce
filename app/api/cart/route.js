import { products } from "@/app/shop/page";
import { defaultResponse as response, sendResponse } from "@/utils/defaults";

export async function POST(req, res) {
    const carts = {}
    const { product_id, quantity, user_id } = await req.json();
    console.log(product_id)

    if (!product_id || !quantity || isNaN(quantity) || quantity <= 0) {
        response.status = 400
        response.message = "Invalid request. Please provide a valid product_id and quantity."
        response.errors = "Invalid request. Please provide a valid product_id and quantity."
        return sendResponse(response)
    }

    const product = products.find((p) => p.product_id === product_id);

    if (!product) {
        response.status = 404
        response.message = "Product not found"
        response.errors = "Product not found"
        return sendResponse(response)
    }

    if (!carts[user_id]) {
        carts[user_id] = {};
    }

    const cart = carts[user_id]

    if (!cart[product_id]) {
        cart[product_id] = { product, quantity };
    } else {
        cart[product_id].quantity += quantity;
    }

    response.message = "Product added to the cart successfully"
    response.data = {
        cart: cart[product_id]
    }
    return sendResponse(response)
}