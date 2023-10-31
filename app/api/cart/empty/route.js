import { defaultResponse as response, cartResponse } from "@/lib/defaults"

export async function GET(req, res) {
    cartResponse.status = 200
    response.message = "Cart Emptied"
    return cartResponse(response)
}