import { getUser } from "@/db/controller/users.controller";
import { defaultResponse as response, sendResponse } from "@/utils/defaults";

export async function POST(req, { params }, res) {
    try {
        const { id } = params
        const { address, cart } = await req.json()
        const user = await getUser(id)

        return sendResponse(response)
    } catch (err) {
        console.log(err)
    }
}