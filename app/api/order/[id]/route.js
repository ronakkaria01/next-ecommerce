import { getUser } from "@/db/controller/users.controller";
import { models } from "@/db/models";
import { defaultResponse as response, sendResponse } from "@/utils/defaults";

const statuses = ['Pending', 'Processing', 'In Transit/Shipped', 'Delivered', 'Cancelled', 'On Hold', 'Refunded', 'Backordered', 'Partially Shipped', 'Payment Pending', 'Awaiting Review/Feedback']

export async function POST(req, { params }, res) {
    try {
        const { id } = params
        const { address, cart } = await req.json()
        const user = await getUser(id)
        
        if (!id) {
            response.status = 400
            response.message = "ID not set"
            response.error = "ID not set"
            return sendResponse(response)
        }

        if (!address || !cart) {
            response.status = 400
            response.message = "Make sure you are sending proper data in the body"
            response.error = "Make sure you are sending proper data in the body"
            return sendResponse(response)
        }

        if (!user) {
            response.status = 404
            response.message = "Invalid User ID"
            response.error = "Invalid User ID"
            return sendResponse(response)
        }

        let name = ''
        if (user.first_name && user.last_name) {
            name = `${user.first_name} ${user.last_name}`
        } else if (user.username) {
            name = `${user.username}`
        } else {
            name = user.email
        }

        const order_title = `${name}`
        const status = '10'
        const total = cart.total
        const subtotal = cart.subtotal
        const taxes = cart.taxes
        const delivery = cart.delivery
        const order_data = cart.items
        const user_data = { ...user, ...address }

        const order = await models.orders.create({
            user_id: id,
            order_title,
            status,
            total,
            subtotal,
            taxes,
            delivery,
            order_data,
            user_data
        })

        for(const item of cart.items) {
            const orderItem = await models.order_item.create({
                order_id: order.id,
                product_id: item.id,
                price: item.price,
                quantity: item.quantity,
                total: item.total,
                subtotal: item.subtotal,
                taxes: item.taxAmount,
                delivery: item.deliveryAmount
            })
        }

        response.message = "Order Created"
        response.message = order
        return sendResponse(response)
    } catch (err) {
        console.log(err)
    }
}